# LucaPath 路卡成长罗盘

Chinese family destiny analysis app — BaZi (八字), Five Elements (五行), MBTI, and Western astrology combined into polished HTML reports for affluent Chinese families navigating child development and life decisions.

## Running the App

No build step. Open directly in a browser:

```bash
open lucapath_app.html
```

The app calls Claude directly from the browser. Set a valid Anthropic API key in the `analyzeWithClaude` and `analyzeFamilyDynamics` functions inside `lucapath_app.html`.

## Skills

Five Claude Code skills live in `.claude/skills/`. Invoke the meta-skill for any report request — it routes to the right specialist automatically.

| Skill | Trigger | Output |
|-------|---------|--------|
| `lucapath` | Any destiny/report request (routes to one of the four below) | — |
| `personal-destiny-report` | 个人四系统报告, 算命报告, 命理分析 | Dark navy/gold HTML — BaZi + MBTI + Western astrology + Zi Wei Dou Shu |
| `family-report` | 家族报告, 亲子分析, 合盘 | Light paper HTML — BaZi + MBTI + Five Elements for 2–6 members |
| `children-ai-report` | AI时代孩子分析, 孩子发展规划 | Dark circuit HTML — BaZi + MBTI + astrology + hobbies → AI-era talent roadmap |
| `business-partner-report` | 合伙人分析, 事业相性, 创业团队 | Slate/cream HTML — BaZi + MBTI + Five Elements → partnership chemistry + timing windows |

### Usage in Claude Code

```
/lucapath
```

Or invoke a specific skill directly, e.g. `/family-report`.

## Importing into Claude Cowork

Download [`dist/lucapath-plugin.plugin`](dist/lucapath-plugin.plugin), then:

1. Open Claude Cowork → left sidebar → **"+"** next to *Personal plugins*
2. Choose **Upload plugin**
3. Select `lucapath-plugin.plugin`

All five skills are now available in Cowork. Invoke them by typing `/lucapath` (or `/personal-destiny-report`, `/family-report`, etc.) in any chat.

---

## Packaging Skills for Distribution

`scripts/pack.py` converts `.claude/skills/` into distributable artifacts with no external dependencies.

```bash
# Generate both .skill archives and the plugin directory (default)
python3 scripts/pack.py

# Only .skill archives
python3 scripts/pack.py --no-plugin

# Only the plugin directory
python3 scripts/pack.py --no-zips

# Custom output directory and plugin name
python3 scripts/pack.py --out ./release --plugin-name my-plugin
```

**Output in `dist/`:**

| Artifact | Format | Use |
|----------|--------|-----|
| `<name>.skill` | ZIP archive | Share / import individual skills |
| `lucapath-plugin/` | Plugin directory | Exploded plugin — inspect or extend |
| `lucapath-plugin.plugin` | ZIP archive | **Upload to Cowork via "Upload plugin"** |

The plugin directory structure:

```
lucapath-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    ├── lucapath/
    ├── personal-destiny-report/
    ├── family-report/
    ├── children-ai-report/
    └── business-partner-report/
```

Always edit skill source files under `.claude/skills/`, then re-run `pack.py` to refresh `dist/`.

## Reference Files

- `PRD/LucaPath_product_design.html` — personas, feature architecture, pricing, roadmap
- `PRD/sancai_product_design.html` — earlier 三才 branding iteration
- `lucapath_skill_architecture.html` — skill routing diagram
