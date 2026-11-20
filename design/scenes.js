// Drawn scenes for the round-5 candidates: flat SVG pictures of each event's action, drawn
// for this entry (ideas for some came from the prose briefs credited in README.md; no code or
// wording was taken from them). Every scene uses viewBox 0 0 200 120 and is returned as an
// SVG string by window.scene(key, width), sized to `width` px wide (height = width * 0.6).
// Editorial rules kept in the drawings: the Kerch Bridge is a muted inset with no blast (the
// strikes were 18 Nov); Hormuz shows burning tankers but no mines (the mines are Iran's navy's
// claim, said in the caption); nothing shows a time of day.
(() => {
  const C = { ink: '#1b1e24', paper: '#f7f3ea', sand: '#e6d3b3', sea: '#9cc3e0', sky: '#dbe8f3', red: '#c8372d', green: '#2e8b57', grey: '#9aa3ad' };
  // A seated or standing figure: head and shoulders. s = scale (1 is about 30 units tall).
  const person = (x, y, s, fill) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-22" r="6.5" fill="${fill}"/><path d="M-11 0 Q-11 -14 0 -14 Q11 -14 11 0 Z" fill="${fill}"/></g>`;
  const walker = (x, y, s, fill) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}"><circle cx="0" cy="-27" r="4.5"/><path d="M-4 -21 h8 l2 11 h-3 l-1 -6 -1 6 l3 10 h-3 l-3 -8 -3 8 h-3 l3 -10 -1 -6 -1 6 h-3 z"/></g>`;
  const usFlag = (x, y, w) => { const h = w * 0.62; let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`; for (let i = 0; i < 7; i++) s += `<rect x="${x}" y="${y + (i * 2 * h) / 13}" width="${w}" height="${h / 13}" fill="#b22234"/>`; return s + `<rect x="${x}" y="${y}" width="${w * 0.42}" height="${h * 0.54}" fill="#3c3b6e"/>`; };
  const cnFlag = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="${w * 0.66}" fill="#de2910"/><circle cx="${x + w * 0.2}" cy="${y + w * 0.17}" r="${w * 0.09}" fill="#ffde00"/>`;
  const ruFlag = (x, y, w) => { const h = w * 0.66; return `<rect x="${x}" y="${y}" width="${w}" height="${h / 3}" fill="#fff" stroke="#ccc" stroke-width=".4"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="#0039a6"/><rect x="${x}" y="${y + (2 * h) / 3}" width="${w}" height="${h / 3}" fill="#d52b1e"/>`; };
  const uaFlag = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="${w * 0.33}" fill="#0057b7"/><rect x="${x}" y="${y + w * 0.33}" width="${w}" height="${w * 0.33}" fill="#ffd700"/>`;
  const euFlag = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="${w * 0.66}" fill="#003399"/>` + Array.from({ length: 12 }, (_, i) => `<circle cx="${(x + w / 2 + Math.cos((i * Math.PI) / 6) * w * 0.22).toFixed(1)}" cy="${(y + w * 0.33 + Math.sin((i * Math.PI) / 6) * w * 0.22).toFixed(1)}" r="${w * 0.03}" fill="#ffcc00"/>`).join('');
  const uaeFlag = (x, y, w) => { const h = w * 0.5; return `<rect x="${x}" y="${y}" width="${w}" height="${h / 3}" fill="#00732f"/><rect x="${x}" y="${y + h / 3}" width="${w}" height="${h / 3}" fill="#fff" stroke="#ccc" stroke-width=".4"/><rect x="${x}" y="${y + (2 * h) / 3}" width="${w}" height="${h / 3}" fill="#111"/><rect x="${x}" y="${y}" width="${w * 0.25}" height="${h}" fill="#ff0000"/>`; };
  const txt = (x, y, size, fill, s, anchor = 'middle', weight = 800) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}" font-family="Helvetica Neue, Arial, sans-serif">${s}</text>`;

  const S = {
    // Lead: three leaders at one round table under their flags, Shenzhen's towers behind.
    summit: () => `<rect width="200" height="120" fill="#f4e4cf"/>
      <g fill="#d9c2a3">${[[6, 40, 14], [22, 28, 12], [36, 46, 16], [150, 30, 14], [166, 44, 12], [180, 22, 14]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${120 - y}"/>`).join('')}</g>
      <rect x="58" y="10" width="2" height="44" fill="#555"/>${usFlag(60, 11, 22)}
      <rect x="99" y="4" width="2" height="48" fill="#555"/>${cnFlag(101, 5, 22)}
      <rect x="140" y="10" width="2" height="44" fill="#555"/>${ruFlag(142, 11, 22)}
      ${person(62, 86, 1.25, '#2b3a55')}${person(100, 80, 1.25, '#5a2a2a')}${person(138, 86, 1.25, '#2f3b2f')}
      <ellipse cx="100" cy="96" rx="76" ry="16" fill="#8a5a36"/><ellipse cx="100" cy="93" rx="76" ry="14" fill="#a8744a"/>
      <rect x="0" y="108" width="200" height="12" fill="#e2cfb3"/>`,
    // The World Court: the Peace Palace tower, the bench of 15, the split verdict.
    icj: () => `<rect width="200" height="120" fill="${C.sky}"/>
      <rect x="20" y="30" width="110" height="46" fill="#a0442d"/><path d="M20 30 L75 14 L130 30 Z" fill="#7d3423"/>
      <rect x="132" y="8" width="16" height="68" fill="#a0442d"/><path d="M130 8 L140 -2 L150 8 Z" fill="#5a6b6b"/>
      <g fill="#f3d9b5">${[30, 48, 66, 84, 102, 118].map((x) => `<rect x="${x}" y="40" width="8" height="12"/>`).join('')}</g>
      <rect x="10" y="78" width="180" height="16" rx="3" fill="#5a3a22"/>
      ${Array.from({ length: 15 }, (_, i) => person(22 + i * 11.2, 78, 0.42, i < 9 ? C.ink : '#c3c8cf')).join('')}
      ${txt(100, 114, 20, C.ink, '9–6')}`,
    // Putin shuts the folder on truce talks; the chair across is empty; the bridge, muted, behind.
    truce: () => `<rect width="200" height="120" fill="#eef1f5"/>
      <g opacity=".45"><rect x="118" y="10" width="76" height="40" fill="#cfdcea"/><rect x="118" y="38" width="76" height="12" fill="#b8cde2"/><rect x="120" y="26" width="72" height="3" fill="#7c8a99"/>
        <g fill="none" stroke="#7c8a99" stroke-width="1.6">${[132, 152, 172].map((x) => `<path d="M${x - 9} 38 Q${x} 28 ${x + 9} 38"/>`).join('')}</g></g>
      ${txt(156, 60, 8, '#6b7682', 'KERCH BRIDGE', 'middle', 700)}
      ${person(44, 84, 1.35, '#2a2f3a')}
      <rect x="10" y="84" width="180" height="8" fill="#6b4a33"/><rect x="16" y="92" width="6" height="26" fill="#6b4a33"/><rect x="178" y="92" width="6" height="26" fill="#6b4a33"/>
      <rect x="58" y="76" width="34" height="8" fill="${C.red}"/>${txt(75, 82.5, 6, '#fff', 'TRUCE')}
      <path d="M152 84 V58 h18 V84 M152 66 h18" fill="none" stroke="#9aa3ad" stroke-width="3"/>${txt(161, 54, 6.5, '#6b7682', 'EMPTY', 'middle', 700)}`,
    // The New York Stock Exchange; one red stroke down its face.
    dow: () => `<rect width="200" height="120" fill="#eceef2"/>
      <path d="M30 34 L100 12 L170 34 Z" fill="#c9ced6"/><rect x="30" y="34" width="140" height="6" fill="#b3bac4"/>
      <g fill="#d8dde3">${[40, 62, 84, 106, 128, 150].map((x) => `<rect x="${x}" y="40" width="10" height="56"/>`).join('')}</g><rect x="24" y="96" width="152" height="8" fill="#b3bac4"/>
      <path d="M36 22 L80 52 L104 44 L164 98" fill="none" stroke="${C.red}" stroke-width="7" stroke-linejoin="round"/><path d="M150 98 h16 v-16" fill="none" stroke="${C.red}" stroke-width="7"/>
      <rect x="54" y="104" width="92" height="16" fill="${C.ink}"/>${txt(100, 117, 14, '#fff', 'DOW −1,101')}`,
    // The COP31 draft on the desk; the oil barrel and coal left outside the page.
    cop31: () => `<rect width="200" height="120" fill="#e9f1ea"/>
      <rect x="0" y="92" width="200" height="28" fill="#c7b08e"/>
      <path d="M40 8 H108 L124 24 V100 H40 Z" fill="#fff" stroke="${C.green}" stroke-width="2.5"/><path d="M108 8 V24 H124" fill="none" stroke="${C.green}" stroke-width="2.5"/>
      ${txt(82, 22, 9, C.green, 'COP31 DRAFT')}<g stroke="#b8c0c8" stroke-width="3">${[34, 44, 54, 64, 74, 84].map((y) => `<path d="M50 ${y} H114"/>`).join('')}</g>
      <rect x="140" y="56" width="30" height="40" rx="3" fill="#1d1d1d"/><rect x="140" y="64" width="30" height="3" fill="#555"/><rect x="140" y="84" width="30" height="3" fill="#555"/>${txt(155, 79, 7, '#fff', 'OIL')}
      <path d="M174 96 l6 -12 l10 2 l6 10 Z" fill="#2a2a2a"/>${txt(184, 112, 7, C.ink, 'COAL', 'middle', 700)}
      <path d="M132 100 L132 6" stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"/>`,
    // A green board: ANT, from $83 to $97.17.
    ant: () => `<rect width="200" height="120" fill="#12241b"/>
      ${txt(18, 30, 22, '#fff', 'ANT', 'start')}${txt(182, 30, 18, '#3ddc84', '+17%', 'end')}
      <path d="M18 98 L60 86 L84 92 L120 60 L150 66 L182 40" fill="none" stroke="#3ddc84" stroke-width="5" stroke-linejoin="round"/>
      ${txt(18, 114, 11, '#9fb3a8', '$83 offer', 'start', 700)}${txt(182, 114, 11, '#fff', '$97.17 close', 'end', 700)}`,
    // The Capitol and the Senate's 99 votes cast: 51 against, 48 for.
    senate: () => {
      let dots = ''; let k = 0;
      const rows = [[18, 40], [22, 52], [26, 64], [33, 76]];
      for (const [n, r] of rows) for (let i = 0; i < n; i++) { const a = Math.PI * (1 - i / (n - 1)); dots += `<circle cx="${(100 + Math.cos(a) * r).toFixed(1)}" cy="${(112 - Math.sin(a) * r).toFixed(1)}" r="3.1" fill="${k++ < 51 ? C.ink : '#c3c8cf'}"/>`; }
      return `<rect width="200" height="120" fill="#efeaf4"/>
        <path d="M78 40 Q100 4 122 40 Z" fill="#6a3d8f"/><rect x="98" y="0" width="4" height="10" fill="#6a3d8f"/><rect x="72" y="40" width="56" height="5" fill="#6a3d8f"/>
        ${dots}${txt(100, 104, 15, C.ink, '51–48')}`;
    },
    // The Brandenburg Gate with Ukraine's and the EU's flags.
    berlin: () => `<rect width="200" height="120" fill="#e8eef6"/>
      <rect x="40" y="26" width="120" height="14" fill="#5d6e85"/><rect x="82" y="12" width="36" height="14" fill="#5d6e85"/>
      <g fill="#6f8099">${[46, 66, 86, 106, 126, 146].map((x) => `<rect x="${x}" y="40" width="9" height="62"/>`).join('')}</g><rect x="34" y="102" width="132" height="8" fill="#5d6e85"/>
      <rect x="10" y="20" width="2" height="90" fill="#555"/>${uaFlag(12, 21, 28)}<rect x="188" y="20" width="2" height="90" fill="#555"/>${euFlag(160, 21, 28)}`,
    // Two burning supertankers between the headlands. No mines drawn: that is Iran's claim.
    hormuz: () => `<rect width="200" height="120" fill="${C.sky}"/><rect x="0" y="60" width="200" height="60" fill="${C.sea}"/>
      <path d="M0 60 L0 18 Q30 10 54 40 L64 60 Z" fill="${C.sand}"/><path d="M200 60 L200 30 Q168 22 150 46 L142 60 Z" fill="${C.sand}"/>
      ${[[40, 86], [112, 100]].map(([x, y]) => `<path d="M${x} ${y} h56 l-6 10 h-46 z" fill="#3a2f2a"/><rect x="${x + 40}" y="${y - 9}" width="10" height="9" fill="#3a2f2a"/>
        <path d="M${x + 18} ${y} c-4 -10 4 -12 2 -20 c6 6 9 11 5 20 z" fill="#e67e22"/><circle cx="${x + 20}" cy="${y - 28}" r="7" fill="#8a929b"/><circle cx="${x + 28}" cy="${y - 36}" r="6" fill="#a7aeb6"/>`).join('')}`,
    // Riyadh's skyline; damage near the top of its tallest tower.
    riyadh: () => `<rect width="200" height="120" fill="#f6e9d8"/>
      <g fill="#d6bfa1">${[[10, 70, 22], [36, 82, 18], [140, 64, 20], [164, 78, 26]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${120 - y}"/>`).join('')}</g>
      <path d="M86 120 V24 L100 6 L114 24 V120 Z" fill="#8c5a2b"/><g fill="#e8d2b4">${[40, 52, 64, 76, 88, 100].map((y) => `<rect x="94" y="${y}" width="12" height="3"/>`).join('')}</g>
      <path d="M108 26 l12 -6 l-4 10 l12 2 l-12 6 z" fill="${C.red}"/><circle cx="126" cy="14" r="6" fill="#9aa3ad"/><circle cx="136" cy="8" r="5" fill="#b8bfc7"/>`,
    // Families walk home into Nuseirat; the tank is small and going away.
    gaza: () => `<rect width="200" height="120" fill="#f3ead9"/><rect x="0" y="84" width="200" height="36" fill="${C.sand}"/>
      <g fill="#cdb99a">${[[120, 52, 26, 'M120 52 h8 v-6 h6 v6 h12 v32 h-26 z'], [152, 60, 30, 'M152 60 l8 -8 l6 6 h16 v26 h-30 z']].map((d) => `<path d="${d[3]}"/>`).join('')}<rect x="180" y="46" width="16" height="38"/></g>
      <g transform="translate(18 70) scale(.55)"><rect x="0" y="10" width="44" height="12" rx="6" fill="#7b6a52"/><rect x="8" y="2" width="22" height="9" fill="#7b6a52"/><rect x="-18" y="5" width="26" height="3" fill="#7b6a52"/></g>
      <path d="M60 74 h-24" stroke="#7b6a52" stroke-width="2"/><path d="M40 70 l-5 4 l5 4" fill="none" stroke="#7b6a52" stroke-width="2"/>
      ${walker(84, 110, 1.15, C.ink)}${walker(98, 110, 0.85, '#4a4f57')}${walker(110, 110, 1.1, C.ink)}${walker(122, 110, 0.7, '#4a4f57')}
      <path d="M70 116 H150" stroke="#b49d7b" stroke-width="2" stroke-dasharray="5 4"/>`,
    // Somalia shows the UAE's envoy the gate: 72 hours.
    somalia: () => `<rect width="200" height="120" fill="#eaf2ec"/><rect x="0" y="100" width="200" height="20" fill="#cfc4ad"/>
      <rect x="40" y="40" width="10" height="60" fill="#8c8c8c"/><rect x="110" y="40" width="10" height="60" fill="#8c8c8c"/><path d="M50 50 h60 M50 70 h60 M50 90 h60" stroke="#8c8c8c" stroke-width="3"/>
      <rect x="62" y="12" width="2" height="38" fill="#555"/>${uaeFlag(64, 13, 30)}
      <path d="M130 70 H186" stroke="${C.ink}" stroke-width="5"/><path d="M176 60 L190 70 L176 80" fill="none" stroke="${C.ink}" stroke-width="5"/>${txt(158, 56, 14, '#2c7a46', '72 HOURS')}`,
    // Cyclone Akvan's bands curl toward the Odisha coast; people move inland.
    cyclone: () => `<rect width="200" height="120" fill="${C.sea}"/>
      <path d="M200 0 V120 H120 Q130 80 112 50 Q124 20 108 0 Z" fill="#a9c99a"/>
      <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M60 60 m-26 0 a26 26 0 1 1 26 26"/><path d="M60 60 m-14 0 a14 14 0 1 1 14 14"/></g><circle cx="60" cy="60" r="4" fill="#fff"/>
      <path d="M150 64 H186" stroke="${C.ink}" stroke-width="3"/><path d="M180 58 L188 64 L180 70" fill="none" stroke="${C.ink}" stroke-width="3"/>
      ${walker(146, 100, 0.8, C.ink)}${walker(160, 100, 0.7, C.ink)}${walker(172, 100, 0.8, C.ink)}`,
    // The game on the shelf: a case with a sunset, palms and "VI".
    gta: () => `<rect width="200" height="120" fill="#2a1f3d"/>
      <rect x="62" y="6" width="76" height="108" rx="4" fill="#111"/><rect x="66" y="10" width="68" height="100" fill="#f08a4b"/>
      <rect x="66" y="10" width="68" height="44" fill="#d9467a"/><circle cx="100" cy="64" r="18" fill="#ffd166"/><rect x="66" y="72" width="68" height="38" fill="#3b1f4a"/>
      <g fill="#111"><rect x="76" y="56" width="3" height="40"/><path d="M77 56 q-10 2 -14 8 q8 -4 14 -4 q6 0 14 4 q-4 -6 -14 -8z"/><rect x="120" y="62" width="3" height="34"/><path d="M121 62 q-9 2 -12 7 q7 -3 12 -3 q5 0 12 3 q-3 -5 -12 -7z"/></g>
      ${txt(100, 104, 26, '#fff', 'VI')}`,
    // Colombia's national strike: marchers behind a banner.
    colombia: () => `<rect width="200" height="120" fill="#f1ecf6"/><rect x="0" y="96" width="200" height="24" fill="#cfc6d8"/>
      <g fill="#b9adc8">${[[6, 40, 30], [40, 52, 24], [150, 36, 22], [176, 50, 24]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${96 - y}"/>`).join('')}</g>
      <rect x="40" y="46" width="2" height="34" fill="#555"/><rect x="158" y="46" width="2" height="34" fill="#555"/>
      <rect x="40" y="46" width="120" height="22" fill="#fcd116"/><rect x="40" y="62" width="120" height="3" fill="#003893"/><rect x="40" y="65" width="120" height="3" fill="#ce1126"/>${txt(100, 61, 12, C.ink, 'PARO NACIONAL')}
      ${[30, 48, 64, 82, 100, 118, 136, 154, 170].map((x, i) => walker(x, 108, i % 2 ? 0.95 : 1.1, i % 3 ? '#3d2f52' : C.ink)).join('')}`,
    // Kenya's Mrima Hill in cutaway, the award document: a US-led group.
    kenya: () => `<rect width="200" height="120" fill="#eaf3ea"/>
      <path d="M0 96 Q60 20 120 50 Q160 70 200 60 V120 H0 Z" fill="#7aa874"/><path d="M0 104 Q60 60 120 78 Q160 90 200 84 V120 H0 Z" fill="#a27b56"/>
      <g fill="#c9a227">${[[40, 96], [62, 90], [84, 100], [106, 94], [128, 102]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
      <rect x="130" y="8" width="58" height="62" fill="#fff" stroke="#2c7a46" stroke-width="2"/>${txt(159, 22, 6.5, '#2c7a46', 'MRIMA HILL')}
      <g stroke="#b8c0c8" stroke-width="2">${[30, 38].map((y) => `<path d="M136 ${y} H182"/>`).join('')}</g>
      <rect x="133" y="46" width="52" height="16" fill="none" stroke="#c8372d" stroke-width="2" transform="rotate(-8 159 54)"/>${txt(159, 56.5, 5.8, '#c8372d', 'US-LED GROUP')}`,
  };
  window.SCENES = S;
  // The lead drawn wide (viewBox 0 0 300 100) for blocks much wider than they are tall:
  // the same three leaders, flags and table, spread across a longer skyline.
  window.summitWide = (width) => `<svg width="${width}" height="${Math.round(width / 3)}" viewBox="0 0 300 100" aria-hidden="true">
    <rect width="300" height="100" fill="#f4e4cf"/>
    <g fill="#d9c2a3">${[[4, 38, 16], [24, 24, 14], [42, 46, 18], [64, 34, 12], [226, 30, 16], [246, 44, 14], [264, 18, 16], [284, 36, 14]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${100 - y}"/>`).join('')}</g>
    <rect x="104" y="6" width="2" height="40" fill="#555"/>${usFlag(106, 7, 22)}
    <rect x="149" y="2" width="2" height="44" fill="#555"/>${cnFlag(151, 3, 22)}
    <rect x="194" y="6" width="2" height="40" fill="#555"/>${ruFlag(196, 7, 22)}
    ${person(108, 76, 1.15, '#2b3a55')}${person(150, 72, 1.15, '#5a2a2a')}${person(192, 76, 1.15, '#2f3b2f')}
    <ellipse cx="150" cy="86" rx="98" ry="11" fill="#8a5a36"/><ellipse cx="150" cy="83.5" rx="98" ry="9.5" fill="#a8744a"/>
    <rect x="0" y="94" width="300" height="6" fill="#e2cfb3"/></svg>`;
  // scene(key, width[, height[, fit]]): with a height, the drawing fills that box exactly,
  // cropped from the bottom if the box is wider than 5:3 (preserveAspectRatio xMidYMin slice);
  // fit 'meet' shows the whole drawing instead, centred, for boxes narrower than 5:3.
  window.scene = (key, width, height, fit) => (S[key]
    ? `<svg width="${width}" height="${height ?? Math.round(width * 0.6)}" viewBox="0 0 200 120"${height ? ` preserveAspectRatio="${fit === 'meet' ? 'xMidYMid meet' : 'xMidYMin slice'}"` : ''} aria-hidden="true">${S[key]()}</svg>`
    : '');
})();
