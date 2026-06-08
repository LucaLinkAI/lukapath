# HTML Section Skeletons

Use these as exact structural templates. Replace ALL_CAPS placeholders with generated content. Preserve every class name and inline style pattern exactly.

---

## Full Document Wrapper

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NAME · 四系统命理综合分析报告</title>
[GOOGLE_FONTS_LINK]
<style>
[PASTE_FULL_CSS_HERE]
</style>
</head>
<body>

[HERO]
[SECTION_1_OVERVIEW]
[SECTION_2_CAREER]
[SECTION_3_WEALTH]
[SECTION_4_RELATIONSHIPS]
[SECTION_5_LIFE_CYCLES]
[SECTION_6_SHENSHEN_ANALYSIS]
[SECTION_7_COMPARISON_TABLE]
[ORNAMENT]
[FINAL_INSIGHT]
[FOOTER]

</body>
</html>
```

---

## HERO Section

```html
<div class="hero">
  <div class="hero-sys">
    <span class="sys-badge sb-bazi">八字命理</span>
    <span class="sys-badge sb-mbti">MBTI心理</span>
    <span class="sys-badge sb-west">西方星盘</span>
    <span class="sys-badge sb-ziwei">紫微斗数</span>
  </div>
  <div class="hero-name">CHINESE_NAME</div>
  <div class="hero-name-en">ENGLISH_NAME · Comprehensive Destiny Analysis</div>
  <div class="hero-data">
    <span>📅 YEAR年MONTH月DAY日</span>
    <span>🕒 HOUR_NAME HOUR:00</span>
    <span>📍 BIRTH_CITY</span>
    <span>🌙 DAYMASTER日主</span>
    <span>⬆️ RISING_SIGN上升</span>
    <span>☯ ZIWEI_LIFE_STAR坐命</span>
  </div>
  <div class="hero-summary">
    OPENING_SYNTHESIS_PARAGRAPH — one paragraph (3–5 sentences) that distills the core identity across all 4 systems. Bold the key cross-system convergence terms. Example pattern: "四套系统，同一个答案。<strong>日主·命宫主星·上升·MBTI类型</strong>——无论哪一套命理语言，描述的都是同一个灵魂：[vivid one-line archetype description]。命盘清晰度在所有分析案例中属于[evaluation]类。"
  </div>
