// The day's stories: one source of truth for every layout in design/.
// Every item happened, or was first reported, on Thursday 19 November 2026, and was checked
// against at least two outlets (listed in `src`; SOURCES.md has the full trail).
// `rank` orders by consequence (1 = lead). `core` marks the ten stories of the first entry.
// `ll` is [lat, lon] for the locator map (none for a story with no one place).
// `art` names the story's drawing in design/art.js. `extra` marks the four stories added in
// round 3 (layouts of 30 leave them out).
// `fig`, where set, is the story's key figure, which a layout may show as its picture.
// region: eu (Europe), me (Middle East), as (Asia-Pacific), af (Africa), am (Americas), gl (global)
window.DAY = 'Thursday 19 November 2026';

window.LEAD = {
  region: 'as', place: 'Shenzhen, China · APEC',
  head: 'Trump, Xi and Putin hold their first three-way summit',
  detail: 'A symbolic “peace declaration”: nuclear war must never be fought. No arms-control talks announced; the wars in Ukraine and Iran go unmentioned. Xi tells the US to do “the right thing” on Taiwan.',
  src: ['Reuters', 'AP', 'The Guardian'],
};

window.STORIES = [
  { rank: 2, art: 'icj', ll: [52.1, 4.3], core: true, region: 'gl', icon: 'scales', place: 'The Hague', head: 'World Court rules Myanmar committed genocide against Rohingya', short: 'ICJ: Myanmar committed genocide', detail: '9–6 World Court ruling, its first; The Gambia’s case', src: ['Reuters', 'BBC', 'UN News'] },
  { rank: 3, art: 'kerch', ll: [45.3, 36.5], core: true, region: 'eu', icon: 'bridge', place: 'Russia · Ukraine', head: 'Putin rules out truce talks after Kerch Bridge strikes', short: 'Putin rules out truce after bridge strikes', detail: 'Vows a “painful” response to this week’s Ukrainian attacks', src: ['Reuters', 'Boston Globe', 'RTÉ', 'AAP'] },
  { rank: 4, art: 'dow', ll: [40.7, -74.0], core: false, region: 'am', icon: 'down', fig: '−1,101', place: 'New York', head: 'Wall Street slides: Dow falls 1,101 points', short: 'Dow drops 1,101 points', detail: 'S&P 500 −2%, a sixth straight loss, longest since 2024', src: ['AP', 'Washington Post', 'Yahoo Finance'] },
  { rank: 5, art: 'cop31', ll: [36.9, 30.7], core: true, region: 'gl', icon: 'drop', place: 'Antalya, Türkiye · COP31', head: 'COP31 draft deal drops all mention of fossil fuels', short: 'COP31 draft drops fossil fuels', detail: 'Climate talks near their Friday deadline', src: ['Reuters', 'The Guardian', 'DW'] },
  { rank: 6, art: 'ant', ll: [42.5, -71], core: true, region: 'am', icon: 'up', fig: '+17%', place: 'Nasdaq', head: 'Anthropic shares jump 17% in record IPO', short: 'Anthropic up 17% in IPO', detail: 'Priced at $83, closed at $97.17 (ticker ANT)', src: ['Nikkei', 'CNN', 'TechCrunch'] },
  { rank: 7, art: 'senate', ll: [38.9, -77.0], core: false, region: 'am', icon: 'capitol', fig: '51–48', place: 'Washington', head: 'US Senate rejects curbs on Trump’s Iran war, 51–48', short: 'Senate rejects Iran war-powers curb', detail: 'War-powers resolution fails; three Republicans break ranks', src: ['Washington Post', 'USA Today', 'The Guardian'] },
  { rank: 8, art: 'berlin', ll: [52.5, 13.4], core: true, region: 'eu', icon: 'columns', place: 'Berlin', head: 'Ukraine’s allies meet Zelensky in Berlin', short: 'Allies meet Zelensky in Berlin', detail: 'US envoy Kushner: Russia “comfortable” with NATO-like guarantees', src: ['AP', 'DW', 'The Guardian'] },
  { rank: 9, art: 'hormuz', ll: [26.6, 56.3], core: false, region: 'me', icon: 'ship', place: 'Strait of Hormuz', head: 'Two oil supertankers hit mines and catch fire near Hormuz', short: 'Tankers hit mines near Hormuz', detail: 'Iran’s navy reports the blasts; UKMTO logs a tanker strike off Oman', src: ['Anadolu', 'Al Jazeera', 'A News'] },
  { rank: 10, art: 'riyadh', ll: [24.7, 46.7], core: true, region: 'me', icon: 'tower', place: 'Riyadh', head: 'Houthi strike damages Riyadh’s tallest tower', short: 'Houthi strike hits Riyadh tower', detail: 'Saudi wealth fund (PIF) building; no injuries reported', src: ['Reuters', 'Al Jazeera', 'Washington Post'] },
  { rank: 11, art: 'gaza', ll: [31.4, 34.4], core: true, region: 'me', icon: 'tank', place: 'Gaza', head: 'Israel ends tank raid in central Gaza', short: 'Israel ends Gaza tank raid', detail: 'Deepest push past the truce line since 2025; families return to Nuseirat', src: ['Reuters', 'The Hindu', 'Ahram'] },
  { rank: 12, ll: [33.8, 35.9], core: false, region: 'me', icon: 'jet', place: 'Lebanon', head: 'Israel strikes Hezbollah site deep in Bekaa Valley', short: 'Israel strikes Hezbollah in Bekaa', detail: 'Its first strike that far into Lebanon in months', src: ['Haaretz', 'Jerusalem Post', 'Anadolu'] },
  { rank: 13, ll: [16.9, 43.8], core: false, region: 'me', icon: 'jet', place: 'Yemen', head: 'Saudi-led coalition destroys Houthi missile launchers', short: 'Coalition hits Houthi launchers', detail: 'Says it downed five ballistic missiles and a cruise missile', src: ['SPA', 'Al Arabiya', 'Anadolu'] },
  { rank: 14, ll: [55.7, 12.6], core: true, region: 'eu', icon: 'shield', fig: '109–0', place: 'Copenhagen', head: 'Danish MPs ratify Greenland security pact with US', short: 'Denmark ratifies Greenland pact', detail: 'Unanimous vote, 109–0', src: ['The Guardian', 'AP', 'Reuters'] },
  { rank: 15, ll: [2.0, 45.3], core: false, region: 'af', icon: 'flagx', place: 'Mogadishu', head: 'Somalia expels UAE ambassador, citing “invasion”', short: 'Somalia expels UAE envoy', detail: 'Envoy given 72 hours; Somalia recalls its own', src: ['Reuters', 'Al Jazeera', 'Africanews'] },
  { rank: 16, ll: [37.6, 127.0], core: false, region: 'as', icon: 'gavel', place: 'Seoul', head: 'Korean top court orders retrial of ex-PM Han', short: 'Korea: ex-PM Han retrial', detail: 'Over martial law; ex-first lady Kim’s 4-year term upheld', src: ['Yonhap', 'DW', 'Al Jazeera'] },
  { rank: 17, ll: [19.3, 84.8], core: false, region: 'as', icon: 'cyclone', place: 'Odisha, India', head: 'Cyclone Akvan: Odisha evacuates tens of thousands', short: 'Cyclone Akvan nears India', detail: 'Landfall expected near Gopalpur', src: ['The Hindu', 'Times of India', 'IMD'] },
  { rank: 18, ll: [50.8, 4.4], core: false, region: 'eu', icon: 'lock', place: 'Brussels', head: 'EU Commission hit by AI-driven cyberattack', short: 'EU hit by AI cyberattack', detail: 'Staff HR systems targeted; data loss still unknown', src: ['DW', 'Euronews'] },
  { rank: 19, ll: [25.5, 117], core: false, region: 'as', icon: 'handshake', place: 'Shenzhen', head: 'Japan’s Takaichi leaves China without Xi talks', short: 'Takaichi leaves without Xi talks', detail: 'Tokyo–Beijing strain persists', src: ['Kyodo', 'Mainichi', 'Anadolu'] },
  { rank: 20, ll: [3.1, 101.7], core: false, region: 'as', icon: 'plane', fig: '$17bn', place: 'Kuala Lumpur', head: 'Trump unveils $17bn of Southeast Asia deals', short: 'Trump: $17bn Asia deals', detail: 'Includes 20 Boeing 787s for Philippine Airlines', src: ['Reuters', 'CNA', 'Business Times'] },
  { rank: 21, ll: [4.7, -74.1], core: false, region: 'am', icon: 'megaphone', place: 'Colombia', head: 'National strike against Colombia’s tax rescue law', short: 'Colombia national strike', detail: 'Marches in Bogotá and other cities', src: ['Caracol', 'Colombia.com', 'Alerta'] },
  { rank: 22, ll: [-35.3, 149.1], core: false, region: 'as', icon: 'chart', fig: '4.9%', place: 'Australia', head: 'Australian unemployment jumps to 4.9%', short: 'Australia jobless 4.9%', detail: 'Highest in five years', src: ['ABS', 'ABC', 'The Guardian'] },
  { rank: 23, ll: [36.0, 128.5], core: false, region: 'as', icon: 'box', fig: '$1tn', place: 'South Korea', head: 'South Korea’s yearly exports top $1 trillion', short: 'Korea exports top $1tn', detail: 'A first for the country', src: ['News1', 'Seoul Economic Daily'] },
  { rank: 24, ll: [48.9, 2.35], core: false, region: 'eu', icon: 'helmet', place: 'Paris', head: 'France confirms troops in Ukraine train and repair', short: 'France confirms troops in Ukraine', detail: 'Foreign minister: “nothing was hidden”', src: ['RTL', 'Anadolu', 'BFMTV'] },
  { rank: 25, ll: [-25.7, 28.2], core: false, region: 'af', icon: 'bank', fig: '7.25%', place: 'Pretoria', head: 'South Africa’s central bank holds rate at 7.25%', short: 'SA holds rate at 7.25%', detail: 'Split vote over a possible hike', src: ['BusinessDay', 'Mail & Guardian', 'SAnews'] },
  { rank: 26, ll: [-4.5, 39.3], core: false, region: 'af', icon: 'gem', place: 'Kenya', head: 'Kenya picks US-led group for rare-earth mine', short: 'Kenya picks US rare-earth group', detail: 'Mrima Hill deposit; Chinese bidders lose out', src: ['Reuters', 'Mining.com', 'AllAfrica'] },
  { rank: 27, ll: [34.0, 71.5], core: false, region: 'as', icon: 'helmet', place: 'Pakistan', head: 'Pakistan says it killed 22 militants near Afghan border', short: 'Pakistan: 22 militants killed', detail: 'Raids in Khyber Pakhtunkhwa', src: ['AP', 'Xinhua', 'Al Arabiya'] },
  { rank: 28, core: true, region: 'gl', icon: 'gamepad', place: 'Worldwide', head: 'Grand Theft Auto VI goes on sale', short: 'GTA VI goes on sale', detail: 'First new GTA game in 13 years', src: ['Reuters', 'USA Today', 'Deadline'] },
  { rank: 29, ll: [-1.3, 36.8], core: false, region: 'af', icon: 'runner', place: 'Nairobi', head: 'Marathon world champion Jepchirchir banned for doping', short: 'Jepchirchir banned 3 years', detail: 'Three-year ban for EPO', src: ['The Guardian', 'AFP', 'Al Jazeera'] },
  { rank: 30, ll: [-34.8, 173.0], core: false, region: 'as', icon: 'whale', fig: '24', place: 'New Zealand', head: '24 sperm whales strand on Ninety Mile Beach', short: '24 whales strand in NZ', detail: 'Most have died', src: ['RNZ', 'NZ Herald'] },
  { rank: 21.5, extra: true, ll: [18.5, -72.3], core: false, region: 'am', icon: 'helmet', fig: '34', place: 'Port-au-Prince', head: 'Haiti police say 34 gang members killed in offensive', short: 'Haiti: 34 killed in gang offensive', detail: 'Armed forces push to retake a key corridor', src: ['Reuters', 'AP', 'CBC'] },
  { rank: 19.5, extra: true, ll: [21.5, 112.5], core: false, region: 'as', icon: 'megaphone', place: 'Shenzhen', head: 'Albanese tells Putin at APEC: end your war now', short: 'Albanese to Putin: end the war', detail: 'Australian PM’s rebuke in his APEC speech', src: ['The Guardian', 'ABC (Aus)', 'SBS'] },
  { rank: 24.5, extra: true, ll: [37.0, 126.5], core: false, region: 'as', icon: 'pencil', place: 'South Korea', head: 'Half a million sit Korea’s college exam; flights halted', short: 'Korea’s exam day', detail: 'Planes grounded for the listening test; 22 caught with phones', src: ['Yonhap', 'Korea Herald', 'AFP'] },
  { rank: 27.5, extra: true, ll: [47.5, 1.5], core: false, region: 'eu', icon: 'bird', place: 'France', head: 'France raises bird flu risk to its highest level', short: 'France: bird flu risk “high”', detail: 'Tighter rules for poultry farms from Friday', src: ['RFI', 'Anadolu', 'franceinfo'] },
];

// Reported elsewhere as 19 November news, but dated otherwise: shown as a date check.
window.NOT_THIS_DAY = 'Not 19 Nov: the Kerch Bridge strike itself, the $190m van Gogh sale and the EU’s €45bn Ukraine loan were 18 Nov; the UK–EU summit is 20 Nov.';

window.REGIONS = {
  eu: { name: 'Europe', color: '#2a5aa0' },
  me: { name: 'Middle East', color: '#b05a14' },
  as: { name: 'Asia-Pacific', color: '#b02a30' },
  af: { name: 'Africa', color: '#2c7a46' },
  am: { name: 'Americas', color: '#6a3d8f' },
  gl: { name: 'World', color: '#1f6f8b' },
};
