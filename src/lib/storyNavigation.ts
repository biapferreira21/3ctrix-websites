export function moveStoryIndex(current: number, direction: number, count: number) {
  if (!Number.isInteger(count) || count < 1) return 0;
  const safeCurrent = Number.isInteger(current) ? Math.max(0, Math.min(count - 1, current)) : 0;
  if (!Number.isInteger(direction)) return safeCurrent;
  return Math.max(0, Math.min(count - 1, safeCurrent + direction));
}

export function storyIndexFromKey(key: string, current: number, count: number) {
  if (key === "ArrowLeft") return moveStoryIndex(current, -1, count);
  if (key === "ArrowRight") return moveStoryIndex(current, 1, count);
  if (key === "Home") return 0;
  if (key === "End") return Math.max(0, count - 1);
  return null;
}

export function storyGroupStarts(moments: readonly { group?: string }[]) {
  const seen = new Set<string>();
  return moments.flatMap((moment, index) => {
    if (!moment.group || seen.has(moment.group)) return [];
    seen.add(moment.group);
    return [{ label: moment.group, index }];
  });
}
