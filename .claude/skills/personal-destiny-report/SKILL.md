---
name: personal-destiny-report
description: Generate individual Chinese destiny analysis reports (个人四系统算命报告/命理报告) as polished, self-contained HTML files combining BaZi 八字, MBTI, Western Astrology 星座星盘, and Zi Wei Dou Shu 紫微斗数. Use this skill whenever the user wants to create a 算命报告, destiny report, 四系统分析, 命理分析, 个人报告, birth chart reading, or asks to analyze someone's destiny using Chinese or Western systems. Also triggers on phrases like "帮我做一个报告", "分析一下命格", "生成命理报告", or providing someone's birth data and asking what it means.
---

# 四系统命理综合分析报告

Generate a richly designed, self-contained HTML destiny report that synthesizes four astrological/psychological systems for one person. The output matches the dark luxury aesthetic of the `Template/Personal/` examples in the LucaPath project.

## Reference Files

- `references/design-system.md` — Complete CSS to embed verbatim in the output HTML
- `references/html-sections.md` — Exact HTML skeleton for each report section
- `references/astro-calculations.md` — BaZi algorithm, ZiWei palace rules, Western astro guide

Read these **as you need them** — don't load all three at once upfront.

---

## Interactive Data Collection (Step-by-Step)

Collect conversationally in this exact sequence. Ask one step at a time, wait for the answer before continuing. If the user provides all data upfront in one message, skip the conversation and go straight to the Workflow section.

---

### Step 1 — 基本信息

> 好的，我来帮你生成个人四系统命理综合分析报告。
>
> **第一步：基本信息**
>
> 请告诉我：
> - **姓名**（中文名 + 英文名或昵称，如有）
> - **性别**（男 / 女）
> - **出生日期**（年 / 月 / 日，公历）
> - **出生城市**（用于推算西方星盘上升星座，例如：上海、多伦多）
> - **出生时间**（几点几分？或时辰名称，例如"申时" = 下午3–5点）
>
> 时辰速查：子=23时, 丑=1时, 寅=3时, 卯=5时, 辰=7时, 巳=9时, 午=11时, 未=13时, 申=15时, 酉=17时, 戌=19时, 亥=21时

---

### Step 2 — MBTI 类型

> **第二步：MBTI 类型**
>
> - **你的 MBTI 类型是什么？**（例如：INFJ、ESTP、ENFP……若未正式测过填"待测"，我会根据后续性格描述辅助判断）

---

### Step 3 — 性格与心理

> **第三步：性格深度**
>
> - **你认为自己最突出的性格特点是什么？**（可选，例如：内敛、直觉强、喜欢独处、天生领袖气质……）
> - **你觉得自己最大的内在矛盾或困扰是什么？**（可选——这会让报告更有深度）

---

### Step 4 — 家庭信息

> **第四步：家庭背景**
>
> - **婚姻状况**（未婚 / 已婚 / 离异 / 其他）
> - **伴侣信息**（如有，可提供对方姓名、MBTI、出生年份，用于感情分析）
> - **子女情况**（有几个孩子？大概年龄？可选）
> - **原生家庭有什么值得提及的背景吗？**（可选，例如：家庭结构、跟父母的关系模式）

---

### Step 5 — 职业与规划

> **第五步：职业现状与发展方向**
>
> - **目前从事什么行业 / 职业？**
> - **工作年限？目前在职场的阶段？**（例如：刚起步、管理层、转型期、创业……）
> - **你最希望在职业上实现什么？** 或 **目前最大的职业困惑是什么？**
> - **有没有正在考虑的转型方向？**（可选）

---

### Step 6 — 关注重点与特别问题

> **第六步：这份报告你最想聚焦在哪里？**
>
> 请从以下方向中选择1–3个重点（或用自己的话描述）：
>
> - 💼 **职业与事业** — 适合什么方向、什么时候是关键节点
> - 💰 **财运与财富** — 财从何来、何时是财运高峰
> - ❤️ **感情与关系** — 感情模式、理想伴侣、婚姻时机
> - 🌍 **跨境与移居** — 是否适合在海外发展、驿马命格分析
> - 🔮 **大运流年** — 当前处于什么人生阶段、未来10年重点
> - ✨ **其他** — 有什么特别想问命盘的问题？
>
> 你的回答将决定报告中哪些部分写得更深入。

---

### Step 7 — 确认生成

Show a brief summary, then ask:

> 好的，信息收集完毕！确认以下内容后开始生成报告：
>
> - **姓名**：XX | **性别**：XX | **生日**：YYYY/MM/DD | **出生地**：XX | **时辰**：XX时
> - **MBTI**：XX | **婚姻**：XX | **职业**：XX
> - **报告重点**：XX
>
> 确认无误吗？确认后我将生成完整的四系统命理综合分析报告。

---

## Workflow