</div>
```

---

## Section 壹 — 四套命理系统总览

```html
<div class="section">
  <div class="sec-hd">
    <div class="sec-num">壹</div>
    <div class="sec-title">四套命理系统总览</div>
    <div class="sec-line"></div>
  </div>

  <div class="sys-grid">

    <!-- 八字 Card -->
    <div class="sys-card sc-bazi">
      <div class="sys-card-hd">
        <div class="sys-card-icon">☯</div>
        <div>
          <div class="sys-card-title">八字命理</div>
          <div class="sys-card-en">Four Pillars of Destiny</div>
        </div>
      </div>
      <div class="sys-card-body">
        <!-- Four Pillars -->
        <div class="pillars">
          <!-- Repeat for 年/月/日/时 -->
          <div class="pillar">
            <div class="p-label">年柱</div>
            <div class="p-box">
              <div class="p-stem" style="color:STEM_ELEMENT_COLOR">YEAR_STEM</div>
              <div class="p-branch" style="color:BRANCH_ELEMENT_COLOR">YEAR_BRANCH</div>
              <div class="p-wx">STEM_ELEMENT·BRANCH_ELEMENT</div>
            </div>
          </div>
          <!-- month: p-label=月柱, day: p-label=日柱 (highlight day box: style="border-color:rgba(60,180,140,0.4)"), hour: p-label=时柱 -->
        </div>
        <!-- Five Elements bars — width% = count/8 * 100 -->
        <div class="wx-bars">
          <div class="wx-row"><div class="wx-lbl" style="color:#3a9060">木</div><div class="wx-track"><div class="wx-fill" style="width:WIDTH%;background:#3a9060"></div></div><div class="wx-cnt">COUNT</div></div>
          <div class="wx-row"><div class="wx-lbl" style="color:#c04030">火</div><div class="wx-track"><div class="wx-fill" style="width:WIDTH%;background:#c04030"></div></div><div class="wx-cnt">COUNT</div></div>
          <div class="wx-row"><div class="wx-lbl" style="color:#a07828">土</div><div class="wx-track"><div class="wx-fill" style="width:WIDTH%;background:#a07828"></div></div><div class="wx-cnt">COUNT</div></div>
          <div class="wx-row"><div class="wx-lbl" style="color:#7090c0">金</div><div class="wx-track"><div class="wx-fill" style="width:WIDTH%;background:#7090c0"></div></div><div class="wx-cnt">COUNT</div></div>
          <div class="wx-row"><div class="wx-lbl" style="color:#2860a8">水</div><div class="wx-track"><div class="wx-fill" style="width:WIDTH%;background:#2860a8"></div></div><div class="wx-cnt">COUNT</div></div>
        </div>
        <div style="font-size:12px;color:var(--w6);margin-top:8px;line-height:1.7">
          格局：<span style="color:var(--bazil)">PATTERN_NAME</span> · STRENGTH · 喜/用FAVORABLE_ELEMENT<br>
          日主强度：<span style="color:STRENGTH_COLOR">STRENGTH_LABEL（SCORE/8）</span> · 用神方向：YONGSHEN_DIRECTION<br>
          神煞：<span class="tag tag-bazi">SHENSHAS</span>
        </div>
      </div>
    </div>

    <!-- MBTI Card -->
    <div class="sys-card sc-mbti">
      <div class="sys-card-hd">
        <div class="sys-card-icon">🧠</div>
        <div>
          <div class="sys-card-title">MBTI · TYPE</div>
          <div class="sys-card-en">TYPE_EN_NAME / TYPE_CN_NAME</div>
        </div>
      </div>
      <div class="sys-card-body">
        <div style="font-family:'Noto Serif SC',serif;font-size:36px;font-weight:300;letter-spacing:0.2em;color:var(--mbtil);text-align:center;margin:8px 0;text-shadow:0 0 30px rgba(112,144,224,0.3)">TYPE</div>
        <div class="mbti-dims">
          <!-- Show whichever pole is dominant; width = dominant% -->
          <div class="dim-row"><div class="dim-letter">I_OR_E</div><div class="dim-bar"><div class="dim-fill" style="width:PCT%"></div></div><div style="font-size:10px;color:var(--w4);width:24px;text-align:right">PCT%</div></div>
          <div class="dim-row"><div class="dim-letter">N_OR_S</div>...(repeat for F/T and J/P)</div>
        </div>
        <div style="font-size:12px;color:var(--w6);margin-top:10px;line-height:1.8">
          <span class="tag tag-mbti">KEY_TRAIT_1</span><span class="tag tag-mbti">KEY_TRAIT_2</span><span class="tag tag-mbti">KEY_TRAIT_3</span><br>
          ONE_SENTENCE_TYPE_DESCRIPTION_with_population_percentage_and_core_gift
        </div>
      </div>
    </div>

    <!-- Western Astrology Card -->
    <div class="sys-card sc-west">
      <div class="sys-card-hd">
        <div class="sys-card-icon">🌌</div>
        <div>
          <div class="sys-card-title">西方星盘</div>
          <div class="sys-card-en">Western Astrology · Placidus</div>
        </div>
      </div>
      <div class="sys-card-body">
        <div class="west-grid">
          <!-- 8 key placements; highlight important ones with style on .wp-sign -->
          <div class="wp-row"><div class="wp-planet">☀️</div><div class="wp-name">太阳</div><div class="wp-sign">SIGN DEGREE°</div><div class="wp-house">HN</div></div>
          <div class="wp-row"><div class="wp-planet">🌙</div><div class="wp-name">月亮</div><div class="wp-sign">SIGN</div><div class="wp-house">HN</div></div>
          <div class="wp-row"><div class="wp-planet">⬆️</div><div class="wp-name">上升</div><div class="wp-sign" style="color:#e0c860">RISING SIGN</div><div class="wp-house">ASC</div></div>
          <div class="wp-row"><div class="wp-planet">🌟</div><div class="wp-name">天顶</div><div class="wp-sign" style="color:#e0c860">MC_SIGN</div><div class="wp-house">MC</div></div>
          <div class="wp-row"><div class="wp-planet">☿</div><div class="wp-name">水星</div><div class="wp-sign">SIGN</div><div class="wp-house">HN</div></div>
          <div class="wp-row"><div class="wp-planet">♀</div><div class="wp-name">金星</div><div class="wp-sign">SIGN</div><div class="wp-house">HN</div></div>
          <div class="wp-row"><div class="wp-planet">♂</div><div class="wp-name">火星</div><div class="wp-sign">SIGN</div><div class="wp-house">HN</div></div>
          <div class="wp-row"><div class="wp-planet">♃</div><div class="wp-name">木星★</div><div class="wp-sign" style="color:#e0c860">SIGN</div><div class="wp-house">HN</div></div>
        </div>
        <div style="font-size:11.5px;color:var(--w6);margin-top:8px">
          <span class="tag tag-west">RISING上升</span><span class="tag tag-west">NOTABLE_PLACEMENT</span><span class="tag tag-west">NOTABLE_PLACEMENT</span>
        </div>
      </div>
    </div>

    <!-- ZiWei Card -->
    <div class="sys-card sc-ziwei">
      <div class="sys-card-hd">
        <div class="sys-card-icon">👑</div>
        <div>
          <div class="sys-card-title">紫微斗数</div>
          <div class="sys-card-en">Purple Star Astrology · CYCLE_NAME局</div>
        </div>
      </div>
      <div class="sys-card-body">
        <!-- 12-palace mini grid: show ~12 cells in 4 columns -->
        <!-- Use zm-cell.highlight for 命宫, zm-cell.active for wealth/career palace -->
        <div class="ziwei-mini">
          [12 zm-cell divs arranged as 4×3 grid, each showing palace name + main star(s)]
          <!-- Center span-2 cell shows the summary -->
          <div class="zm-cell" style="grid-column:span 2;background:rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;padding:8px">
            <div style="text-align:center;font-family:'Noto Serif SC',serif">
              <div style="font-size:9px;color:var(--w4);margin-bottom:2px">命宫·PALACE_BRANCH · CYCLE_NAME局</div>
              <div style="font-size:11px;color:var(--zweil)">LIFE_STAR坐命</div>
              <div style="font-size:9px;color:var(--w4);margin-top:2px">身宫·BODY_PALACE（PALACE_NAME）</div>
            </div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--w6);margin-top:4px">
          <span class="tag tag-ziwei">KEY_4HUA_STAR化KEY_TYPE</span><span class="tag tag-ziwei">KEY_PATTERN</span><span class="tag tag-gold">OVERALL_LABEL</span>
        </div>
      </div>
    </div>

  </div>

  <!-- BaZi Quick-Reference Summary Row -->
  <!-- 材质感 lookup: 甲木→参天大树 乙木→藤萝花草 丙火→骄阳烈日 丁火→烛光星火 戊土→巍峨山岳 己土→田园沃土 庚金→刀剑矿铁 辛金→珠玉精金 壬水→江河奔流 癸水→雨露灵泉 -->
  <!-- 日主强度 pill: 身强→color:#3a9060;bg:rgba(58,144,96,0.08) | 身弱/偏弱→color:#a07828;bg:rgba(160,120,40,0.08) | 极弱→color:#c04030;bg:rgba(192,64,48,0.08) -->
  <div style="overflow-x:auto;border-radius:10px;border:0.5px solid rgba(255,255,255,0.08);margin-bottom:20px">
  <table style="width:100%;border-collapse:collapse;min-width:560px">
    <thead>
      <tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
        <th style="padding:9px 14px;text-align:left;font-size:9.5px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);font-weight:400;background:rgba(255,255,255,0.03)">人</th>
        <th style="padding:9px 10px;text-align:left;font-size:9.5px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);font-weight:400;background:rgba(255,255,255,0.03)">日主</th>
        <th style="padding:9px 10px;text-align:left;font-size:9.5px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);font-weight:400;background:rgba(255,255,255,0.03)">五行阴阳</th>
        <th style="padding:9px 10px;text-align:left;font-size:9.5px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);font-weight:400;background:rgba(255,255,255,0.03)">用的格局</th>
        <th style="padding:9px 10px;text-align:left;font-size:9.5px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);font-weight:400;background:rgba(255,255,255,0.03)">日主强度</th>
        <th style="padding:9px 10px;text-align:left;font-size:9.5px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);font-weight:400;background:rgba(255,255,255,0.03)">材质感</th>
        <th style="padding:9px 14px;text-align:left;font-size:9.5px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);font-weight:400;background:rgba(255,255,255,0.03)">核心关键词</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:14px 14px;font-family:'Noto Serif SC',serif;font-size:15px;font-weight:500;color:var(--gold);white-space:nowrap">PERSON_NAME</td>
        <td style="padding:14px 10px;font-size:13px;color:var(--w7);white-space:nowrap">DAYMASTER_CHAR日主</td>
        <td style="padding:14px 10px;font-size:13px;color:var(--w7);white-space:nowrap">YIN_YANG_ELEMENT <!-- e.g. 阳水 --></td>
        <td style="padding:14px 10px;font-size:13px;color:var(--w7)">PATTERN_NAME <!-- e.g. 正印·偏财格 --></td>
        <td style="padding:14px 10px;white-space:nowrap">
          <span style="font-size:12px;padding:2px 10px;border-radius:20px;color:STRENGTH_COLOR;background:STRENGTH_BG">STRENGTH_LABEL</span>
        </td>
        <td style="padding:14px 10px;font-size:13px;color:var(--w5);white-space:nowrap">MATERIAL_METAPHOR <!-- e.g. 江河奔流 --></td>
        <td style="padding:14px 14px;font-size:12.5px;color:var(--w7)">KW1、KW2、KW3、KW4</td>
      </tr>
    </tbody>
  </table>
  </div>

  <!-- Cross-system summary callout -->
  <div class="callout">
    <strong>四套系统共同结论：</strong>CROSS_SYSTEM_SYNTHESIS — 2–3 sentences identifying what all 4 systems agree on. Name specific terms from each system that point the same direction.
  </div>
