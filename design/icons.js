// Simple line icons (24x24, drawn with stroke = currentColor) for the story layouts.
// Hand-drawn for this entry: plain geometric shapes, no icon library.
window.ICONS = {
  scales: '<path d="M12 3v17M5 7h14M8 21h8"/><path d="M5 7l-3 7h6zM19 7l-3 7h6z"/>',
  bridge: '<path d="M1 11h8M15 11h8M4 11v9M20 11v9M1 21h22"/><path d="M12 2l1.5 3.5L17 4l-2 3.5 3 2-3.6.3L12 13l-2.4-3.2L6 9.5l3-2L7 4l3.5 1.5z" fill="currentColor" stroke="none"/>',
  down: '<path d="M2 3v18h20"/><path d="M5 7l5 5 4-3 7 8"/><path d="M15 17h6v-6"/>',
  up: '<path d="M2 3v18h20"/><path d="M5 17l5-5 4 3 7-8"/><path d="M15 7h6v6"/>',
  drop: '<circle cx="12" cy="12" r="10"/><path d="M12 5c-3 4.5-4 6.5-4 8.5a4 4 0 0 0 8 0c0-2-1-4-4-8.5z"/><path d="M4.5 19.5l15-15"/>',
  capitol: '<path d="M3 21h18M5 21v-8M9 21v-8M15 21v-8M19 21v-8M3 13h18"/><path d="M6 13a6 6 0 0 1 12 0M12 7V3"/>',
  columns: '<path d="M2 21h20M3 8h18M4 5h16M5 8v13M9.5 8v13M14.5 8v13M19 8v13"/>',
  ship: '<path d="M2 16l2 5h16l2-5z"/><path d="M6 16V9h9l3 7"/><path d="M12 9V5" /><path d="M19 3c1 2 3 2 3 4s-2 2-2 4" stroke-dasharray="2 2"/>',
  tower: '<path d="M9 22V8l3-6 3 6v14z"/><path d="M11 12h2M11 16h2"/><path d="M17 9l4-2M17 13h5M17 17l4 2"/>',
  tank: '<rect x="2" y="13" width="18" height="6" rx="3"/><path d="M6 13V9h9v4M15 10h7"/>',
  jet: '<path d="M2 12h20M14 12l-5-8H7l3 8-3 8h2z"/><path d="M4 12l-2-3M4 12l-2 3"/>',
  shield: '<path d="M12 2l9 3v6c0 6-4 9.5-9 11-5-1.5-9-5-9-11V5z"/><path d="M8 12l3 3 5-6"/>',
  flagx: '<path d="M4 22V3M4 4h13l-2 4 2 4H4"/><path d="M15 15l6 6M21 15l-6 6"/>',
  gavel: '<path d="M14 3l7 7M11 6l7 7M12.5 4.5l-5 5 7 7 5-5M9 11l-7 7 2 2 7-7M3 22h10"/>',
  cyclone: '<path d="M21 6c-3-3-9-4-13 0s-2 9 2 10 6-2 5-5-5-3-6 0"/><path d="M3 18c3 3 9 4 13 0"/>',
  lock: '<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v4"/>',
  handshake: '<path d="M2 10l4-4 4 2 4-2 4 0 4 4"/><path d="M6 6v8l5 5 2-2 2 2 4-4V8"/><path d="M11 11l2 2"/>',
  plane: '<path d="M2 14l20-6-2 4-7 3-2 6-2-1 1-5-6 1z"/>',
  megaphone: '<path d="M3 10v4h4l9 5V5l-9 5z"/><path d="M7 14l1 6h3l-1-5M19 9a4 4 0 0 1 0 6"/>',
  chart: '<path d="M3 3v18h18"/><rect x="6" y="12" width="3" height="6"/><rect x="11" y="9" width="3" height="9"/><rect x="16" y="5" width="3" height="13"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  helmet: '<path d="M3 15a9 9 0 0 1 18 0v2H3z"/><path d="M1 17h22M12 6v4"/>',
  bank: '<path d="M2 9l10-6 10 6zM4 9v9M9 9v9M15 9v9M20 9v9M2 21h20M3 18h18"/>',
  gem: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l3 18 3-18"/>',
  gamepad: '<path d="M7 8h10c3 0 5 4 5 8 0 3-3 4-5 1l-2-2H9l-2 2c-2 3-5 2-5-1 0-4 2-8 5-8z"/><path d="M7 11v4M5 13h4"/><circle cx="16" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="14" r="1" fill="currentColor"/>',
  runner: '<circle cx="15" cy="4" r="2"/><path d="M8 21l3-6 3 2v5M11 15l1-6 4 3h4M12 9l-4 1-2 3"/>',
  pencil: '<path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M13 7l4 4M4 20l5-1"/>',
  bird: '<path d="M3 13c3 0 5-2 7-5 1 3 3 5 6 5l5-3-2 5c-2 4-6 6-10 5-3-1-5-4-6-7z"/><circle cx="16.5" cy="10.5" r=".8" fill="currentColor"/><path d="M9 18l-1 4M13 18l1 4"/>',
  whale: '<path d="M2 13c0-4 5-6 10-6s8 2 9 5c1-2 2-3 2-3v6s-1-1-2-2c-1 3-5 5-10 5S2 17 2 13z"/><circle cx="7" cy="12" r="1" fill="currentColor"/><path d="M11 7c0-2 1-3 2-4"/>',
};

window.icon = (key, size, color) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${window.ICONS[key] || ''}</svg>`;