> **命盘计算完整性规则**：所有命盘数据（四柱、五行、十神、神煞）必须按 `references/astro-calculations.md` 中的公式现场推算。严禁直接沿用或继承对话记录中已出现的任何命盘结论——即使用户或上一轮已给出"结果"，也必须独立验算后才能使用。
>
> **将星分类**：将星属于**命格类**，不属于凶煞类。在任何神煞表格或分析中，将星必须归入命格类区块。
>
> **神煞经典算法**：所有神煞必须严格按 `references/astro-calculations.md` 的**经典查表法**判定，禁止任何近似/自创判据。尤其注意四个高频错点：① **国印贵人**按日干查表（戊见丑，**不是**见巳/午）；② **太极贵人**按日干查表，单支命中即算有（戊己见辰戌丑未任一支，**不是**辰戌或丑未成对同现）；③ **阴阳差错**仅限经典12日（丙子丁丑戊寅辛卯壬辰癸巳丙午丁未戊申辛酉壬戌癸亥，庚戌/庚辰等**不算**）；④ **孤辰寡宿**按三会方 亥子丑/寅卯辰/巳午未/申酉戌 分组（**不是** 子丑寅/卯辰巳）。

### Step 1 — Calculate BaZi (八字)

Read `references/astro-calculations.md` → **BaZi section** for the algorithm.