</div>
```

---

## Section 贰 — 职业运势分析

```html
<div class="section">
  <div class="sec-hd">
    <div class="sec-num">贰</div>
    <div class="sec-title">职业运势分析</div>
    <div class="sec-line"></div>
  </div>

  <div class="analysis-grid">
    <!-- 八字 card -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(60,180,140,0.2)">
        <div class="ac-dot" style="background:var(--bazil)"></div>
        <div class="ac-title" style="color:var(--bazil)">八字 · 职业密码</div>
      </div>
      <div class="ac-body">
        <div class="ac-item"><strong>PATTERN_KEYWORD</strong>——CAREER_INSIGHT_1</div>
        <div class="ac-item"><strong>KEYWORD_2</strong>——INSIGHT_2</div>
        <div class="ac-item"><strong>KEYWORD_3</strong>——INSIGHT_3</div>
        <div class="ac-item"><strong>SHENSHA_OR_ELEMENT</strong>——INSIGHT_4</div>
        <div style="margin-top:12px">
          <span class="tag tag-bazi">CAREER_TAG_1</span><span class="tag tag-bazi">CAREER_TAG_2</span><span class="tag tag-bazi">CAREER_TAG_3</span>
        </div>
      </div>
    </div>

    <!-- MBTI card -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(80,100,200,0.2)">
        <div class="ac-dot" style="background:var(--mbtil)"></div>
        <div class="ac-title" style="color:var(--mbtil)">MBTI · 职业特质</div>
      </div>
      <div class="ac-body">
        [3–4 ac-item with MBTI career strengths, ideal roles, working style, what to avoid]
        <div style="margin-top:12px">
          <span class="tag tag-mbti">TAG</span><span class="tag tag-mbti">TAG</span>
        </div>
      </div>
    </div>

    <!-- Western card -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(140,80,220,0.2)">
        <div class="ac-dot" style="background:var(--westl)"></div>
        <div class="ac-title" style="color:var(--westl)">西方星盘 · 职业宫位</div>
      </div>
      <div class="ac-body">
        [3–4 ac-item covering H10/MC, career planets, Sun house, notable career indicators]
        <div style="margin-top:12px">
          <span class="tag tag-west">TAG</span><span class="tag tag-west">TAG</span>
        </div>
      </div>
    </div>

    <!-- ZiWei card -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(220,80,100,0.2)">
        <div class="ac-dot" style="background:var(--zweil)"></div>
        <div class="ac-title" style="color:var(--zweil)">紫微斗数 · 官禄宫</div>
      </div>
      <div class="ac-body">
        [3–4 ac-item covering 官禄宫 main star, 四化 effects, career pattern]
        <div style="margin-top:12px">
          <span class="tag tag-ziwei">TAG</span><span class="tag tag-ziwei">TAG</span>
        </div>
      </div>
    </div>
  </div>

  <div class="insight">
    <div class="insight-label">职业命格综合结论</div>
    <div class="insight-text">
      CAREER_SYNTHESIS — 4–6 sentences naming the convergent career archetype, the strongest supporting indicators from multiple systems, and the single clearest career direction.
    </div>
  </div>
