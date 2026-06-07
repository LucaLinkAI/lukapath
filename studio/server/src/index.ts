import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import { PORT, OUTPUT_ROOT, PROJECT_ROOT, EXPECTED_SKILLS } from './config.ts';
import { authRouter } from './routes/auth.routes.ts';
import { chatRouter } from './routes/chat.routes.ts';
import { artifactRouter } from './routes/artifact.routes.ts';
import { uploadRouter } from './routes/upload.routes.ts';
import { probeSkills, getCwdMode } from './agent.ts';

fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

const app = express();
app.use(cors());
// Raised from 1mb to accommodate base64-encoded file/photo attachments.
app.use(express.json({ limit: '32mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/artifact', artifactRouter);
app.use('/api/upload', uploadRouter);

app.listen(PORT, async () => {
  console.log(`\n  ┌─ LucaPath Studio server`);
  console.log(`  │  http://localhost:${PORT}`);
  console.log(`  │  project root: ${PROJECT_ROOT}`);
  console.log(`  │  output:       ${OUTPUT_ROOT}`);
  console.log(`  │  probing skills + auth …`);

  // Boot probe: confirm auth + skill discovery; choose cwd mode.
  try {
    const probeDir = `${OUTPUT_ROOT}/__probe__`;
    fs.mkdirSync(probeDir, { recursive: true });
    const r = await probeSkills(EXPECTED_SKILLS, probeDir);
    if (!r.authed) {
      console.log(`  │  ⚠ NOT authenticated — run \`claude\` in a terminal to log in.`);
    } else if (r.ok) {
      console.log(`  │  ✓ authed · skills OK (${r.skills.length}) · cwd mode: ${r.mode}`);
    } else {
      console.log(`  │  ⚠ authed but skills incomplete (${r.reason}).`);
      console.log(`  │    found: ${r.skills.join(', ') || '(none)'}`);
      console.log(`  │    cwd mode forced to: ${getCwdMode()}`);
    }
  } catch (e) {
    console.log(`  │  ⚠ probe failed: ${String(e)}`);
  }
  console.log(`  └─ ready\n`);
});
