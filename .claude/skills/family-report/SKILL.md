---
name: family-report
description: Generate family destiny analysis reports (家族命理分析报告) as polished, self-contained HTML files covering multiple family members. Combines BaZi 八字, MBTI, and Five Elements 五行 interaction to analyze individual portraits, pairwise relationships (couple/parent-child/siblings), and family ecosystem dynamics. Use this skill whenever the user wants a family report, 家族报告, 家庭分析, 亲子关系分析, 伴侣分析, 八字合盘, family compatibility, multi-person analysis, or provides birth data for 2+ family members and asks about their dynamics or compatibility. Also triggers on phrases like "我们全家的命理", "帮我分析一下这家人", "亲子合盘", or providing a family's collective birth data.
---

# 家族深度命理分析报告

Generate a beautifully designed, self-contained HTML family report that analyzes 2–6 family members across BaZi + MBTI dimensions, with deep pairwise relationship analysis and family ecosystem insights.

## Reference Files

- `references/css.md` — Complete CSS for the light/paper theme (both Ocean-blue and Gold variants)
- `references/sections.md` — Exact HTML skeletons for all sections

Read these **as needed** during generation.

---

## Interactive Data Collection (Step-by-Step)

**Always collect data conversationally in this exact sequence.** Do not ask for all members at once. Wait for the user's answer at each step before proceeding to the next.

If the user has already provided all the data upfront (e.g. a full family brief in one message), skip the conversation and go straight to the Workflow section.

---

### Step A — Family Size

Ask:

> 好的，我们来一步一步收集家庭信息。
>
> **第一步：请问家里有几位成员需要分析？**（例如：爸爸+妈妈+1个孩子 = 3人，或者爸爸+妈妈+2个孩子 = 4人）
>
> 另外，请告诉我家庭的**姓氏**（用于报告标题，例如"林家三口"）。

Collect: total member count + family surname. Then proceed to Step B.

---

### Step B — Father's Info

Ask:

> **第二步：爸爸的信息**
>
> 请提供以下信息（可以一起发送）：
> - 姓名（中文名 + 英文名/昵称，如有）
> - 出生日期：年/月/日（公历）
> - 出生时间：几点？（0–23小时，或时辰名称，例如"申时"=15点）
> - 出生地点：城市（用于星盘上升星座，可选）
> - MBTI 类型（例如 INFJ）

If father is absent from the family, skip to Step C (mother).

---

### Step C — Mother's Info

Ask:

> **第三步：妈妈的信息**
>
> 请提供以下信息：
> - 姓名（中文名 + 英文名/昵称，如有）
> - 出生日期：年/月/日（公历）
> - 出生时间：几点？
> - 出生地点（可选）
> - MBTI 类型

If mother is absent, skip to Step D.

---

### Step D — Children's Info (one by one)

For the first child, ask:

> **第四步：第一个孩子的信息**
>
> 请提供：
> - 姓名 + 性别（儿子/女儿）
> - 出生日期：年/月/日（公历）
> - 出生时间：几点？
> - MBTI 类型（如果孩子年龄较小还没有测，可以先跳过或填"待测"）

After receiving, if there are more children, repeat for each:

> **第五步：第二个孩子的信息**（same fields）

Continue until all children are collected.

---

### Step E — Confirm & Generate

Once all members are collected, display a brief summary table for confirmation before generating:

> 好的，我已经收集到以下家庭成员信息：
>
> | 成员 | 出生日期 | 时辰 | MBTI |
> |------|----------|------|------|
> | 爸爸 NAME | YYYY/MM/DD | HH时 | TYPE |
> | 妈妈 NAME | YYYY/MM/DD | HH时 | TYPE |
> | 儿子/女儿 NAME | YYYY/MM/DD | HH时 | TYPE |
>
> 信息确认无误吗？确认后我将开始生成**{FAMILY_NAME}家{N}口 家族深度分析报告**。

Wait for confirmation (or corrections) before proceeding to the Workflow section.

---

**Field reference** (for each member):

| Field | Detail |
|-------|--------|
| **姓名** | Chinese + optional English/nickname |
| **角色** | 爸爸/妈妈/儿子/女儿/etc. |
| **出生日期** | Year/Month/Day (solar/Gregorian 公历) |
| **出生时辰** | Hour 0–23, or 时辰 (子=23, 丑=1, 寅=3, 卯=5, 辰=7, 巳=9, 午=11, 未=13, 申=15, 酉=17, 戌=19, 亥=21) |
| **MBTI** | 4-letter type; "待测" if unknown |

---

## Workflow