</div>
```

---

## Section 叁 — 财运深度解读

```html
<div class="section">
  <div class="sec-hd">
    <div class="sec-num">叁</div>
    <div class="sec-title">财运深度解读</div>
    <div class="sec-line"></div>
  </div>

  <!-- 4 stat cards: key wealth indicators from each system -->
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-val">BAZI_WEALTH_TYPE</div>
      <div class="stat-label">八字财星<br>WEALTH_NATURE</div>
      <div class="stat-sub">SUBTITLE</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">H_NUMBER</div>
      <div class="stat-label">SUN/JUPITER在第N宫<br>HOUSE_MEANING</div>
      <div class="stat-sub">Western Astrology</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">ZIWEI_WEALTH_STARS</div>
      <div class="stat-label">紫微财星<br>STAR_COMBINATION</div>
      <div class="stat-sub">紫微斗数</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">PEAK_AGE岁</div>
      <div class="stat-label">财运顶峰预测<br>PEAK_BASIS</div>
      <div class="stat-sub">多系统共识</div>
    </div>
  </div>

  <div class="analysis-grid">
    <!-- 八字 wealth card -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(60,180,140,0.2)">
        <div class="ac-dot" style="background:var(--bazil)"></div>
        <div class="ac-title" style="color:var(--bazil)">八字 · 财运结构</div>
      </div>
      <div class="ac-body">
        [3–4 ac-item: wealth star type, Day Master wealth relationship, timing, warnings]
      </div>
    </div>
    <!-- ZiWei wealth card -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(220,80,100,0.2)">
        <div class="ac-dot" style="background:var(--zweil)"></div>
        <div class="ac-title" style="color:var(--zweil)">紫微 · 财帛宫</div>
      </div>
      <div class="ac-body">
        [3–4 ac-item: 财帛宫 main star, 化禄 location, wealth accumulation pattern]
      </div>
    </div>
  </div>

  <div class="callout green">
    <strong>财富时间轴：</strong>WEALTH_TIMELINE_CALLOUT — identify current 大限 theme, when peak wealth arrives, what to do now to prepare.
  </div>
</div>
```

---

## Section 肆 — 家庭与感情分析

```html
<div class="section">
  <div class="sec-hd">
    <div class="sec-num">肆</div>
    <div class="sec-title">家庭与感情分析</div>
    <div class="sec-line"></div>
  </div>

  <div class="analysis-grid">
    <!-- 八字 relationships -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(60,180,140,0.2)">
        <div class="ac-dot" style="background:var(--bazil)"></div>
        <div class="ac-title" style="color:var(--bazil)">八字 · 感情命格</div>
      </div>
      <div class="ac-body">
        [3–4 items: Day Master + spouse star relationship, 神煞 that affect love, 夫妻宫 in BaZi sense]
      </div>
    </div>
    <!-- MBTI + Western combined -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(80,100,200,0.2)">
        <div class="ac-dot" style="background:var(--mbtil)"></div>
        <div class="ac-title" style="color:var(--mbtil)">MBTI + 西方 · 感情特质</div>
      </div>
      <div class="ac-body">
        [3–4 items: MBTI love style, Venus sign, H7 planet, ideal partner type]
      </div>
    </div>
    <!-- ZiWei relationships -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(220,80,100,0.2)">
        <div class="ac-dot" style="background:var(--zweil)"></div>
        <div class="ac-title" style="color:var(--zweil)">紫微 · 夫妻宫</div>
      </div>
      <div class="ac-body">
        [3–4 items: 夫妻宫 main star meaning, 化忌 warnings if any, relationship timing]
      </div>
    </div>
    <!-- Family/children optional card — adapt based on subject -->
    <div class="analysis-card">
      <div class="ac-hd" style="border-color:rgba(200,160,60,0.25)">
        <div class="ac-dot" style="background:var(--gold)"></div>
        <div class="ac-title" style="color:var(--gl)">子女缘 · 家族能量</div>
      </div>
      <div class="ac-body">
        [3–4 items: 子女宫 star, Western H5, ideal partner complementarity, family dynamic notes]
      </div>
    </div>
  </div>
