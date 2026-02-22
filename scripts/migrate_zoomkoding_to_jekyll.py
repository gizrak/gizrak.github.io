#!/usr/bin/env python3
"""
Migrate zoomkoding-gatsby-blog content + assets to gizrak.github.io _posts (Jekyll format).
"""
import re
import shutil
from pathlib import Path

ZOOM_CONTENT = Path("/home/user/zoomkoding-gatsby-blog/content")
ZOOM_ASSETS = Path("/home/user/zoomkoding-gatsby-blog/assets")
GIZRAK_ROOT = Path("/home/user/gizrak.github.io")
GIZRAK_POSTS = GIZRAK_ROOT / "_posts"
GIZRAK_IMAGES = GIZRAK_ROOT / "assets" / "images" / "posts"


def extract_frontmatter_and_body(text: str) -> tuple[dict, str]:
    if not text.startswith("---"):
        return {}, text
    end = text.index("---", 3)
    fm_raw = text[3:end].strip()
    body = text[end + 3:].lstrip("\n")
    # Parse simple key: value (categories can be single string)
    frontmatter = {}
    for line in fm_raw.split("\n"):
        if ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip()
        value = value.strip().strip("'\"")
        if key == "category" or key == "categories":
            frontmatter["category"] = [v.strip() for v in value.split(",") if v.strip()]
            if not frontmatter["category"]:
                frontmatter["category"] = [value] if value else ["블로그"]
        else:
            frontmatter[key] = value
    if "category" in frontmatter and isinstance(frontmatter["category"], str):
        frontmatter["category"] = [frontmatter["category"]]
    return frontmatter, body


def jekyll_frontmatter(title: str, category: list) -> str:
    lines = ["---", f"title: {title}", "category:"]
    for c in category:
        lines.append(f"  - {c}")
    lines.append("---")
    return "\n".join(lines) + "\n\n"


def collect_md_files(content_root: Path) -> list[tuple[Path, str, str]]:
    """Returns list of (md_path, date_YYYY_MM_DD, slug_for_filename)."""
    out = []
    for path in content_root.rglob("*.md"):
        rel = path.relative_to(content_root)
        parts = rel.parts
        if len(parts) < 2:
            continue
        year = parts[0]
        if path.name == "index.md":
            # folder name is e.g. 2022-03-08-Jekyll에서-Gatsby-블로그로-변경
            slug = parts[1]
            dir_path = path.parent
        else:
            # 2021-07-18-파이썬을-여행하는-히치하이커를-위한-안내서.md
            slug = path.stem
            dir_path = path.parent
        if not re.match(r"\d{4}-\d{2}-\d{2}-", slug):
            continue
        date_prefix = slug[:10]  # YYYY-MM-DD
        out.append((path, date_prefix, slug, dir_path))
    return out


def main():
    # Collect all posts
    items = []
    for path in ZOOM_CONTENT.rglob("*.md"):
        rel = path.relative_to(ZOOM_CONTENT)
        parts = rel.parts
        if len(parts) < 2:
            continue
        year = parts[0]
        if path.name == "index.md":
            slug = parts[1]
            dir_path = path.parent
        else:
            slug = path.stem
            dir_path = path.parent
        if not re.match(r"\d{4}-\d{2}-\d{2}-", slug):
            continue
        date_prefix = slug[:10]
        items.append((path, date_prefix, slug, dir_path))

    for path, date_prefix, slug, dir_path in items:
        text = path.read_text(encoding="utf-8")
        fm, body = extract_frontmatter_and_body(text)
        title = fm.get("title", slug)
        category = fm.get("category", ["블로그"])
        if isinstance(category, str):
            category = [category]

        # Map image refs: same-dir images -> copy to assets and use /assets/images/posts/YYYY/MM/...
        # attach_01.png or 49558-2023-6-2-14-59.png
        yyyy, mm, _ = date_prefix.split("-")
        image_prefix = f"{date_prefix.replace('-', '')}_{slug[:30].replace(' ', '_')}"
        seen = {}

        def replace_image(match):
            alt = match.group(1) or ""
            src = (match.group(2) or "").strip()
            if not src or src.startswith("http://") or src.startswith("https://"):
                return match.group(0)
            # local file
            local_path = dir_path / src
            if not local_path.exists():
                return match.group(0)
            # copy to gizrak assets
            ext = local_path.suffix
            if src not in seen:
                idx = len(seen) + 1
                new_name = f"{image_prefix}_{idx}{ext}"
                seen[src] = new_name
                dest_dir = GIZRAK_IMAGES / yyyy / mm
                dest_dir.mkdir(parents=True, exist_ok=True)
                shutil.copy2(local_path, dest_dir / new_name)
            new_name = seen[src]
            url = f"/assets/images/posts/{yyyy}/{mm}/{new_name}"
            if alt:
                return f"![{alt}]({url})"
            return f"![]({url})"

        body = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replace_image, body)

        out_fm = jekyll_frontmatter(title, category)
        out_body = body
        out_dir = GIZRAK_POSTS / yyyy
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{slug}.md"
        out_file.write_text(out_fm + out_body, encoding="utf-8")
        print(f"Wrote {out_file}")


if __name__ == "__main__":
    main()
