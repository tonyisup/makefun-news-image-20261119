// Locator map for the layouts: land from design/world.js, one numbered dot per story.
// window.locatorMap(width, items, opts) -> SVG string. items: [{ n, ll: [lat, lon], color }].
// Dots that would overlap are nudged apart so every number stays readable.
window.locatorMap = (width, items, opts = {}) => {
  const [, , vw, vh] = window.WORLD_VIEWBOX.split(' ').map(Number);
  const lonMin = opts.lonMin ?? -130; // crop the empty Pacific edges
  const lonMax = opts.lonMax ?? 180;
  const x0 = lonMin + 180;
  const cw = lonMax - lonMin;
  const height = Math.round((width * vh) / cw);
  const k = width / cw;
  const r = opts.r ?? 7;
  const pts = items
    .filter((s) => s.ll)
    .map((s) => ({ ...s, x: (s.ll[1] + 180 - x0) * k, y: (75 - s.ll[0]) * k }));
  // Push overlapping dots apart a few times (simple relaxation).
  for (let it = 0; it < 40; it++) {
    for (let a = 0; a < pts.length; a++) {
      for (let b = a + 1; b < pts.length; b++) {
        const dx = pts[b].x - pts[a].x;
        const dy = pts[b].y - pts[a].y;
        const d = Math.hypot(dx, dy) || 0.01;
        const min = 2 * r + 1;
        if (d < min) {
          const push = (min - d) / 2;
          pts[a].x -= (dx / d) * push; pts[a].y -= (dy / d) * push;
          pts[b].x += (dx / d) * push; pts[b].y += (dy / d) * push;
        }
      }
    }
  }
  const dots = pts.map((p) =>
    `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="${p.color}" stroke="#fff" stroke-width="1.2"/>` +
    `<text x="${p.x.toFixed(1)}" y="${(p.y + r * 0.42).toFixed(1)}" text-anchor="middle" font-size="${r * 1.25}" font-weight="800" fill="#fff" font-family="Helvetica Neue, Arial, sans-serif">${p.n}</text>`).join('');
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">` +
    `<g transform="scale(${k}) translate(${-x0} 0)"><path d="${window.WORLD_PATH}" fill="${opts.land ?? '#d6d1c4'}"/></g>${dots}</svg>`;
};