</div>
```

---

## Section 伍 — 大运流年

```html
<div class="section">
  <div class="sec-hd">
    <div class="sec-num">伍</div>
    <div class="sec-title">大运流年 · 人生周期</div>
    <div class="sec-line"></div>
  </div>

  <div style="background:var(--card);border:0.5px solid var(--b3);border-radius:12px;padding:24px 24px 20px;margin-bottom:16px">
    <div style="font-size:11px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:var(--w4);margin-bottom:20px">紫微斗数大限 · CYCLE_NAME · 步长10年</div>
    <div style="position:relative;padding-bottom:8px">
      <!-- Track line -->
      <div style="position:absolute;top:22px;left:7%;right:7%;height:2px;background:var(--b3);border-radius:1px"></div>
      <!-- Filled portion up to current cycle: adjust width % based on how many past cycles -->
      <div style="position:absolute;top:22px;left:7%;width:FILL_PCT%;height:2px;background:linear-gradient(90deg,var(--gold),var(--gl));border-radius:1px"></div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;position:relative">

        <!-- Past cycles: tl-item style (gold dot) -->
        <div style="text-align:center">
          <div style="width:14px;height:14px;background:var(--gold);border:2px solid var(--gold);border-radius:50%;margin:0 auto 10px"></div>
          <div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--w4);margin-bottom:4px">AGE_RANGE岁</div>
          <div style="font-family:'Noto Serif SC',serif;font-size:12px;color:var(--w6);margin-bottom:2px">PALACE_NAME</div>
          <div style="font-size:10px;color:var(--zweil)">MAIN_STARS</div>
          <div style="font-size:9.5px;color:var(--w4);margin-top:4px;line-height:1.4">THEME_SUMMARY</div>
        </div>

        <!-- Current cycle: glowing dot -->
        <div style="text-align:center">
          <div style="width:18px;height:18px;background:var(--gl);border:2px solid var(--gl);border-radius:50%;margin:-2px auto 8px;box-shadow:0 0 14px rgba(224,188,90,0.6)"></div>
          <div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--gl);margin-bottom:4px;font-weight:700">▶ 现在 AGE_RANGE</div>
          <div style="font-family:'Noto Serif SC',serif;font-size:12px;color:var(--gl);margin-bottom:2px">PALACE_NAME</div>
          <div style="font-size:10px;color:var(--zweil)">MAIN_STARS</div>
          <div style="font-size:9.5px;color:var(--gl);margin-top:4px;line-height:1.4">CURRENT_THEME</div>
        </div>

        <!-- Future cycles: empty dot -->
        <div style="text-align:center">
          <div style="width:14px;height:14px;background:transparent;border:2px solid var(--b2);border-radius:50%;margin:0 auto 10px"></div>
          <div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--w4);margin-bottom:4px">AGE_RANGE岁</div>
          <div style="font-family:'Noto Serif SC',serif;font-size:12px;color:var(--gl);margin-bottom:2px">PALACE_NAME ⭐</div>
          <div style="font-size:10px;color:var(--gold)">MAIN_STARS</div>
          <div style="font-size:9.5px;color:var(--gold);margin-top:4px;line-height:1.4;font-weight:500">FUTURE_PEAK_LABEL</div>
        </div>

      </div>
    </div>
  </div>

  <div class="callout red">
    <strong>当前大限（AGE_RANGE岁）行动指南：</strong>CURRENT_DAXIAN_GUIDANCE — what this cycle's palace stars mean, what to build/focus on now, what the next peak cycle will deliver.
  </div>
