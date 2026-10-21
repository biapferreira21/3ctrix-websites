export function moveRankedItem(items: readonly string[], index: number, direction: -1 | 1): string[] {
  const next = [...items];
  const destination = index + direction;
  if (index < 0 || index >= items.length || destination < 0 || destination >= items.length) return next;
  [next[index], next[destination]] = [next[destination], next[index]];
  return next;
}

export function allocatePoint(points: readonly number[], index: number, direction: -1 | 1, budget = 10): number[] {
  const next = [...points];
  if (index < 0 || index >= next.length) return next;
  const total = points.reduce((sum, value) => sum + value, 0);
  if ((direction === 1 && total >= budget) || (direction === -1 && points[index] <= 0)) return next;
  next[index] += direction;
  return next;
}
