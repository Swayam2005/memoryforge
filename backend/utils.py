from __future__ import annotations

from typing import Any, Dict, List


def summarize_memory(memory: Dict[str, Any]) -> str:
    content = memory.get("content", "")
    tags = memory.get("tags", [])
    if tags:
        return f"{content} [{', '.join(tags)}]"
    return content


def normalize_tags(tags: List[str]) -> List[str]:
    return sorted({tag.strip().lower() for tag in tags if tag and tag.strip()})
