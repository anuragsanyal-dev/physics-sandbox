export interface Viewport { width: number; height: number; maxX: number; maxY: number; padding: number }
export function worldToCanvas(x: number, y: number, v: Viewport): { x: number; y: number } {
  const usableWidth = v.width - 2 * v.padding, usableHeight = v.height - 2 * v.padding;
  const scale = Math.min(usableWidth / Math.max(v.maxX, 1), usableHeight / Math.max(v.maxY, 1));
  return { x: v.padding + x * scale, y: v.height - v.padding - y * scale };
}
