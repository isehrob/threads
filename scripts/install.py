#!/usr/bin/env python3
"""Set up topics storage and sync skills."""

from pathlib import Path

from sync_skills import sync_skills

repo = Path(__file__).resolve().parent.parent
parent = Path(input("Absolute path of the folder to create topics in: ")).expanduser().resolve()
topics = parent / "topics"
topics.mkdir(parents=True, exist_ok=True)

link = repo / "topics"
if link.is_symlink():
    link.unlink()
link.symlink_to(topics)
print(f"Topics: {link} -> {topics}", flush=True)

sync_skills()
