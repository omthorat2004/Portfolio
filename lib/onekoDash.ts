/**
 * Sends the existing oneko cat sprite running toward a point that moves
 * further left-to-right across the viewport with each successive click
 * (wrapping back to the left once it reaches the right edge).
 */
export function onekoDash(clickCount: number) {
  if (typeof document === "undefined") return;
  const margin = 40;
  const travel = Math.max(window.innerWidth - margin * 2, 1);
  const x = margin + ((clickCount * 140) % travel);
  const y = 140;
  document.dispatchEvent(new MouseEvent("mousemove", { clientX: x, clientY: y, bubbles: true }));
}
