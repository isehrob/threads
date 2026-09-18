#!/usr/bin/env python3
"""Sync ~/threads/skills to the global Claude and Codex skill directories."""

from pathlib import Path


def sync_skills():
    canonical = Path.home() / "threads/skills"
    targets = [Path.home() / ".claude/skills", Path.home() / ".codex/skills"]

    for target in targets:
        target.mkdir(parents=True, exist_ok=True)

    skills = sorted(path for path in canonical.glob("*") if path.is_dir())
    if not skills:
        print(f"No skills found in {canonical}")
        return

    for target in targets:
        for skill in skills:
            link = target / skill.name
            if link.is_symlink():
                if link.readlink() == skill:
                    print(f"EXISTS: {link} -> {skill}")
                    continue
                link.unlink()
            elif link.exists():
                print(f"SKIP: {link} exists and is not a symlink")
                continue
            link.symlink_to(skill)
            print(f"ADDED: {link} -> {skill}")


if __name__ == "__main__":
    sync_skills()