</div>
```

---

## Section 陆 — 命盘骨架 · 十神 · 神煞详解

```html
<div class="section">
  <div class="sec-hd">
    <div class="sec-num">陆</div>
    <div class="sec-title">命盘骨架 · 十神 · 神煞详解</div>
    <div class="sec-line"></div>
  </div>

  <!-- ── 十神 Analysis ── -->
  <div style="margin-bottom:28px">
    <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.18em;color:var(--w4);margin-bottom:14px">十神分析 · 以日主DAYMASTER为基准 · 看八字中每个字的关系</div>

    <!-- Legend -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;padding:12px 16px;background:var(--card);border-radius:8px;border:0.5px solid var(--b3)">
      <span style="font-size:10px;color:var(--w4);font-family:'DM Mono',monospace;margin-right:4px">十神：</span>
      <span style="display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--w6)"><span style="width:8px;height:8px;border-radius:2px;background:#9090a8;display:inline-block"></span>比肩·劫财（同类）</span>
      <span style="display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--w6)"><span style="width:8px;height:8px;border-radius:2px;background:#d4c040;display:inline-block"></span>食神·伤官（我生）</span>
      <span style="display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--w6)"><span style="width:8px;height:8px;border-radius:2px;background:#40b878;display:inline-block"></span>偏财·正财（我克）</span>
      <span style="display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--w6)"><span style="width:8px;height:8px;border-radius:2px;background:#6080e0;display:inline-block"></span>七杀·正官（克我）</span>
      <span style="display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--w6)"><span style="width:8px;height:8px;border-radius:2px;background:#b060e0;display:inline-block"></span>偏印·正印（生我）</span>
    </div>

    <!-- Four Pillar × Ten Gods Grid -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">

      <!-- Year Pillar -->
      <div style="background:var(--card);border:0.5px solid var(--b3);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--w4);letter-spacing:0.15em;margin-bottom:10px">年柱</div>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid YEAR_STEM_TG_COLOR40;background:YEAR_STEM_TG_BG;margin-bottom:6px;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:YEAR_STEM_TG_COLOR">YEAR_STEM</span>
          <span style="font-size:9px;color:YEAR_STEM_TG_COLOR;opacity:0.85">YEAR_STEM_TG_NAME</span>
        </div>
        <br>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid YEAR_BRANCH_TG_COLOR40;background:YEAR_BRANCH_TG_BG;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:YEAR_BRANCH_TG_COLOR">YEAR_BRANCH</span>
          <span style="font-size:9px;color:YEAR_BRANCH_TG_COLOR;opacity:0.85">YEAR_BRANCH_TG_NAME</span>
        </div>
      </div>

      <!-- Month Pillar -->
      <div style="background:var(--card);border:0.5px solid var(--b3);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--w4);letter-spacing:0.15em;margin-bottom:10px">月柱</div>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid MONTH_STEM_TG_COLOR40;background:MONTH_STEM_TG_BG;margin-bottom:6px;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:MONTH_STEM_TG_COLOR">MONTH_STEM</span>
          <span style="font-size:9px;color:MONTH_STEM_TG_COLOR;opacity:0.85">MONTH_STEM_TG_NAME</span>
        </div>
        <br>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid MONTH_BRANCH_TG_COLOR40;background:MONTH_BRANCH_TG_BG;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:MONTH_BRANCH_TG_COLOR">MONTH_BRANCH</span>
          <span style="font-size:9px;color:MONTH_BRANCH_TG_COLOR;opacity:0.85">MONTH_BRANCH_TG_NAME</span>
        </div>
      </div>

      <!-- Day Pillar — day stem is 日主 (gold), day branch gets its ten god -->
      <div style="background:var(--card);border:0.5px solid rgba(200,160,32,0.3);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--gold);letter-spacing:0.15em;margin-bottom:10px">日柱</div>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid rgba(200,160,32,0.4);background:rgba(200,160,32,0.18);margin-bottom:6px;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:#c8a020">DAY_STEM</span>
          <span style="font-size:9px;color:#c8a020;opacity:0.9">日主</span>
        </div>
        <br>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid DAY_BRANCH_TG_COLOR40;background:DAY_BRANCH_TG_BG;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:DAY_BRANCH_TG_COLOR">DAY_BRANCH</span>
          <span style="font-size:9px;color:DAY_BRANCH_TG_COLOR;opacity:0.85">DAY_BRANCH_TG_NAME</span>
        </div>
      </div>

      <!-- Hour Pillar -->
      <div style="background:var(--card);border:0.5px solid var(--b3);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--w4);letter-spacing:0.15em;margin-bottom:10px">时柱</div>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid HOUR_STEM_TG_COLOR40;background:HOUR_STEM_TG_BG;margin-bottom:6px;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:HOUR_STEM_TG_COLOR">HOUR_STEM</span>
          <span style="font-size:9px;color:HOUR_STEM_TG_COLOR;opacity:0.85">HOUR_STEM_TG_NAME</span>
        </div>
        <br>
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:5px 12px;border-radius:6px;border:0.5px solid HOUR_BRANCH_TG_COLOR40;background:HOUR_BRANCH_TG_BG;min-width:52px">
          <span style="font-family:'Noto Serif SC',serif;font-size:18px;font-weight:500;color:HOUR_BRANCH_TG_COLOR">HOUR_BRANCH</span>
          <span style="font-size:9px;color:HOUR_BRANCH_TG_COLOR;opacity:0.85">HOUR_BRANCH_TG_NAME</span>
        </div>
      </div>

    </div>

    <!-- 格局 summary bar -->
    <div style="padding:12px 18px;background:var(--card);border-radius:8px;border:0.5px solid var(--b3);display:flex;align-items:center;gap:20px;flex-wrap:wrap">
      <div style="font-size:12px;color:var(--w6)">格局：<span style="color:var(--gl);font-family:'Noto Serif SC',serif;font-size:13px">PATTERN_NAME</span></div>
      <div style="font-size:12px;color:var(--w6)">日主强弱：<span style="color:STRENGTH_COLOR;font-weight:500">DAYMASTER_STRENGTH</span></div>
      <div style="font-size:12px;color:var(--w6)">用神：<span style="color:FAVORABLE_COLOR">FAVORABLE_ELEMENT</span></div>
      <div style="font-size:11px;color:var(--w4);flex:1;text-align:right">TEN_GODS_DOMINANT_PATTERN（如：印星旺·官杀格）</div>
    </div>
  </div>

  <!-- ── 神煞 Four-Category Table ── -->
  <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.18em;color:var(--w4);margin-bottom:12px">神煞对照 · 特殊天赋加成 · 四类分析</div>

  <!-- Legend -->
  <div style="display:flex;gap:18px;margin-bottom:14px;flex-wrap:wrap;align-items:center;font-size:11px;color:var(--w6)">
    <div style="display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:2px;background:rgba(42,128,80,0.5)"></div>有（单现）</div>
    <div style="display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:2px;background:rgba(200,160,32,0.5)"></div>双现/多现</div>
    <div style="display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:2px;background:rgba(138,24,32,0.6)"></div>凶煞/注意</div>
    <div style="display:flex;align-items:center;gap:6px"><div style="width:10px;height:10px;border-radius:2px;background:rgba(255,255,255,0.06);border:0.5px solid rgba(255,255,255,.15)"></div>无</div>
  </div>

  <div style="overflow-x:auto;border-radius:12px;box-shadow:0 4px 32px rgba(0,0,0,.4);margin-bottom:20px">
  <table style="width:100%;border-collapse:collapse;min-width:440px">
    <thead>
      <tr>
        <th style="background:rgba(4,10,20,1);padding:12px 14px;text-align:left;font-size:10px;font-family:'DM Mono',monospace;letter-spacing:0.12em;color:rgba(245,240,228,0.4);border-bottom:1.5px solid rgba(200,160,32,0.22);border-right:0.5px solid rgba(255,255,255,0.08);width:140px">神煞</th>
        <th style="background:rgba(16,30,56,1);padding:12px 10px;text-align:center;font-size:11px;color:var(--gl);border-bottom:1.5px solid rgba(200,160,32,0.22);width:140px">状态</th>
        <th style="background:rgba(16,30,56,1);padding:12px 14px;text-align:left;font-size:11px;color:rgba(245,240,228,0.6);border-bottom:1.5px solid rgba(200,160,32,0.22)">天赋解读</th>
      </tr>
    </thead>
    <tbody>

      <!-- ═══ 命格类 ═══ -->
      <tr><td colspan="3" style="padding:5px 14px;background:rgba(4,10,20,.95);font-size:9.5px;letter-spacing:0.2em;color:rgba(245,240,228,0.4);font-family:'DM Mono',monospace;border-bottom:0.5px solid rgba(200,160,32,0.22)">命格类 · CHARACTER STARS</td></tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">魁罡<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Iron Will</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">
          <!-- Present: --> <span style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:20px;font-size:10.5px;font-weight:500;white-space:nowrap;background:rgba(42,128,80,0.15);border:0.5px solid rgba(60,180,100,0.3);color:#40c070">✅ 日柱 DAYMASTER_PILLAR</span>
          <!-- Absent: --> <span style="color:rgba(245,240,228,0.15);font-size:13px">—</span>
        </td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">KUIGANG_INTERPRETATION — e.g., "独立意志极强，自我要求严苛，天生领袖质感"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">将星<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Command</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">JIANGXING_INTERPRETATION — "天生组织力，擅长统筹和带领团队"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">华盖<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Spiritual</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">HUAGAI_INTERPRETATION — single: "艺术/灵性天赋" | double: "少数派灵魂，天才型创意" | triple: "极度独特，命格罕见"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">驿马<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Travel</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">YIMA_INTERPRETATION — "适合跨城跨国发展，因移动而获利"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">阴阳差错<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Misalign</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">YINYANG_INTERPRETATION — "感情缘分奇特，相遇时机与常人不同"</td>
      </tr>

      <!-- ═══ 贵人类 ═══ -->
      <tr><td colspan="3" style="padding:5px 14px;background:rgba(4,10,20,.95);font-size:9.5px;letter-spacing:0.2em;color:rgba(245,240,228,0.4);font-family:'DM Mono',monospace;border-bottom:0.5px solid rgba(200,160,32,0.22)">贵人类 · NOBILITY STARS</td></tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">文昌<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Literary</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">
          <!-- Single: green badge | Double: gold badge | Void 空亡: weak yellow badge -->
          STATUS_BADGE
        </td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">WENCHANG_INTERPRETATION — "学习力强，善于表达和写作" | double: "双文昌：学术或写作的命格天赋"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">天乙贵人<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Noble</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">TIANYI_INTERPRETATION — "一生有贵人扶持，危急时刻往往有人伸出援手"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">国印贵人<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">State Seal</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">GUOYIN_INTERPRETATION — "有官方/机构背书的运势加持，适合体制内晋升或名声积累"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">太极贵人<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Supreme</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">TAIJI_INTERPRETATION — "人生有重大转折和命运逆袭时刻，能量对立产生极大张力"</td>
      </tr>

      <!-- ═══ 人缘类 ═══ -->
      <tr><td colspan="3" style="padding:5px 14px;background:rgba(4,10,20,.95);font-size:9.5px;letter-spacing:0.2em;color:rgba(245,240,228,0.4);font-family:'DM Mono',monospace;border-bottom:0.5px solid rgba(200,160,32,0.22)">人缘类 · SOCIAL STARS</td></tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">桃花<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Charisma</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">TAOHUA_INTERPRETATION — "天生磁场，容易吸引人，社交魅力突出"</td>
      </tr>

      <!-- ═══ 凶煞类 ═══ -->
      <tr><td colspan="3" style="padding:5px 14px;background:rgba(4,10,20,.95);font-size:9.5px;letter-spacing:0.2em;color:rgba(245,240,228,0.4);font-family:'DM Mono',monospace;border-bottom:0.5px solid rgba(200,160,32,0.22)">凶煞类 · CHALLENGING STARS</td></tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">羊刃<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Sword</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">
          <!-- If present: red badge --> <span style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:20px;font-size:10.5px;font-weight:500;white-space:nowrap;background:rgba(138,24,32,0.15);border:0.5px solid rgba(180,40,60,0.25);color:#e08090">⚡ 位置</span>
          <!-- If absent: --> <span style="color:rgba(245,240,228,0.15);font-size:13px">—</span>
        </td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">YANGREN_INTERPRETATION — "意志力极强但容易激进，与七杀同现时能量倍增，需要学习适度"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">孤辰/寡宿<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Solitude</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">GUCHEN_INTERPRETATION — "内心有独处的需求，与人亲密到一定程度后需要空间，非负面"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">天罗地网<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Trapped</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">TIANLUODIWANG_INTERPRETATION — 天罗: "戌年/戌柱，有时感到被束缚" | 地网: "辰年/辰柱，思虑过重易陷困局" | 齐备: "需要主动破局，命运考验也是命盘张力"</td>
      </tr>

      <tr>
        <td style="padding:10px 14px;font-size:11.5px;font-weight:500;color:rgba(245,240,228,0.6);background:rgba(6,14,28,.9);border-right:0.5px solid rgba(255,255,255,0.08);border-bottom:0.5px solid rgba(255,255,255,0.08)">劫煞/亡神<span style="font-size:9px;display:block;opacity:.5;font-family:'DM Mono',monospace">Loss</span></td>
        <td style="padding:8px 6px;text-align:center;background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08)">STATUS_BADGE</td>
        <td style="padding:8px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(10,20,40,.5);border-bottom:0.5px solid rgba(255,255,255,0.08);line-height:1.6">JIESHA_INTERPRETATION — "财物或关系上有意外流失的风险，需要注意合同和信任边界"</td>
      </tr>

      <!-- ═══ Total Count Row ═══ -->
      <tr style="background:rgba(4,10,20,.98)">
        <td style="padding:14px 14px;font-size:11px;color:var(--gold);font-family:'DM Mono',monospace;font-weight:500;letter-spacing:0.06em">综合神煞统计</td>
        <td style="padding:12px 6px;text-align:center;background:rgba(4,10,20,.98)">
          <div style="font-family:'DM Mono',monospace;font-size:22px;color:var(--gl);line-height:1">TOTAL_COUNT</div>
          <div style="font-size:9px;color:rgba(245,240,228,0.4);margin-top:2px">项神煞</div>
        </td>
        <td style="padding:12px 14px;font-size:11px;color:rgba(245,240,228,0.6);background:rgba(4,10,20,.98);line-height:1.6">OVERALL_STAR_SUMMARY — e.g., "命格类X项·贵人类X项·人缘类X项·凶煞类X项。凶煞多≠命差，往往意味着更强的命盘张力和潜力。"</td>
      </tr>

    </tbody>
  </table>
  </div>

  <!-- Category Breakdown Cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px">
    <div style="background:var(--card);border:0.5px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px">
      <div style="font-family:'Noto Serif SC',serif;font-size:12px;color:var(--gold);margin-bottom:8px;padding-bottom:6px;border-bottom:0.5px solid rgba(255,255,255,0.08)">命格类 CHAR_COUNT项</div>
      <div style="font-size:11px;color:rgba(245,240,228,0.6);line-height:1.7">CHAR_STARS_SUMMARY — notable character stars and their meaning for this person</div>
    </div>
    <div style="background:var(--card);border:0.5px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px">
      <div style="font-family:'Noto Serif SC',serif;font-size:12px;color:#80a0f0;margin-bottom:8px;padding-bottom:6px;border-bottom:0.5px solid rgba(255,255,255,0.08)">贵人类 NOBLE_COUNT项</div>
      <div style="font-size:11px;color:rgba(245,240,228,0.6);line-height:1.7">NOBLE_STARS_SUMMARY — benefactor stars and their impact on career/life</div>
    </div>
    <div style="background:var(--card);border:0.5px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px">
      <div style="font-family:'Noto Serif SC',serif;font-size:12px;color:#40c070;margin-bottom:8px;padding-bottom:6px;border-bottom:0.5px solid rgba(255,255,255,0.08)">人缘类 SOCIAL_COUNT项</div>
      <div style="font-size:11px;color:rgba(245,240,228,0.6);line-height:1.7">SOCIAL_STARS_SUMMARY — social magnetism details</div>
    </div>
    <div style="background:var(--card);border:0.5px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px">
      <div style="font-family:'Noto Serif SC',serif;font-size:12px;color:#e08090;margin-bottom:8px;padding-bottom:6px;border-bottom:0.5px solid rgba(255,255,255,0.08)">凶煞类 CHALLENGING_COUNT项</div>
      <div style="font-size:11px;color:rgba(245,240,228,0.6);line-height:1.7">CHALLENGING_STARS_SUMMARY — awareness areas and how they become strengths. 凶煞多≠命差。</div>
    </div>
  </div>

  <!-- Ten Gods Insight Callout -->
  <div class="callout">
    <strong>命盘骨架综合解读：</strong>TEN_GODS_AND_SHENSHEN_SYNTHESIS — 3 sentences: (1) The dominant 十神 pattern and what it means for personality/career (e.g., "以七杀格为主导——命盘天生带有行动力和竞争意志"); (2) The most remarkable 神煞 combination; (3) A forward-looking note on how to leverage the special gifts and be aware of the challenging stars.
  </div>
