---
name: children-ai-report
description: "Generate comprehensive AI-era child development reports (AI时代孩子综合发展规划报告) as dark-themed, self-contained HTML files. Each report synthesizes BaZi 八字, MBTI, Western Astrology 星座星盘, and the child's interests/hobbies into a complete AI-era talent profile — showing exactly how this child's natural gifts make them irreplaceable in the AI age, with a concrete development roadmap. Use when the user asks for AI时代培养报告, 孩子AI时代分析, 孩子发展规划, 如何培养孩子, AI时代不可替代, 孩子天赋分析, children AI era report, or provides a child's birth data and interests and asks how to raise/develop them. Also triggers on 孩子命理, 孩子星盘, parenting strategy AI age, 孩子综合分析, 兴趣与天赋结合."
---

# AI时代孩子综合发展规划报告

Generate a richly designed, dark-themed HTML report that integrates all four systems (BaZi + MBTI + Western Astrology + 兴趣爱好) to answer: **这个孩子天生为AI时代而来，他/她如何变得不可替代？**

## Reference Files

- `references/framework.md` — AI三大死穴分析框架 + how to map BaZi/MBTI/Western/hobbies to each dimension
- `references/css.md` — Dark theme CSS with per-child color system + all component styles
- `references/sections.md` — Complete HTML section skeletons for every section

---

## Interactive Data Collection (Step-by-Step)

Collect conversationally in this **exact sequence**. Ask one step at a time, wait for the answer, then move to the next. Repeat Steps 2–5 for each child before moving to the next child.

If the user provides all data upfront in one message, skip the conversation and go straight to the Workflow section.

---

### Step 1 — 几个孩子？

Ask:

> 好的，我来帮你生成《AI时代孩子综合发展规划报告》。
>
> **第一步：这份报告要分析几个孩子？**
>
> （多个孩子时，每个孩子独立成一个分析板块。）

Collect: number of children. Then start Step 2 for the first child.

---

### Step 2 — 姓名、生日、性别

For each child (label clearly: 第一个孩子 / 第二个孩子 / etc.), ask:

> **第二步：[第N个孩子的] 基本信息**
>
> 请告诉我：
> - **姓名**（中文名 + 英文名或昵称，如有）
> - **性别**（男孩 / 女孩）
> - **出生日期**（年 / 月 / 日，公历）

---

### Step 3 — 出生地和出生时间

> **第三步：出生地点和时间**
>
> - **出生城市**（例如：上海、多伦多——用于推算西方星盘上升星座）
> - **出生时间**（几点几分？或时辰名称，例如"申时" = 下午3–5点）
>
> 时辰速查：子=23时, 丑=1时, 寅=3时, 卯=5时, 辰=7时, 巳=9时, 午=11时, 未=13时, 申=15时, 酉=17时, 戌=19时, 亥=21时
>
> 如果不知道准确时间，可以填大概时段（如"早上"、"下午"），我会给出估算结果。

---

### Step 4 — MBTI 和性格

> **第四步：MBTI 类型和性格特质**
>
> - **MBTI 类型**（例如：ESTP、INFP……若未正式测过，填"待测"或描述孩子的大致性格也可以）
> - **你观察到这个孩子最突出的性格特点是什么？**（可选，例如：特别有冲劲、很敏感、超级社交达人、喜欢独处……越具体越好）

---

### Step 5 — 兴趣爱好和特长

> **第五步：兴趣爱好和特长**
>
> - **主要兴趣爱好**（例如：乒乓球、绘画、编程、写作、乐高……越具体越好）
> - **目前展现出的特长或天赋**（例如：记忆力超强、运动协调性很好、特别有同理心……）
> - **有没有特别痴迷、废寝忘食的事情？**（可选——这往往是最重要的信号）

---

After Step 5, if there are more children, repeat Steps 2–5 for the next child.

---

### Step 6 — 确认生成

Once all children's data is collected, show a confirmation summary:

> 好的，收集完毕！以下是我将用于分析的信息：
>
> **[第N个孩子 · 姓名]**
> - 性别：XX | 生日：YYYY/MM/DD | 出生地：XX | 出生时间：XX时
> - MBTI：XX | 性格特点：XX
> - 兴趣爱好：XX | 特长：XX
>
> （如有多个孩子，逐一列出）
>
> 确认无误吗？确认后我将开始生成报告。

