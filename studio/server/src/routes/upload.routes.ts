import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { createSession, getSession } from '../sessions.ts';

export const uploadRouter = Router();

/**
 * POST /api/upload
 *   body: { sessionId?, files: [{ name, dataBase64 }] }
 *   → { sessionId, files: [{ name, path }] }
 *
 * Saves user-attached files (documents / photos) into <session.outputDir>/uploads/
 * so the agent — which runs with cwd inside that dir — can Read them by absolute
 * path. If no sessionId is supplied a fresh session is created and returned, so
 * the very first turn can carry attachments. Files arrive base64-encoded over
 * JSON (no multipart dependency); the JSON body limit is raised in index.ts.
 */
uploadRouter.post('/', (req, res) => {
  const { sessionId, files } = req.body ?? {};
  if (!Array.isArray(files) || files.length === 0) {
    res.status(400).json({ error: 'files required' });
    return;
  }

  let session = sessionId ? getSession(sessionId) : undefined;
  if (sessionId && !session) {
    res.status(404).json({ error: 'session not found' });
    return;
  }
  if (!session) session = createSession();

  const uploadsDir = path.join(session.outputDir, 'uploads');
  fs.mkdirSync(uploadsDir, { recursive: true });

  const saved: { name: string; path: string }[] = [];
  for (const f of files) {
    if (!f || typeof f.name !== 'string' || typeof f.dataBase64 !== 'string') continue;
    const abs = uniquePath(uploadsDir, sanitize(f.name));
    // Accept both raw base64 and data: URLs (strip the "data:...;base64," prefix).
    const b64 = f.dataBase64.includes(',') ? f.dataBase64.slice(f.dataBase64.indexOf(',') + 1) : f.dataBase64;
    fs.writeFileSync(abs, Buffer.from(b64, 'base64'));
    saved.push({ name: path.basename(abs), path: abs });
  }

  res.json({ sessionId: session.id, files: saved });
});

/** Strip directory parts and unsafe characters; keep CJK, word chars, dot, dash. */
function sanitize(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? 'file';
  return base.replace(/[^\w.\-一-鿿]/g, '_').slice(0, 120) || 'file';
}

/** Avoid clobbering an existing upload with the same name. */
function uniquePath(dir: string, name: string): string {
  let p = path.join(dir, name);
  if (!fs.existsSync(p)) return p;
  const ext = path.extname(name);
  const stem = name.slice(0, name.length - ext.length);
  let i = 1;
  while (fs.existsSync((p = path.join(dir, `${stem}-${i}${ext}`)))) i++;
  return p;
}