</div>
```

---

## Section 柒 — 四套系统终极对照表

```html
<div class="section">
  <div class="sec-hd">
    <div class="sec-num">柒</div>
    <div class="sec-title">四套系统终极对照表</div>
    <div class="sec-line"></div>
  </div>

  <div class="comp-wrap">
    <table class="comp-table">
      <thead>
        <tr>
          <th>命格维度</th>
          <th class="hl" style="color:var(--bazil)">八字命理</th>
          <th class="hl" style="color:var(--mbtil)">MBTI</th>
          <th class="hl" style="color:var(--westl)">西方星盘</th>
          <th class="hl" style="color:var(--zweil)">紫微斗数</th>
        </tr>
      </thead>
      <tbody>
        <!-- 8 rows: 灵魂底色 | 职业核心 | 事业最强点 | 财富密码 | 国际/跨境 | 感情特质 | 最大风险 | 人生顶峰期 -->
        <tr>
          <td>灵魂底色</td>
          <td class="bazi-cell">DAYMASTER日主<br>ARCHETYPE</td>
          <td class="mbti-cell">TYPE特质<br>TYPE_EN_ARCHETYPE</td>
          <td class="west-cell">RISING上升<br>SUN_HOUSE太阳</td>
          <td class="ziwei-cell">LIFE_STAR坐命<br>ZIWEI_ARCHETYPE</td>
        </tr>
        <!-- ... 7 more rows ... -->
        <tr>
          <td>最大风险</td>
          <td class="bazi-cell"><span class="warn">⚡</span> RISK_1</td>
          <td class="mbti-cell"><span class="warn">⚡</span> RISK_2</td>
          <td class="west-cell"><span class="warn">⚡</span> RISK_3</td>
          <td class="ziwei-cell"><span class="warn">⚡</span> RISK_4</td>
        </tr>
        <tr>
          <td>人生顶峰期</td>
          <td class="bazi-cell">TIMING_1</td>
          <td class="mbti-cell">TIMING_2</td>
          <td class="west-cell">TIMING_3</td>
          <td class="ziwei-cell">第N大限<br>AGE岁★</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## Ornament + Final Insight + Footer