> **命盘计算完整性规则**：所有命盘数据（四柱、五行、十神、神煞）必须按 `personal-destiny-report` 技能的 `references/astro-calculations.md` 中的公式现场推算。严禁直接沿用或继承对话记录中已出现的任何命盘结论——即使用户或上一轮已给出"结果"，也必须独立验算后才能使用。
>
> **将星分类**：将星属于**命格类**，不属于凶煞类。在神煞对照表中，将星必须归入命格类区块（魁罡、将星、华盖、驿马、阴阳差错所在行）。

### Step 1 — Calculate BaZi for Each Member

For each person, using the algorithm in the personal-destiny-report skill's `references/astro-calculations.md`:
- Four pillars (year/month/day/hour) with stem, branch, element
- Five Elements tally
- Day Master 日主 (day stem)
- 格局 Pattern + strength (strong/weak)

**十神 (Ten Gods) — compute for all 7 non-Day-Master characters per member**:
For each of: year stem, year branch, month stem, month branch, day branch, hour stem, hour branch — compute the ten-god name relative to Day Master using the polarity + element-relationship rules in personal-destiny-report's `references/astro-calculations.md` → Ten Gods section. Record name + display color for the comparison table.

**神煞 (Spirit Stars) — full four-category audit per member** (using astro-calculations.md → Extended 神煞 section):
- **命格类**: 魁罡, 将星, 华盖, 驿马, 阴阳差错
- **贵人类**: 文昌, 天乙贵人, 国印贵人, 太极贵人
- **人缘类**: 桃花
- **凶煞类**: 羊刃, 孤辰/寡宿, 天罗地网, 劫煞/亡神
Record: present/absent, count occurrences, which position for each member. Compute total star count per member.