Compute and record:
- Four pillars: year / month / day / hour (stem + branch + element for each)
- Five Elements tally (木火土金水 counts across all 8 characters)
- Day Master 日主 (day stem element = the person's core element)
- 格局 Pattern (正印/偏财/七杀/etc.) — based on month branch hidden stem vs Day Master
- Strength: count Day Master + supporting elements; ≥4 of 8 = strong, else weak
- 用神 Favorable element (what the Day Master needs most)

**十神 (Ten Gods) — compute for all 7 non-Day-Master characters**:
For each of: year stem, year branch, month stem, month branch, day branch, hour stem, hour branch — determine the ten-god name relative to Day Master using the polarity + element-relationship rules in `references/astro-calculations.md` → Ten Gods section. Record the ten-god name and its display color for use in Section 陆.

**神煞 (Spirit Stars) — full four-category audit**:
Check all four categories using the lookup tables in `references/astro-calculations.md` → Extended 神煞 section:

- **命格类**: 魁罡 (day pillar exact match), 将星 (year/day branch group), 华盖 (year branch group — count all pillar hits), 驿马 (year/day branch group), 阴阳差错 (day pillar exact match)
- **贵人类**: 文昌 (day stem lookup — count all 8 pillar hits), 天乙贵人 (day stem lookup — count all branch hits), 国印贵人 (day stem lookup 经典查表: 甲戌乙亥丙丑丁寅戊丑己寅庚辰辛巳壬未癸申), 太极贵人 (day stem lookup 经典查表: 甲乙→子午 / 丙丁→卯酉 / 戊己→辰戌丑未 / 庚辛→寅亥 / 壬癸→巳申)
- **人缘类**: 桃花 (year/day branch group — count all hits)
- **凶煞类**: 羊刃 (day stem peak branch), 孤辰/寡宿 (year branch group, check for those branches elsewhere), 天罗地网 (戌 = 天罗 / 辰 = 地网 / both = 齐备), 劫煞/亡神 (year/day branch group)

For each star: record present/absent, count occurrences, note which pillar position(s) it appears in. Compute total star count and per-category counts for the summary row.

### Step 2 — Western Astrology

Read `references/astro-calculations.md` → **Western Astrology section**.

From birth date/time/location derive:
- Sun sign + degree (always precise)
- Moon sign (approximate ±1 sign if no exact birth time)
- Rising sign / ASC (needs birth hour + location; changes every ~2 hours)
- Midheaven MC
- Key planet placements: ☿Mercury, ♀Venus, ♂Mars, ♃Jupiter, ♄Saturn — sign + house
- Note rulerships/exaltations (★) and challenged placements

### Step 3 — Zi Wei Dou Shu (紫微斗数)

Read `references/astro-calculations.md` → **Zi Wei Dou Shu section**.

Determine:
- 局数 (Cycle): from birth year Heavenly Stem
- 命宫 (Life Palace): from birth month + birth hour combination
- Major star in 命宫 = the person's defining ZiWei identity
- Stars in key palaces: 官禄 (career), 财帛 (wealth), 夫妻 (relationship), 迁移 (travel/foreign)
- 四化 for birth year: which stars carry 化禄/化权/化科/化忌
- 大限 (10-year major cycles): current cycle + next two

### Step 4 — Cross-System Synthesis

Before writing HTML, identify convergences:
1. **Core identity**: What do all 4 systems say about this person's essential nature?
2. **Career alignment**: What path do 3+ systems point to?
3. **Wealth pattern**: How will wealth come — active, passive, management?
4. **Key warnings**: What do 2+ systems flag as risk areas?
5. **Life peak timing**: When do multiple systems agree the best years arrive?
6. **Opening sentence**: Craft the hero summary — one paragraph that distills all four systems into a single vivid picture. Example: "四套系统，同一个答案。壬水日主·太阴坐命·双子上升·INFJ预言家——无论哪一套命理语言，描述的都是同一个灵魂..."

### Step 5 — Generate the HTML

Read `references/design-system.md` for the complete CSS block.  
Read `references/html-sections.md` for section-by-section HTML skeletons.

**Output filename**: `{Chinese name} · 四系统命理综合分析报告.html`  
Save it in the current project directory or working directory.

**Report sections** (in order):
壹 Overview → 贰 Career → 叁 Wealth → 肆 Relationships → 伍 Life Cycles → **陆 命盘骨架·十神·神煞** → 柒 Comparison Table → Final Insight → Footer

**Section 壹 (四套命理系统总览)** — the 八字 sys-card's info block (格局/神煞 area) now has three lines — fill them as follows:
- **格局 line**: `格局：PATTERN_NAME · STRENGTH · 喜/用FAVORABLE_ELEMENT` — STRENGTH is 身强/身弱/偏弱/极弱 in plain text
- **日主强度 line**: `日主强度：STRENGTH_LABEL（SCORE/8） · 用神方向：YONGSHEN_DIRECTION`
  - STRENGTH_LABEL + STRENGTH_COLOR: 身强 → green `#3a9060`; 身弱/偏弱 → amber `#a07828`; 极弱 → red `#c04030`
  - SCORE/8: count how many of the 8 characters (4 stems + 4 branches) support or strengthen the Day Master; express as n/8 (e.g., 5/8)
  - YONGSHEN_DIRECTION: one concise sentence naming the favorable element(s) and the life/talent dimension they unlock — e.g., "水木为喜，调和金旺、引出表达力" or "火土为用，补弱扶身、激活行动力"
- **神煞 line**: tag badges as before
- After the four sys-cards and before the cross-system callout, render the BaZi Quick-Reference Summary Row (see skeleton in `references/html-sections.md`):
- Single-row table with 7 columns: 人 | 日主 | 五行阴阳 | 用的格局 | 日主强度 | 材质感 | 核心关键词
- 日主: two-char stem+element (e.g., 壬水)
- 五行阴阳: yin/yang + element (阳 for 甲丙戊庚壬; 阴 for 乙丁己辛癸) + element name (e.g., 阳水)
- 用的格局: dominant pattern(s), joined with · if two (e.g., 正印·偏财格)
- 日主强度: pill badge — 身强(green #3a9060), 身弱/偏弱(amber #a07828), 极弱(red #c04030)
- 材质感: 甲木→参天大树 乙木→藤萝花草 丙火→骄阳烈日 丁火→烛光星火 戊土→巍峨山岳 己土→田园沃土 庚金→刀剑矿铁 辛金→珠玉精金 壬水→江河奔流 癸水→雨露灵泉
- 核心关键词: 4 evocative single/two-char trait words joined by 、, synthesized from Day Master + dominant pattern + MBTI

**Section 陆 (命盘骨架·十神·神煞)** — use the computed 十神 and 神煞 data from Step 1:
- Render four-pillar × ten-god badges (year/month/day/hour × stem/branch) with correct colors from the Ten Gods color table
- Day stem always renders as gold 日主 badge
- 格局 summary bar below the pillars
- Four-category 神煞 table with appropriate badge styles (green = present, gold = double/triple, red = 凶煞, dash = absent)
- Total count row showing all 14 星 items tallied
- Per-category breakdown cards (4 cards: 命格类, 贵人类, 人缘类, 凶煞类)
- Closing callout synthesizing the ten-god pattern + most notable 神煞 into career/talent insight

**Accent color** — choose or use user preference:
- **Gold** (default): `:root` uses `--gold:#c8a03c`, background `--bg:#07101e` (dark navy) — see template 林均元
- **Crimson**: `--crim:#a02850`, background `--bg:#08080e` (dark charcoal) — see template 王迪 — swap all `var(--gold)` references in hero/sections to `var(--crim)`, `var(--gl)` to `var(--criml)`

---

## Narrative Voice & Quality Standards

These determine whether the report feels like a real product or a generic printout:

**Voice**: Authoritative, poetic, Chinese. Use domain vocabulary naturally (命格, 大限, 宫位, 格局). Mix precise terms with plain-language payoff. Address the subject directly ("你的命盘", "这一生").

**Specificity**: Every claim must trace back to an actual star, planet, or type dimension. Bad: "你的事业运很好". Good: "天机化权入官禄宫——战略分析和快速迭代是你在职场建立权威的方式".

**Cross-system synthesis**: The most powerful moments are when multiple systems point the same direction. Explicitly name convergences: "四套系统高度一致：..." or "八字偏财格×H8太阳×天同化禄——三重财星同时指向..."

**Per-section content depth** (match the templates):
- Analysis cards: 3–4 `ac-item` items, each with a `<strong>` keyword lead + 1–2 sentence explanation
- Insight boxes: 4–6 sentences, bolding key cross-system terms
- Callouts: 2–3 focused sentences, one clear action/takeaway
- Comparison table: fill all 8 rows × 4 systems with concise, accurate entries

**Tone calibration**: Lean toward empowering and insightful, not foreboding. When flagging warnings (化忌, challenging aspects, difficult神煞), frame them as "awareness areas", not curses.

---

## After Generating

Tell the user:
1. The file path
2. How to open it: `open "{filename}.html"` or just double-click
3. One-line note on the most striking cross-system convergence you found