```html
<div class="orn"><div class="orn-line"></div><div class="orn-dia">◆</div><div class="orn-line r"></div></div>

<div class="insight" style="margin-bottom:0">
  <div class="insight-label">四套系统·终极一句话</div>
  <div class="insight-text">
    POETIC_FOUR_LINE_SUMMARY — four parallel phrases (one per system), then:<br>
    四套系统，一个人：<strong>CORE_TRUTH_IN_ONE_PHRASE</strong><br><br>
    最大的命格礼物是<strong>GIFT_CONVERGENCE</strong>；<br>
    最需要守护的是<strong>WARNING_CONVERGENCE</strong>；<br>
    当下最重要的事是在<strong>CURRENT_DAXIAN_YEARS</strong>里CURRENT_MISSION，<br>
    等待<strong>PEAK_DAXIAN_AGE大限</strong>的到来。<br><br>
    <strong>CLOSING_SENTENCE</strong>
  </div>
</div>

<div class="footer">
  <div class="footer-name">CHINESE_NAME · ENGLISH_NAME</div>
  <div class="footer-quote">四套系统·八字 × MBTI × 西方星盘 × 紫微斗数<br>综合命理分析报告</div>
  <div class="footer-meta">CONFIDENTIAL · 2026 · 三才 SĀNCÁI</div>
</div>
```