**Cross-member 神煞 constellation analysis** (compute before writing HTML — drives the callout cards in Section 贰's dynamics block):
- **将星分布**: Who has 将星? Parent with 将星 = natural family authority figure. Child with 将星 = needs domain ownership, will push back on total control. Two family members with 将星 in the same generation = authority tension requiring deliberate division of domains.
- **魁罡格局**: Which members have 魁罡? 魁罡 parent = sets extremely high standards, strong-willed; best approached with direct communication, not emotional appeals. 魁罡 child = needs early respect for autonomy; forcing compliance creates rebellion. Multiple 魁罡 members = very strong-willed family — conflicts are intense but resilience is exceptional.
- **华盖密度**: Total 华盖 count. All members with 华盖 = "minority soul family" with strong creative/spiritual identity but often misaligned with mainstream expectations. 华盖 child in non-华盖 family = the creative outlier who needs extra permission to be different.
- **驿马分布**: Which members have 驿马 and which don't? 驿马 members = the wanderers who thrive through geographic/career change; constraining them causes internal friction. Non-驿马 members = the home anchors who maintain family stability. 驿马 parent + non-驿马 child = parent's mobility shapes child's global worldview; 驿马 child + stable parents = child's "flight instinct" is healthy and should be supported.

Record in a compact table before writing HTML.

### Step 2 — Five Elements Interaction Map

Chart how each person's Day Master element relates to every other member's:

**生克关系 table** (from the generating member's perspective):
- 木生火 | 火生土 | 土生金 | 金生水 | 水生木  → 相生 (nurturing, +)
- 木克土 | 土克水 | 水克火 | 火克金 | 金克木  → 相克 (challenging, tensioned)
- 同类 (same element) → 比劫 resonance (peer energy, neutral/+)
- 被生 (受生) → one receives the other's energy (the receiver benefits)

Label each pair with the relationship type and who benefits more.

**Special constellations to check** (worth naming explicitly in the report):
- Same day pillar as another member → 命理镜像 (destiny mirror)
- One member's **time pillar** stem/branch = another's **day pillar** → 命定贵人
- Both members share same 神煞 (e.g., both have 华盖) → 同频共振
- One element directly generates another AND that person's MBTI type is nurturing → double resonance

### Step 3 — MBTI Family Ecosystem

Analyze the family's MBTI distribution:
- **I/E balance**: How many introverts vs extroverts? What's the recharge dynamic?
- **N/S gap**: All-N families struggle with practical execution; all-S families may lack vision
- **F/T balance**: Feeling vs Thinking decision-making
- **J/P balance**: Who provides structure? Who provides flexibility?
- **Type pairs**: For each key pair, identify the MBTI compatibility pattern:
  - Identical types: deep understanding, mirror dynamics
  - Shared NF/NT/SF/ST temperament: allied perspective
  - Shadow types (all 4 opposite): maximum contrast, maximum learning
  - 1–2 letters different: easy friction zone

### Step 4 — Pairwise Relationship Scoring

For every meaningful pair (couple, each parent-child, siblings), calculate a **合盘指数 /100**:

Base: 60

Add points:
- Day Masters in 相生 relationship: +15–20
- Day Masters 同类 (same element): +10–15
- Day Masters in 相克: +0–5 (note as "challenging growth")
- Shared 神煞: +5–10 each
- Special time/day pillar connection: +10–15
- MBTI same temperament (NF/NT/SF/ST): +8–12
- MBTI shared 3+ letters: +5–8
- MBTI complementary (J+P, I+E etc.): +3–5

Cap at 98. Round to nearest whole.

### Step 5 — Assign Member Colors

Each member gets a unique color from this palette. Assign based on their Day Master element and role:

| Slot | CSS variable pair | Suggested for |
|------|-------------------|---------------|
| 水/blue | `--ocean` (#1a4a6b) / `--ocean-faint` (#d6eaf6) | Water 水 Day Master, or father figure |
| 木/green | `--forest` (#1a5240) / `--forest-faint` (#d6f0e8) | Wood 木 Day Master |
| 土/amber | `--amber` (#b07820) / `--amber-faint` (#faf0d0) | Earth 土 Day Master, or children |
| 火/cinnabar | `--rust` (#8b3a1a) / rust-faint (#faeee8) | Fire 火 Day Master |
| 金/indigo | `--indigo` (#2c3e6b) / indigo-faint (#e8eef8) | Metal 金 Day Master |
| 阴/plum | `--plum` (#6b3a6b) / plum-faint (#f0eaf8) | Yin-heavy charts, girls |

### Step 6 — Generate the HTML

Read `references/css.md` for the complete CSS.  
Read `references/sections.md` for all section skeletons.

**Output filename**: `{family surname}家{N}口 八字×MBTI 家族分析报告.html`

**Theme variant**:
- **Ocean** (default — blue/green/amber): used in Jeff's family report
- **Gold** (warmer — gold/jade/cinnabar): used in Cindy's family report, choose for 2+ children or when user has a preference

---

## Sections to Generate

### 壹 — 家族命盘总览
- Overview table (one row per member): name/role/DOB | 日主+格局 | MBTI | 核心神煞 | 家族角色
- Callout: **3 most surprising family discoveries** — pick the most striking cross-member coincidences
- Family Five Elements chain (`family-map`): visualize how the elements flow through the family

### 贰 — 家族命盘十神 · 神煞全景

Use the `## Section 贰 — 家族命盘十神 · 神煞全景` skeleton from `references/sections.md`.

Part 0 — 命盘总览一览表 (renders first, before Part A):
- One row per family member with 7 columns: 人 | 日主 | 五行阴阳 | 用的格局 | 日主强度 | 材质感 | 核心关键词
- 人 cell: name + sub-label showing family role (爸爸/妈妈/儿子/女儿), name in member's assigned color
- 日主: two-char stem+element label (e.g., 壬水, 乙木)
- 五行阴阳: yin/yang + element (e.g., 阳水, 阴木) — yang=阳 for 甲丙戊庚壬, yin=阴 for 乙丁己辛癸
- 用的格局: dominant pattern name(s), joined with · if two (e.g., 食神格·魁罡, 七杀格)
- 日主强度: pill badge — 身强(green), 身弱/偏弱(amber), 极弱(red)
- 材质感: poetic metaphor derived from Day Master — 甲木→参天大树 乙木→藤萝花草 丙火→骄阳烈日 丁火→烛光星火 戊土→巍峨山岳 己土→田园沃土 庚金→刀剑矿铁 辛金→珠玉精金 壬水→江河奔流 癸水→雨露灵泉
- 核心关键词: 4 evocative trait words joined by 、, tuned to this person's family role + BaZi + MBTI (e.g., 柔韧、适应、可塑、借力 for 乙木 child; 决断、规则、执行、担当 for 庚金 father)
- Table has minimal styling (thin borders, no fill)

Part A — 十神分析·命盘骨架结构:
- Color-coded legend bar (five 十神 categories)
- Multi-column table: left column = pillar position labels (年干/年支/月干/月支/日干/日支/时干/时支/格局/日主强弱), one column per family member
- Each cell: ten-god badge with character + ten-god name, colored by category
- Day Master (日干) row: all cells use gold 日主 badge
- 格局 row: amber pattern badge per person; 日主强弱 row: strength badge
- Below table: one insight card per member summarizing their dominant 十神 pattern and family-role meaning (e.g., "官印格=规则守护者", "食伤旺=创意表达型", "比劫旺=独立自主型")

Part B — 神煞对照·特殊天赋加成:
- Legend bar (green/gold/red/dash)
- Multi-column table: 14 神煞 rows in 4 category groups, one column per family member
- Badge styles: green (有/单现), gold (✅✅ 双现/多现), red (⚡ 凶煞/注意), dash (无)
- Total count row at bottom with large number per person

Part C — 魁罡·将星·华盖·驿马 家庭关系动态:
- 4 summary cards (2×2 grid):
  - **将星 · 家庭权威与自主**: who has 将星 → parent-child authority pattern; parent's 将星 energy vs. child's 将星 need for domain ownership → specific parenting approach for 将星 children
  - **魁罡 · 意志与沟通方式**: which family members are 魁罡 → strong-willed communication style; how 魁罡 members respond to pressure → communication protocol: what works (direct/clear expectations) and what doesn't (emotional appeals/nagging)
  - **华盖 · 家庭创意频率**: 华盖 density → is this a "mainstream" or "minority soul" family; 华盖 child in family = needs space to be unconventional; dense family 华盖 = shared creative/spiritual wavelength → specific encouragement style
  - **驿马 · 流动与归属感**: who has 驿马 → the family's "wanderers" vs "anchors"; how 驿马 children should be raised (freedom + structure); 驿马 parent's travel/mobility and its effect on family stability → practical anchor strategies
- Callout: synthesize the family's overall 神煞 constellation — what makes this family unique as a group, and the single most important insight for how this family best functions together

### 叁 — N人个案深度画像
- One `person-card` per member, in a grid (3 columns for ≤3 members; 2 columns for 4+)
- Each card: avatar, name/role, BaZi + MBTI tags, 4 trait rows (核心/天赋/最大优势/隐性挑战), 4 strength bars (custom dimensions per person), one-line poetic quote
- Strength bar dimensions: choose 4 that reveal the most about each person (e.g., 战略眼光, 情感表达, 行动力, 贵人缘, 内心自足, 耐心, 规则服从, 研究深度...)

### 肆 — 伴侣关系 (if couple present)
- One `rel-card` per couple pair
- Header: element pair + MBTI pair, 合盘指数
- Body (2-col): 3–4 insight blocks on left (五行命理, shared 神煞, MBTI analysis, what each gives the other), then friction-box + solution-box on right
- Callout: the single most precious thing about this relationship

### 伍 — 亲子关系 (for each parent-child pair)
- One `rel-card` per pair
- Same structure as couple card, but with parent-role framing
- Include: key element/pillar connection, MBTI shadow analysis, specific parenting insight, friction + solution

### 陆 (+ 柒 if siblings present) — 兄弟姐妹关系 (optional)
- Sibling pairs analyzed similarly but more briefly
- Focus on sibling dynamic, competition vs cooperation energy

### 陆/柒 — 家庭整体动态与核心建议
- Two-column summary boxes: MBTI家庭生态 + 家庭最大整体挑战
- Relationship summary table: each pair | 核心优势 | 最需做的一件事 | 合盘指数
- Two-column insight boxes for 1–2 specific family patterns (e.g., 驿马分布, 华盖密度, etc.)

### 柒/捌 — N人一句话命格总结
- One `quote-card` per member with colored left bar
- Each: member name/type/element as heading, then 3–5 sentence poetic summary that captures their essence and their role in the family ecosystem

### 终 — 诗歌收尾
- Centered poem section: 3-line poem matching each person's element/metaphor, then 2–3 prose lines on the family as a whole
- Source line: "{family} 家族 · 八字 × MBTI 家族分析报告 · {year}"

---

## Narrative Voice & Quality Standards

**What makes family reports special** — the power isn't in individual analysis (that's the personal-destiny-report skill), it's in the **cross-member connections**:

1. **Name the exact connection explicitly**: Don't say "your elements complement each other." Say: "超超甲木天然接收Jeff壬水的滋养——水生木，这不是比喻，是命盘设计的现实。"

2. **Find the 最惊人的发现**: Always look for the one thing that's genuinely surprising — same day pillar across generations, time pillar = parent's day master, all members sharing a 神煞. Open Section 壹's callout with these.

3. **MBTI family ecology is specific**: Don't say "you balance each other." Analyze what's missing from the collective: if no S types, who handles practical execution? If all I types, how does the family recharge together? Name the gap and the workaround.

4. **Strength bars**: Choose dimensions that tell the story of how this specific family works together. The bars for a 3-person family should collectively reveal what this family is strong at and what they collectively lack.

5. **Parenting cards**: The most actionable section. Be concrete: "用故事代替说教" or "给框架不给路径" is better than "communicate better."

6. **One-liner quotes**: The most memorable part of the report. Each person's quote should: use a nature metaphor tied to their element, name their superpower, name their vulnerability, and end with their family role. 2–4 sentences.

7. **Closing poem**: 3 lines, one per person (or one per element group), each line a simple metaphor. Then 2–3 prose lines that are genuinely moving about the family's specific story.

**Specificity checklist** — before writing each section, verify you have:
- [ ] The exact Day Master and element for each person
- [ ] At least one cross-member pillar/element connection named
- [ ] Each person's key 神煞 used in analysis
- [ ] MBTI types driving all behavioral insights (not generic advice)
- [ ] Pairwise scores feel differentiated (not all 87)