Wait for confirmation (or corrections) before proceeding to the Workflow.

---

## Workflow

> **命盘计算完整性规则**：所有命盘数据（四柱、五行、十神、神煞）必须按 `personal-destiny-report` 技能的 `references/astro-calculations.md` 中的公式现场推算。严禁直接沿用或继承对话记录中已出现的任何命盘结论——即使用户或上一轮已给出"结果"，也必须独立验算后才能使用。
>
> **将星分类**：将星属于**命格类**，不属于凶煞类。生成任何神煞表格时，将星必须与魁罡、华盖、驿马、阴阳差错同属命格类区块，禁止放入凶煞类。

### Step 1 — Calculate BaZi

Using the algorithm in `personal-destiny-report` skill's `references/astro-calculations.md`:
- Four pillars (年/月/日/时) + elements
- Five Elements tally
- Day Master (日主) + 格局 pattern + strength
- Key 神煞: 七杀/三重七杀, 天乙贵人, 驿马, 华盖, 文昌 (or 文昌空亡), 将星, 国印贵人, 阴阳差错

### Step 2 — Western Astrology

From birth date/time/city (same as personal-destiny-report skill):
- Sun sign + degree
- Moon sign
- Rising sign (ASC) — changes every ~2 hours
- Key planets in houses: Mars (action), Venus (aesthetics), Jupiter (expansion), Saturn (discipline)
- Standout aspects: exaltations (★), challenging placements

### Step 3 — Read the Framework

Read `references/framework.md` for:
- AI的三大死穴 definitions (Intent, Skin, Grounding)
- How to map each system + hobbies to the right AI dimension
- How to identify the child's specific "irreplaceable core"

### Step 4 — Cross-System Synthesis

Before writing any HTML, identify:
1. **Core identity (核心命格)**: What do all 4 systems + interests agree this child fundamentally IS?
2. **Top 3 irreplaceable strengths**: Which specific gifts counter AI's 3 structural weaknesses?
3. **Convergent talent zone**: Where do BaZi + MBTI + Western + hobbies ALL point to the same domain?
4. **Key weaknesses**: What 2 challenges does the chart show — and how does AI specifically compensate?
5. **Development path**: What's the concrete AI-era archetype for this child?

### Step 5 — Assign Child Color Theme

Read `references/css.md` → Color Themes section. Assign based on Day Master element + MBTI:
- 乙木/甲木 + NF types → **Green Circuit** (growth, organic)
- 壬水/癸水 + IN types → **Indigo Ink** (depth, literary)
- 庚金/辛金 + ST types → **Teal Steel** (precision, sport)
- 丙火/丁火 + EF types → **Coral Fire** (influence, performance)
- 戊土/己土 + NT types → **Amber Stone** (strategy, building)

For multi-child: assign different themes. Never repeat.

### Step 6 — Generate HTML

Read `references/css.md` for CSS.
Read `references/sections.md` for all section skeletons.

**Output filename**: `AI时代如何培养{child_name(s)}.html`

---

## Report Sections (in order)

**Single child:**
1. Header (child badge + name + chips + opening quote)
2. 四维天赋全景 — 4-system talent overview cards
3. 兴趣与命格的交叉点 — how hobbies connect to all 4 systems
4. AI时代互补矩阵 — the 4-column table (3 rows)
5. 必须警惕的短板 — 2 warning cards + AI rescue
6. AI时代培养策略 — 4 strategy cards
7. 终极发展目标 — final goal box

**Multi-child:** parent header → [child block] × N with separator between.

---

## Narrative Voice & Quality Standards

**Core argument per child:**
> AI能做X，但AI永远无法做Y。这个孩子天生就是Y的专家。X + Y = 不可替代。

**Specificity rules:**
- Every claim traces to an actual 神煞, strength score, MBTI function, planet placement, or specific hobby
- The "combo" column in the matrix must feel like a concrete business strategy, not a platitude
- "兴趣爱好" must appear in the matrix and strategies — not just as decoration
- Warning cards: the AI救场 must name a specific use of AI (not just "use AI")
- Strategy cards: each one should be actionable this week

**Four-system synthesis standard:** The most powerful analysis moments are when 3+ systems point to the same gift. Name them explicitly: "七杀格 × ESTP的Se × 火星H1 × 乒乓球——四重信号，同指现实世界博弈型天才".
