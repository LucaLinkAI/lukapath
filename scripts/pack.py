#!/usr/bin/env python3
"""
Pack all skills in .claude/skills/ into:
  - dist/<name>.skill   — individual ZIP archives (one per skill)
  - dist/<plugin>/      — merged plugin directory for Cowork import

Usage:
    python scripts/pack.py
    python scripts/pack.py --plugin-name my-plugin --out ./out
"""

import argparse
import json
import shutil
import zipfile
from pathlib import Path

SKIP_DIRS  = {"__pycache__", "node_modules", "evals"}
SKIP_FILES = {".DS_Store", "Thumbs.db"}
SKIP_GLOBS = {"*.pyc", "*.pyo"}


def skip(path: Path) -> bool:
    if path.name in SKIP_FILES:
        return True
    if any(path.match(g) for g in SKIP_GLOBS):
        return True
    for part in path.parts:
        if part in SKIP_DIRS:
            return True
    return False


def find_skills(skills_dir: Path) -> list[Path]:
    return sorted(
        p for p in skills_dir.iterdir()
        if p.is_dir() and (p / "SKILL.md").exists()
    )


def make_skill_zip(skill_path: Path, out_dir: Path) -> Path:
    out_file = out_dir / f"{skill_path.name}.skill"
    with zipfile.ZipFile(out_file, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in skill_path.rglob("*"):
            if not f.is_file():
                continue
            arc = f.relative_to(skill_path.parent)
            if skip(arc):
                continue
            zf.write(f, arc)
    return out_file


def make_plugin_dir(skills: list[Path], plugin_name: str, out_dir: Path) -> Path:
    plugin_dir = out_dir / plugin_name
    if plugin_dir.exists():
        shutil.rmtree(plugin_dir)

    skills_out = plugin_dir / "skills"
    skills_out.mkdir(parents=True)

    skill_refs = []
    for skill in skills:
        shutil.copytree(
            skill,
            skills_out / skill.name,
            ignore=shutil.ignore_patterns(*SKIP_DIRS, *SKIP_FILES, "*.pyc"),
        )
        skill_refs.append(f"./skills/{skill.name}")

    meta_dir = plugin_dir / ".claude-plugin"
    meta_dir.mkdir()
    plugin_json = {
        "name": plugin_name,
        "version": "1.0.3",
        "description": (
            "路卡命运罗盘 — Chinese family destiny analysis: "
            "individual BaZi/MBTI/astrology reports, family compatibility, "
            "children AI-era talent planning, business partner chemistry."
        ),
        "author": {"name": "LucaPath"},
        "skills": skill_refs,
    }
    (meta_dir / "plugin.json").write_text(
        json.dumps(plugin_json, indent=2, ensure_ascii=False) + "\n"
    )
    return plugin_dir


def main():
    parser = argparse.ArgumentParser(description="Pack .claude/skills/ into .skill files + plugin dir")
    parser.add_argument("--skills-dir", default=".claude/skills", help="Source skills directory")
    parser.add_argument("--out",         default="dist",           help="Output directory")
    parser.add_argument("--plugin-name", default="lucapath-plugin",help="Plugin folder name")
    parser.add_argument("--no-zips",     action="store_true",       help="Skip .skill zip generation")
    parser.add_argument("--no-plugin",   action="store_true",       help="Skip plugin dir + .plugin archive generation")
    args = parser.parse_args()

    root        = Path(__file__).parent.parent
    skills_dir  = root / args.skills_dir
    out_dir     = root / args.out

    if not skills_dir.exists():
        print(f"Error: skills dir not found: {skills_dir}")
        raise SystemExit(1)

    skills = find_skills(skills_dir)
    if not skills:
        print(f"No skills found in {skills_dir}")
        raise SystemExit(1)

    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"Skills found: {[s.name for s in skills]}\n")

    if not args.no_zips:
        print("── .skill archives ──────────────────────")
        for skill in skills:
            out_file = make_skill_zip(skill, out_dir)
            kb = out_file.stat().st_size // 1024
            print(f"  {out_file.name:<40}  {kb} KB")

    if not args.no_plugin:
        print(f"\n── plugin dir: {args.plugin_name} ────────────────")
        plugin_dir = make_plugin_dir(skills, args.plugin_name, out_dir)
        for f in sorted(plugin_dir.rglob("*")):
            if f.is_file():
                print(f"  {f.relative_to(out_dir)}")

        print(f"\n── .plugin archive ──────────────────────")
        plugin_zip = out_dir / f"{args.plugin_name}.plugin"
        with zipfile.ZipFile(plugin_zip, "w", zipfile.ZIP_DEFLATED) as zf:
            for f in plugin_dir.rglob("*"):
                if not f.is_file():
                    continue
                arc = f.relative_to(out_dir)
                if skip(arc):
                    continue
                zf.write(f, arc)
        kb = plugin_zip.stat().st_size // 1024
        print(f"  {plugin_zip.name:<40}  {kb} KB")

    print(f"\nOutput → {out_dir}/")


if __name__ == "__main__":
    main()
