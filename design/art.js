// Story illustrations: small hand-drawn SVG scenes (viewBox 0 0 84 56) for the ten biggest
// stories, each specific to its event rather than a generic icon. Keyed by the story's `art`.
// window.art(key, height) -> SVG string, or '' when there is no drawing for that key.
window.ART = {
  // The World Court's pediment, and the 15 judges' votes: 9 for (dark), 6 against (light).
  icj: `<path d="M8 22 L42 6 L76 22 Z" fill="#1f6f8b"/><rect x="10" y="22" width="64" height="4" fill="#1f6f8b"/>
    <g fill="#1f6f8b">${[16, 28, 40, 52, 64].map((x) => `<rect x="${x - 2}" y="27" width="4" height="12"/>`).join('')}</g>
    <rect x="8" y="39" width="68" height="3" fill="#1f6f8b"/>
    <g>${Array.from({ length: 15 }, (_, i) => `<circle cx="${8 + i * 4.85}" cy="50" r="2.1" fill="${i < 9 ? '#15181d' : '#c9ccd1'}"/>`).join('')}</g>`,
  // The Kerch Bridge: arches over water, a burst on one span.
  kerch: `<rect x="0" y="44" width="84" height="12" fill="#bcd3ea"/><path d="M0 48 q6 -3 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#7fa3cf" stroke-width="1.5"/>
    <rect x="2" y="24" width="80" height="4" fill="#2a5aa0"/>
    <g fill="none" stroke="#2a5aa0" stroke-width="2.4">${[14, 34, 54, 74].map((x) => `<path d="M${x - 10} 44 Q${x} 26 ${x + 10} 44"/>`).join('')}</g>
    <polygon points="44,4 47,14 56,10 50,18 60,22 49,23 52,32 44,25 36,32 39,23 28,22 38,18 32,10 41,14" fill="#d6452a"/>`,
  // A falling market: red candles stepping down, an arrow.
  dow: `<path d="M4 4 V52 H82" fill="none" stroke="#6a3d8f" stroke-width="2"/>
    <g fill="#c0392b">${[[12, 10, 14], [22, 16, 12], [32, 20, 14], [42, 28, 10], [52, 30, 14], [62, 38, 10]].map(([x, y, h]) => `<rect x="${x}" y="${y}" width="6" height="${h}"/><rect x="${x + 2.5}" y="${y - 3}" width="1" height="${h + 6}"/>`).join('')}</g>
    <path d="M10 8 L70 46" stroke="#15181d" stroke-width="2.5"/><path d="M62 46 H72 V36" fill="none" stroke="#15181d" stroke-width="2.5"/>`,
  // The COP31 draft text, "fossil fuels" struck through.
  cop31: `<path d="M14 2 H58 L70 14 V54 H14 Z" fill="#fff" stroke="#2c7a46" stroke-width="2"/><path d="M58 2 V14 H70" fill="none" stroke="#2c7a46" stroke-width="2"/>
    <g stroke="#9aa3ad" stroke-width="2">${[10, 16, 40, 46].map((y) => `<path d="M20 ${y} H62"/>`).join('')}</g>
    <text x="42" y="31" text-anchor="middle" font-size="8.6" font-weight="800" fill="#15181d" font-family="Helvetica Neue, Arial" textLength="44" lengthAdjust="spacingAndGlyphs">FOSSIL FUELS</text>
    <path d="M17 28 H67" stroke="#d6452a" stroke-width="2.6"/>`,
  // A ticker board: ANT up 17%.
  ant: `<rect x="2" y="8" width="80" height="40" rx="4" fill="#15181d"/>
    <text x="10" y="26" font-size="14" font-weight="800" fill="#fff" font-family="Helvetica Neue, Arial">ANT</text>
    <text x="10" y="42" font-size="11" font-weight="700" fill="#cfd3d8" font-family="Helvetica Neue, Arial">$97.17</text>
    <polygon points="56,26 64,14 72,26" fill="#2ecc71"/><text x="64" y="42" text-anchor="middle" font-size="12" font-weight="800" fill="#2ecc71" font-family="Helvetica Neue, Arial">+17%</text>`,
  // The Capitol, and the vote: 51 against, 48 for.
  senate: `<path d="M30 22 Q42 4 54 22 Z" fill="#6a3d8f"/><rect x="40" y="2" width="4" height="6" fill="#6a3d8f"/><rect x="24" y="22" width="36" height="4" fill="#6a3d8f"/>
    <g fill="#6a3d8f">${[27, 33, 39, 45, 51, 57].map((x) => `<rect x="${x - 1.5}" y="26" width="3" height="10"/>`).join('')}</g><rect x="20" y="36" width="44" height="3" fill="#6a3d8f"/>
    <rect x="4" y="44" width="${(76 * 51) / 99}" height="9" fill="#15181d"/><rect x="${4 + (76 * 51) / 99}" y="44" width="${(76 * 48) / 99}" height="9" fill="#c9ccd1"/>`,
  // The Brandenburg Gate, Ukraine's flag beside it.
  berlin: `<rect x="10" y="12" width="52" height="7" fill="#2a5aa0"/><rect x="28" y="5" width="16" height="7" fill="#2a5aa0"/>
    <g fill="#2a5aa0">${[13, 22, 31, 41, 50, 58].map((x) => `<rect x="${x}" y="19" width="4" height="30"/>`).join('')}</g><rect x="8" y="49" width="56" height="4" fill="#2a5aa0"/>
    <rect x="68" y="10" width="2" height="42" fill="#555"/><rect x="70" y="10" width="13" height="5" fill="#0057b7"/><rect x="70" y="15" width="13" height="5" fill="#ffd700"/>`,
  // A tanker on fire, smoke rising.
  hormuz: `<rect x="0" y="46" width="84" height="10" fill="#bcd3ea"/>
    <path d="M6 36 H76 L70 48 H12 Z" fill="#b05a14"/><rect x="56" y="26" width="12" height="10" fill="#b05a14"/>
    <path d="M24 36 C20 26 28 24 26 16 C32 22 36 26 32 36 Z" fill="#e67e22"/><path d="M27 36 C26 30 30 28 29 24 C32 28 33 32 31 36 Z" fill="#f1c40f"/>
    <circle cx="30" cy="10" r="5" fill="#9aa3ad"/><circle cx="38" cy="6" r="4" fill="#b8bfc7"/>`,
  // A tall tower, a burst near its top.
  riyadh: `<path d="M34 54 V14 Q42 0 50 14 V54 Z" fill="#b05a14"/><path d="M38 18 Q42 10 46 18 Z" fill="#fff"/>
    <g fill="#e9d8c4">${[24, 30, 36, 42, 48].map((y) => `<rect x="38" y="${y}" width="8" height="2"/>`).join('')}</g>
    <polygon points="58,14 61,20 68,18 63,23 70,28 62,27 63,34 58,28 53,34 54,27 46,28 53,23 48,18 55,20" fill="#d6452a"/>
    <rect x="10" y="40" width="10" height="14" fill="#d9c3a8"/><rect x="66" y="44" width="12" height="10" fill="#d9c3a8"/>`,
  // A tank turning back, an arrow pointing home.
  gaza: `<rect x="0" y="48" width="84" height="8" fill="#e3d3b8"/>
    <rect x="14" y="34" width="44" height="12" rx="6" fill="#b05a14"/><rect x="22" y="26" width="22" height="9" rx="2" fill="#b05a14"/><rect x="44" y="28" width="22" height="3" fill="#b05a14"/>
    <g fill="#fff">${[20, 28, 36, 44, 52].map((x) => `<circle cx="${x}" cy="40" r="2"/>`).join('')}</g>
    <path d="M78 14 H54" stroke="#15181d" stroke-width="2.6"/><path d="M60 8 L53 14 L60 20" fill="none" stroke="#15181d" stroke-width="2.6"/>`,
};
window.art = (key, height) => (window.ART[key]
  ? `<svg height="${height}" width="${(height * 84) / 56}" viewBox="0 0 84 56" aria-hidden="true">${window.ART[key]}</svg>`
  : '');
