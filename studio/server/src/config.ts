import { fileURLToPath } from 'node:url';
import path from 'node:path';

// server/src/config.ts  ->  studio/  ->  PROJECT_ROOT
const here = path.dirname(fileURLToPath(import.meta.url)); // .../studio/server/src
export const STUDIO_DIR = path.resolve(here, '..', '..'); // .../studio
export const PROJECT_ROOT = path.resolve(STUDIO_DIR, '..'); // .../LucaPath (holds .claude/skills)
export const OUTPUT_ROOT = path.join(STUDIO_DIR, 'output');

export const PORT = Number(process.env.PORT ?? 8787);

// Model the agent runs on. Pinned (rather than the CLI default, which is currently
// Sonnet 4.5) so behaviour and the in-app model badge are explicit. Override via env.
export const AGENT_MODEL = process.env.AGENT_MODEL ?? 'claude-sonnet-4-6';

// The skills we expect the Agent SDK to discover from PROJECT_ROOT/.claude/skills
export const EXPECTED_SKILLS = [
  'lucapath',
  'personal-destiny-report',
  'family-report',
  'children-ai-report',
  'business-partner-report',
];
