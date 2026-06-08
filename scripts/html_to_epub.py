#!/usr/bin/env python3
"""Convert bazi_orange_book.html → bazi_orange_book.epub using ebooklib."""

import re
from pathlib import Path
from ebooklib import epub

SRC = Path(__file__).parent.parent / "bazi_orange_book.html"
OUT = Path(__file__).parent.parent / "bazi_orange_book.epub"

raw = SRC.read_text(encoding="utf-8")

# ── Extract embedded CSS ──────────────────────────────────────────────────────
css_match = re.search(r"<style>(.*?)</style>", raw, re.DOTALL)
css_text = css_match.group(1) if css_match else ""

# Strip sidebar / nav / overlay / progress-bar / JS — epub doesn't need them.
# Keep only semantic section content.
STRIP_IDS = ["progress-bar", "overlay", "sidebar", "topbar"]
for sid in STRIP_IDS:
    css_text = re.sub(
        rf"#?{sid}\s*\{{[^}}]*\}}", "", css_text
    )

# Minimal resets for epub readers + keep color / typography vars
EPUB_CSS = """
@charset "UTF-8";
""" + css_text + """
/* epub overrides */
body { margin: 1.2em 1.4em; background: #faf8f5; }
#main { margin-left: 0; }
.chapter { max-width: 100%; padding: 2em 0; border-bottom: 1px solid #e7e5e4; }
#cover  { max-width: 100%; padding: 2em 0; }
"""

# ── Extract <section> blocks ──────────────────────────────────────────────────
sections = re.findall(
    r'<section\s+id="([^"]+)"[^>]*>(.*?)</section>',
    raw, re.DOTALL
)

TITLES = {
    "cover": "封面 · 总览与公式",
    "ch1":  "第一章 · 八字命理到底是什么？",
    "ch2":  "第二章 · 四柱、天干、地支",
    "ch3":  "第三章 · 日主——命盘里的「我」",
    "ch4":  "第四章 · 五行——能量的五种形态",
    "ch5":  "第五章 · 日主强弱",
    "ch6":  "第六章 · 十神——关系与角色",
    "ch7":  "第七章 · 格局——人生的主旋律",
    "ch8":  "第八章 · 神煞——特殊标签",
    "ch9":  "第九章 · 大运与流年",
    "ch10": "第十章 · 综合评分体系",
}

# ── Build epub ────────────────────────────────────────────────────────────────
book = epub.EpubBook()
book.set_identifier("bazi-orange-book-v1")
book.set_title("八字命理橙皮书 · 入门与速查")
book.set_language("zh-CN")
book.add_author("LucaPath 路卡成长罗盘")

style = epub.EpubItem(
    uid="style",
    file_name="style.css",
    media_type="text/css",
    content=EPUB_CSS.encode("utf-8"),
)
book.add_item(style)

chapters = []
for sec_id, body in sections:
    title = TITLES.get(sec_id, sec_id)
    html_content = f"""<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
<head>
  <meta charset="utf-8"/>
  <title>{title}</title>
  <link rel="stylesheet" href="style.css" type="text/css"/>
</head>
<body>
<div id="main">
{body}
</div>
</body>
</html>"""

    ch = epub.EpubHtml(
        title=title,
        file_name=f"{sec_id}.xhtml",
        lang="zh-CN",
        content=html_content.encode("utf-8"),
    )
    ch.add_item(style)
    book.add_item(ch)
    chapters.append(ch)

book.toc = tuple(epub.Link(c.file_name, c.title, c.id) for c in chapters)
book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())
book.spine = ["nav"] + chapters

epub.write_epub(str(OUT), book)
print(f"✓  Written: {OUT}  ({OUT.stat().st_size // 1024} KB)")
