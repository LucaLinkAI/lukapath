---
name: business-partner-report
description: Generate business partner compatibility reports (事业合伙人相性报告) as polished, self-contained HTML files analyzing 2–6 business partners. Combines BaZi 八字, Five Elements 五行, and MBTI to assess partnership chemistry, complementarity, fortune timing, and optimal role division. Use whenever the user wants a business compatibility report, 合伙人分析, 事业相性, 创业伙伴分析, 合伙化学反应, 事业合盘, business partner compatibility, or provides birth data for 2+ business partners and asks about their synergy, how they complement each other, or how to develop their fortune together. Also triggers on phrases like "我们合伙人之间的关系", "创业团队分析", "合作相性", "事业伙伴八字", or "两个人适合一起创业吗".
---

# 事业合伙人深度相性报告

Generate a beautifully designed, self-contained HTML business partnership report analyzing 2–6 partners across BaZi + MBTI dimensions. Focuses on business chemistry, complementarity, fortune timing windows, and role optimization — NOT romantic or family relationships.

## Reference Files

- `references/css.md` — Complete CSS for the Slate/professional theme
- `references/sections.md` — Exact HTML skeletons for all sections

Read these **as needed** during generation.

---

## Interactive Data Collection

**Always collect data conversationally in this exact sequence.** Wait for the user's answer at each step before proceeding.

For 2 partners: 3 steps (skip 第三步).
For 3+ partners: 4 steps (include 第三步).

If the user has already provided all data upfront, skip the conversation and go straight to the Workflow section.

---

### 第一步 — 团队基本信息

Ask:

> 好的，我们来分析你们的事业合伙人相性！
>
> **第一步：两个基本问题**
>
> 1. 团队共有几位合伙人需要分析？（2–6人）
> 2. 团队/公司名字是什么？（用于报告标题；没有的话告诉我行业方向也可以，例如"科技创业"）

Collect: partner count + team name or industry. Then proceed to 第二步.

---

### 第二步 — 所有合伙人信息（批量收集）

Based on the partner count from Step 1, generate a fill-in template with one block per partner. Ask:

> **第二步：请按以下模板填写每位合伙人的信息，可以一次性发给我👇**
>
> ```
> 【合伙人1】
> 姓名：
> 出生日期：（公历 年/月/日）
> 出生时间：（几点，或时辰，例如"申时"）
> MBTI：（例如 ENTJ，不知道填"待测"）
> 团队角色：（例如 CEO / 技术 / 市场 / 财务）
>
> 【合伙人2】
> 姓名：
> 出生日期：
> 出生时间：
> MBTI：
> 团队角色：
>
> （如有更多合伙人，继续添加【合伙人3】……）
> ```
>
> 另外，可选填：**你们目前的发展阶段**（例如"刚起步"/"已有收入"/"准备融资"），有助于分析大运时机。

Wait for the user to fill in and return the template. Accept partial data gracefully — if birth time or MBTI is missing for some partners, note it and proceed with what's available.

---

### 第三步 — 团队架构与分工（仅3人及以上）

**Skip this step entirely for 2-partner teams.**

After receiving partner info, ask:

> **第三步：团队架构**（3人以上需要了解一下）
>
> 请简单告诉我：
>
> 1. **决策结构**：谁是最终拍板人？还是共同决策？（例如："阿华最终决定" / "三人共同表决" / "各自领域自己说了算"）
> 2. **股权/权重**：大致怎么分？（例如："三三三平分" / "阿华40%，其余各30%" / "暂未确定"）
> 3. **有没有明显的主导者和执行者之分？**（例如："阿华主导战略，小明和小李负责执行" / "三人比较平等"）

Collect: decision structure + equity split + hierarchy clarity. Use this in the complementarity matrix and role division sections. If the user says "暂未确定" for equity, note it and still proceed — the chart analysis will surface who naturally holds more authority energy.

---

### 第四步 — 确认生成

Display a summary table and ask for confirmation:

> 好的！整理一下收到的信息：
>
> | 合伙人 | 出生日期 | 时辰 | MBTI | 角色 |
> |--------|----------|------|------|------|
> | NAME_1 | YYYY/MM/DD | HH时 | TYPE | ROLE |
> | NAME_2 | YYYY/MM/DD | HH时 | TYPE | ROLE |
>
> **团队架构**（如有）：DECISION_STRUCTURE · EQUITY_SPLIT
>
> 信息确认无误吗？确认后我将开始生成 **{TEAM_NAME} 事业合伙人深度相性报告** 🔍

