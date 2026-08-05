#!/usr/bin/env bash
#
# Sync skill symlinks from the canonical source to global agent directories.
#
# Canonical: ~/threads/.agents/skills/<name>/SKILL.md
# Targets:   ~/.claude/skills/<name>
#            ~/.codex/skills/<name>
#
# Run this after adding/removing a skill.

set -euo pipefail

CANONICAL="$HOME/threads/.agents/skills"

TARGETS=(
  "$HOME/.claude/skills"
  "$HOME/.codex/skills"
)

for dir in "${TARGETS[@]}"; do
  mkdir -p "$dir"
done

# Collect canonical skill names
skills=()
for skill_dir in "$CANONICAL"/*/; do
  [ -d "$skill_dir" ] || continue
  skills+=("$(basename "$skill_dir")")
done

if [ ${#skills[@]} -eq 0 ]; then
  echo "No skills found in $CANONICAL"
  exit 0
fi

# Sync symlinks (absolute paths)
for target in "${TARGETS[@]}"; do
  for skill in "${skills[@]}"; do
    link="$target/$skill"
    abs="$CANONICAL/$skill"
    if [ -L "$link" ]; then
      current=$(readlink "$link")
      if [ "$current" = "$abs" ]; then
        continue
      fi
      rm "$link"
    elif [ -e "$link" ]; then
      echo "SKIP: $link exists and is not a symlink"
      continue
    fi
    ln -s "$abs" "$link"
    echo "  + $link -> $abs"
  done
done

# Report stale symlinks
for target in "${TARGETS[@]}"; do
  for link in "$target"/*/; do
    [ -L "${link%/}" ] || continue
    if [ ! -e "${link%/}" ]; then
      echo "  STALE: ${link%/} (target missing)"
    fi
  done
done

echo ""
echo "Skills synced: ${skills[*]}"
