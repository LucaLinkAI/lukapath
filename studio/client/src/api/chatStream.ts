import type { SSEEvent, AuthStatus, UploadResult } from '../types';

export async function fetchAuthStatus(force = false): Promise<AuthStatus> {
  const r = await fetch(`/api/auth/status${force ? '?force=1' : ''}`);
  return r.json();
}

/** Read a File as a base64 string (no data: prefix). */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.includes(',') ? result.slice(result.indexOf(',') + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/** Upload attachments into the session's uploads dir; returns saved absolute paths. */
export async function uploadFiles(sessionId: string | undefined, files: File[]): Promise<UploadResult> {
  const encoded = await Promise.all(
    files.map(async (f) => ({ name: f.name, dataBase64: await fileToBase64(f) })),
  );
  const r = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, files: encoded }),
  });
  if (!r.ok) {
    let message = `上传失败 (${r.status})`;
    try {
      const j = await r.json();
      if (j?.error) message = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return r.json();
}

/**
 * POST a chat turn and stream SSE events. Parses the `event:`/`data:` wire format
 * from the response body and invokes onEvent for each. Resolves when the stream ends.
 */
export async function streamChat(
  body: { sessionId?: string; prompt: string },
  onEvent: (ev: SSEEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    let message = `请求失败 (${res.status})`;
    try {
      const j = await res.json();
      if (j?.error) message = j.error;
    } catch {
      /* ignore */
    }
    onEvent({ type: 'error', message });
    onEvent({ type: 'done', turnId: '' });
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line
    let idx: number;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      parseFrame(frame, onEvent);
    }
  }
}

function parseFrame(frame: string, onEvent: (ev: SSEEvent) => void) {
  let event = 'message';
  let data = '';
  for (const line of frame.split('\n')) {
    if (line.startsWith(':')) continue; // comment / heartbeat
    if (line.startsWith('event:')) event = line.slice(6).trim();
    else if (line.startsWith('data:')) data += line.slice(5).trim();
  }
  if (!data) return;
  try {
    const payload = JSON.parse(data);
    onEvent({ type: event, ...payload } as SSEEvent);
  } catch {
    /* ignore malformed */
  }
}