Wait for confirmation (or corrections) before proceeding to the Workflow section.

---

**Field reference** (for each partner):

| Field | Detail |
|-------|--------|
| **姓名** | Chinese + optional English/nickname |
| **出生日期** | Year/Month/Day (solar/Gregorian 公历) |
| **出生时辰** | Hour 0–23, or 时辰 (子=23, 丑=1, 寅=3, 卯=5, 辰=7, 巳=9, 午=11, 未=13, 申=15, 酉=17, 戌=19, 亥=21) |
| **MBTI** | 4-letter type; "待测" if unknown |
| **团队角色** | Their function/title in the business |

---

## Workflow

> **命盘计算完整性规则**：所有命盘数据（四柱、五行、十神、神煞）必须按 `personal-destiny-report` 技能的 `references/astro-calculations.md` 中的公式现场推算。严禁直接沿用或继承对话记录中已出现的任何命盘结论——即使用户或上一轮已给出"结果"，也必须独立验算后才能使用。
>
> **将星分类**：将星属于**命格类**，不属于凶煞类。在神煞全景对照表中，将星必须归入命格类区块（魁罡、将星、华盖、驿马、阴阳差错所在行），绝不出现在凶煞类区块。

### Step 1 — Calculate BaZi for Each Partner

For each person, using the algorithm in the personal-destiny-report skill's `references/astro-calculations.md`:
- Four pillars (year/month/day/hour) with stem, branch, element
- Five Elements tally
- Day Master 日主 (day stem)
- 格局 Pattern + strength (strong/weak)

**十神 (Ten Gods) — compute for all 7 non-Day-Master characters per partner**:
For each of: year stem, year branch, month stem, month branch, day branch, hour stem, hour branch — compute the ten-god name relative to Day Master using the polarity + element-relationship rules in personal-destiny-report's `references/astro-calculations.md` → Ten Gods section. Record name + display color for the comparison table.

**神煞 (Spirit Stars) — full four-category audit per partner** (using astro-calculations.md → Extended 神煞 section):
- **命格类**: 魁罡, 将星, 华盖, 驿马, 阴阳差错
- **贵人类**: 文昌, 天乙贵人, 国印贵人, 太极贵人
- **人缘类**: 桃花
- **凶煞类**: 羊刃, 孤辰/寡宿, 天罗地网, 劫煞/亡神
Record: present/absent, count occurrences, which position for each person. Compute total star count per person.

**Cross-partner 神煞 constellation analysis** (compute before writing HTML — these drive Section 贰's callout cards):
- **将星分布**: Who has 将星 and in which position? Multiple partners with 将星 = leadership collision zone; needs domain split. Single 将星 = natural authority center.
- **魁罡阵容**: How many partners are 魁罡? Multiple = 铁腕团队 (iron-will team), extremely powerful but requires hard boundaries between roles. Each 魁罡 partner must own a clear independent domain.
- **华盖密度**: Total 华盖 count across all partners. High density = visionary/creative team ahead of market curve — excellent product thinking but needs commercialization grounding.
- **驿马分布**: Who has 驿马 and who doesn't? 驿马 partners = natural expanders/openers; non-驿马 partners = operational anchors. If all have 驿马, the team needs a stable COO-level function.
- **十神格局对比**: What is each partner's dominant 十神 pattern (印星旺/官杀旺/财星旺/食伤旺/比劫旺)? These determine natural business role alignment — e.g., 食伤旺 = product/creative; 官杀旺 = execution/authority; 财星旺 = monetization/client-facing; 印星旺 = strategy/research.

Record in a compact table before writing HTML.

### Step 2 — Five Elements Business Energy Map

Chart how each partner's Day Master element relates to every other partner's **from a business execution perspective**:

**生克关系 in business context**:
- 相生 (A generates B): A energizes B's domain — B performs better with A present
- 相克 (A restrains B): A challenges B — creates productive tension when channeled well; friction when not
- 同类 (same element): peer energy — amplifies shared strengths AND shared blind spots
- 被生 (B is generated by A): B receives energy — B often leads while A supports from behind

**Business dimension mapping** (which element excels at what):
- 木 (Wood): Vision, growth, people development, sales relationships
- 火 (Fire): Brand/marketing, presentation, inspiration, team culture
- 土 (Earth): Operations, stability, customer relationships, cash flow management
- 金 (Metal): Execution, systems, legal/contracts, quality control, negotiation
- 水 (Water): Strategy, research, finance, risk assessment, adaptability

Label each pair with: element relationship + which business domains naturally cooperate vs. create friction.

**Special constellations to check**:
- One partner's wealth element = another partner's Day Master → 命理财引 (fortune attractor pairing)
- All five elements represented across the team → 五行俱全团队 (complete elemental coverage)
- Two partners sharing 将星 → 双星领导 (dual leadership tension — needs clear domain split)
- One partner's 驿马 = another's 天乙贵人 → 贵人拓路 (noble opens the door to expansion)

### Step 3 — MBTI Business Ecosystem Analysis

Analyze the team's MBTI distribution specifically for business execution:
- **I/E balance**: Does the team have external-facing people AND deep thinkers?
- **N/S gap**: Do they have big-picture visionaries AND practical implementers?
- **F/T balance**: Customer empathy vs. data-driven decision making
- **J/P balance**: Structure and deadlines vs. adaptability and pivoting
- **Key business type pairs**:
  - NT (INTJ/ENTJ/INTP/ENTP): Strategy, systems, complexity
  - NF (INFJ/ENFJ/INFP/ENFP): Vision, people, meaning
  - ST (ISTJ/ESTJ/ISTP/ESTP): Execution, operations, pragmatism
  - SF (ISFJ/ESFJ/ISFP/ESFP): Customer care, harmony, practical support
- **Missing quadrant** = the team's most likely operational blind spot

### Step 4 — Pairwise Partnership Scoring (事业合伙指数)

For every pair, calculate a **事业合伙指数 /100**:

Base: 55 (business partnerships have inherently higher friction than family)

Add points:
- Day Masters in 相生 relationship: +15–20
- Wealth element alignment (one's wealth star = other's Day Master): +12–18
- Day Masters 同类 (same element) with different 格局: +8–12
- Day Masters in 相克 with matching 格局 strengths: +5–10 (productive tension)
- Shared 天乙贵人 or 将星: +5–8
- 驿马 + 文昌 pairing (one expands, other strategizes): +8–12
- MBTI same quadrant (NT/NF/ST/SF): +8–12
- MBTI complementary (J+P, N+S in same T/F): +6–10
- Opposing MBTI temperaments (NT+SF or NF+ST): +3–5 (complementary but friction-prone)

Deductions:
- Both have 将星, same domain → -8 (leadership collision risk)
- Both same element + same MBTI type → -5 (amplified blind spots)

Cap at 97. Round to nearest whole.

### Step 5 — Fortune Timing Analysis (大运窗口)

For each partner:
- Identify current 大运 (10-year fortune cycle) stem+branch
- Assess whether current 大运 supports 财星, 官杀, or 食伤 — which phase are they in?
  - 财星旺: wealth accumulation period — ideal for revenue focus
  - 官杀旺: authority/structure period — good for formalization, contracts, investors
  - 食伤旺: creativity/output period — best for product development, marketing
  - 印绶旺: learning/support period — good for knowledge acquisition, not lead revenue
  - 比劫旺: peer/competition period — partnership risks, also resource sharing

For the team:
- When do 2+ partners' fortune cycles align for breakthrough? (both in 财星旺 simultaneously)
- Which 3–5 year window has the highest collective fortune energy?
- Any member currently in a transition year (换大运 within next 2 years)?

### Step 6 — Assign Partner Colors

Each partner gets a unique color from this palette based on Day Master element:

| Slot | CSS variable pair | For |
|------|-------------------|-----|
| 水/blue | `--slate` (#1e3a5f) / `--slate-faint` (#dce8f5) | Water 水 Day Master |
| 木/teal | `--teal` (#1a5248) / `--teal-faint` (#d6f0eb) | Wood 木 Day Master |
| 土/amber | `--amber` (#b07820) / `--amber-faint` (#faf0d0) | Earth 土 Day Master |
| 火/rust | `--rust` (#8b3a1a) / `--rust-faint` (#faeee8) | Fire 火 Day Master |
| 金/steel | `--steel` (#3a4a6b) / `--steel-faint` (#e8ecf5) | Metal 金 Day Master |
| 阴/plum | `--plum` (#6b3a6b) / `--plum-faint` (#f0eaf8) | Secondary or neutral |

### Step 7 — Generate the HTML

Read `references/css.md` for the complete CSS.
Read `references/sections.md` for all section skeletons.

**Output filename**: `{team_name}_事业合伙人相性报告.html`

**Theme**: Slate (professional dark-navy/steel/amber on cream paper) — always use the Slate theme for business reports.

---

## Sections to Generate

### 壹 — 合伙人命盘总览
- Overview table (one row per partner): name/role/DOB | 日主+格局 | MBTI | 核心事业神煞 | 天然商业角色
- Callout: **3 most revealing partnership discoveries** — the most striking cross-partner chart connections
- Partner Five Elements chain (`partner-map`): visualize how the elements flow through the team, with business domain labels

### 贰 — 命盘十神骨架 · 神煞全景对照

Use the `## Section 贰 — 命盘十神骨架 · 神煞全景对照` skeleton from `references/sections.md`.

Part 0 — 命盘总览一览表 (renders first, before Part A):
- One row per partner with 7 columns: 人 | 日主 | 五行阴阳 | 用的格局 | 日主强度 | 材质感 | 核心关键词
- 日主: two-char stem+element label (e.g., 壬水, 辛金)
- 五行阴阳: yin/yang + element (e.g., 阳水, 阴金) — yang=阳 for 甲丙戊庚壬, yin=阴 for 乙丁己辛癸
- 用的格局: dominant pattern name(s), joined with · if two (e.g., 正印·偏财格, 七杀格)
- 日主强度: pill badge — 身强(green), 身弱/偏弱(amber), 极弱(red)
- 材质感: poetic metaphor derived from Day Master — 甲木→参天大树 乙木→藤萝花草 丙火→骄阳烈日 丁火→烛光星火 戊土→巍峨山岳 己土→田园沃土 庚金→刀剑矿铁 辛金→珠玉精金 壬水→江河奔流 癸水→雨露灵泉
- 核心关键词: 4 evocative single-character or 2-character trait words joined by 、, derived from Day Master + dominant pattern + MBTI (e.g., 决断、规则、执行、担当)
- Name cell uses this person's assigned color; table has minimal styling (thin borders, no fill)

Part A — 十神分析·命盘骨架结构:
- Color-coded legend bar
- Multi-column table: left column = pillar position labels (年干/年支/月干/月支/日干/日支/时干/时支/格局/日主强弱), one column per partner
- Each cell: ten-god badge with character + ten-god name, colored by category
- Day Master (日干) row: all cells use gold 日主 badge
- 格局 row: amber `pat-badge` per partner
- 日主强弱 row: strength badge (color: green for 身强, amber for 偏弱/身弱, red for 极弱)
- Below table: one insight card per partner summarizing their dominant 十神 pattern and its business meaning (e.g., "印星旺极=研究型决策者", "食伤格=产品创意驱动")

Part B — 神煞对照·特殊天赋加成:
- Legend bar (green/gold/red/dash)
- Multi-column table: left column = 14 神煞 rows grouped by 4 category dividers, one column per partner
- Badge styles: green (有/单现), gold (✅✅ 双现/多现), red (⚡ 凶煞), dash (无)
- Total count row at bottom (large number per partner)

Part C — 魁罡·将星·华盖·驿马 跨伙伴商业动态:
- 4 summary cards (2×2 grid):
  - **将星 · 指挥与决策权**: who has it → leadership collision or natural authority center → recommended domain split or command structure
  - **魁罡 · 铁腕与边界**: how many → team's iron-will density → role separation requirement and execution contract recommendation
  - **华盖 · 创意与市场调性**: density across team → visionary/niche team alert, or balanced creative-commercial → commercialization recommendation
  - **驿马 · 扩张与稳定性**: who are the expanders vs. anchors → team's change-tolerance profile → whether to hire stable COO or leverage mobility
- Callout: one paragraph synthesizing the team's overall 神煞 power profile and the single most important organizational implication

### 肆 — N人商业人格深度画像
- One `person-card` per partner, in a grid (3-column for ≤3; 2-column for 4+)
- Each card: avatar, name/role, BaZi + MBTI tags, 4 trait rows (商业核心/核心天赋/关键神煞/事业暗礁), 4 strength bars (business dimensions), one-line business-focused quote
- Strength bar dimensions — choose 4 that reveal the most about each partner in a business context:
  - Options: 战略视野, 执行力, 财运引力, 人际影响, 风险承受, 创新突破, 系统思维, 品牌感召, 客户洞察, 谈判能力, 团队凝聚, 危机应对...

### 伍 — 两两事业相性深度分析
- One `rel-card` per pair (for 2 partners: 1 card; for 3: 3 cards; for 4: consider showing top 4 pairs)
- Header: element pair + MBTI pair + 事业合伙指数
- Body (2-col):
  - Left: 五行商业层面 (which business domains they naturally cover together), 命格共鸣 (special chart connections), MBTI决策化学 (how they make decisions together)
  - Right: 最强协同点 (biggest synergy), 最优分工建议 (optimal role division based on chart + type)
- Friction box: biggest collaboration friction point with specific root cause
- Solution box: concrete co-working protocol to neutralize the friction
- Callout: the single most powerful thing about this business pairing

### 陆 — 团队事业运势窗口
- Fortune timing table: each partner's current 大运 phase + business implication
- Best collective window: when 2+ partners' charts align for breakthrough (3–5 year horizon)
- Warning window: any transition years to navigate carefully
- Two-column summary: 当前最强的财运角色 (who is in their wealth peak right now) + 团队的贵人运分析 (who carries noble helper energy for the team this cycle)

### 柒 — 团队能量互补矩阵
- Two-column: MBTI团队生态 (what the team collectively has + what's missing + the business blind spot) + 五行能量覆盖 (which elements are represented, which are absent, what that means operationally)
- Complementarity summary table: each domain (战略/执行/财务/市场/运营/创新) mapped to the partner(s) best suited for it based on chart
- Two-column insight boxes: 1–2 specific team-level patterns (e.g., all 驿马 = high-change team needing stable base; no 土 = cash flow blind spot)

### 捌 — 事业合作核心建议总览
- Summary table: each pair | 最大协同 | 最需做的一件事 | 合伙指数
- Two actionable recommendation boxes: one specific partnership ritual/protocol, one strategic milestone to target together

### 玖 — N人事业命格一句话
- One `quote-card` per partner with colored left bar
- Each: name/type/element heading, then 3–5 sentence poetic summary covering: business metaphor tied to their element, their commercial superpower, their collaboration blind spot, their irreplaceable role in this team

### 终 — 诗歌收尾
- Centered poem: one line per partner using their element + business metaphor
- 2–3 prose lines on what this partnership uniquely has the power to build
- Source line: "{team} 合伙人团队 · 八字 × MBTI 事业相性报告 · {year}"

---

## Narrative Voice & Quality Standards

**What makes business partner reports special** — the unique value is **commercial clarity**: understanding WHO does WHAT best and WHEN to act, grounded in actual chart data.

1. **Name the exact business domain connection**: Don't say "your elements complement each other." Say: "小明壬水的策略天赋天然克制阿华丙火的冲动决策——水克火不是障碍，是阿华最需要的商业刹车。"

2. **Role clarity over vague compatibility**: Every section should leave the reader knowing exactly who should lead which function. Weak = "你们很互补." Strong = "销售开拓交给阿华的将星，后台运营交给小明的文昌——这不是猜测，是命理分工图。"

3. **Fortune timing is the killer feature**: Give specific timeframe recommendations based on 大运. "2025–2027年两人同时走财星旺运" is actionable. "运势不错" is useless.

4. **MBTI blind spot must name the missing function**: If the team has no S types, say: "你们的团队没有一个落地者——找一个 ISTJ 的 COO 或外部顾问，否则战略永远停在PPT。"

5. **Friction analysis must be root-cause specific**: Trace friction back to chart or type, not personality judgment. "你们的摩擦来自Jeff的七杀直接冲击小明的日主甲木——这不是Jeff强势，是命盘设计的张力。"

6. **Strength bars for business**: Choose dimensions that tell the story of this team's commercial profile. Collectively the bars should show what this team is exceptional at and what they'll consistently struggle with.

7. **Closing poem**: One line per partner using a business-nature metaphor. Then prose lines that are genuinely visionary about what this team can build.

**Specificity checklist** — before writing each section, verify you have:
- [ ] The exact Day Master and element for each partner
- [ ] At least one cross-partner wealth/official/output element connection named
- [ ] Each person's key business 神煞 used in analysis (especially 天乙贵人, 将星, 驿马)
- [ ] Current 大运 phase for each partner identified
- [ ] MBTI types driving all decision-making and role insights
- [ ] Pairwise scores feel differentiated (not all 85)
- [ ] At least one specific 3–5 year fortune window named
- [ ] Role division recommendations are concrete (not "communicate better")
