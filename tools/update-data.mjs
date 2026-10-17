// Обновляет data/countries.json из открытых источников. Запуск: node tools/update-data.mjs
// Источники: REST Countries (площадь, столица, координаты), World Bank (население, ВВП, продолжительность жизни, леса),
// Wikidata (столица по-русски, высшая точка, статьи Википедии), Википедия (короткий факт), eloratings.net (футбольный рейтинг Эло).
// Если источник недоступен, его значения берутся из прошлой версии файла.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'countries.json');
const UA = 'country-battle/1.0 (https://github.com/BaSeVa/country-battle)';
const src = fs.readFileSync(path.join(ROOT, 'src', 'engine_head.js'), 'utf8');
const ROSTER = [...src.matchAll(/\{ id: '([a-z]{2})', label: '[^']*', alt: '[^']*', name: ['"]([^'"]+)['"], nameEn: ['"]([^'"]+)['"]/g)].map(m => ({ id: m[1], en: m[3] }));
const IDS = ROSTER.map(r => r.id);
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { countries: {} };
const C = {}; IDS.forEach(id => { C[id] = Object.assign({}, prev.countries?.[id] || {}); });
const fromWd = {};
const status = {};
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(url, opt = {}, kind = 'json') {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { ...opt, headers: { 'User-Agent': UA, Accept: kind === 'json' ? 'application/json' : '*/*', ...(opt.headers || {}) }, signal: AbortSignal.timeout(60000) });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return kind === 'json' ? await r.json() : await r.text();
    } catch (e) { if (i === 3) throw e; await sleep(1500 * (i + 1)); }
  }
}
async function step(name, fn) {
  try { const n = await fn(); status[name] = { ok: true, n }; console.log(`✓ ${name}: ${n}`); }
  catch (e) { status[name] = { ok: false, error: String(e.message || e) }; console.warn(`✗ ${name}: ${e.message || e}`); }
}
const up = id => id.toUpperCase();
const round = (v, d) => (v == null || !isFinite(v) ? null : Math.round(v * 10 ** d) / 10 ** d);

await step('restcountries', async () => {
  let j = null;
  for (const u of ['https://restcountries.com/v3.1/all?fields=cca2,area,population,capital,capitalInfo,latlng', 'https://restcountries.com/v3.1/all?fields=cca2,area,capitalInfo,latlng', 'https://restcountries.com/v3/all']) {
    j = await get(u).catch(() => null); if (Array.isArray(j) && j.length > 100) break; j = null;
  }
  if (!j) throw new Error('REST Countries не ответил списком стран');
  let n = 0;
  for (const c of j) {
    const id = (c.cca2 || '').toLowerCase(); if (!C[id]) continue; n++;
    if (c.area) C[id].area = c.area;
    const ll = c.capitalInfo?.latlng || c.latlng; if (ll && ll.length === 2) { C[id].lat = round(ll[0], 3); C[id].lng = round(ll[1], 3); }
    if (c.capital?.[0]) C[id].capitalEn = c.capital[0];
    if (!C[id].pop && c.population) C[id].pop = round(c.population / 1e6, 4);
  }
  return n;
});

const WB = { pop: ['SP.POP.TOTL', v => round(v / 1e6, 4)], gdp: ['NY.GDP.MKTP.CD', v => round(v / 1e9, v < 1e10 ? 3 : 1)], life: ['SP.DYN.LE00.IN', v => round(v, 1)], forest: ['AG.LND.FRST.ZS', v => round(v, 1)] };
for (const [key, [ind, f]] of Object.entries(WB)) {
  await step('worldbank:' + key, async () => {
    const j = await get(`https://api.worldbank.org/v2/country/all/indicator/${ind}?format=json&mrnev=1&per_page=20000`);
    let n = 0;
    for (const r of j?.[1] || []) {
      const id = (r.country?.id || '').toLowerCase(); if (!C[id] || r.value == null) continue;
      C[id][key] = f(r.value); (C[id].year = C[id].year || {})[key] = +r.date; n++;
    }
    return n;
  });
}

await step('wikidata', async () => {
  const q = `SELECT ?iso ?capRu ?capEn ?capPos ?peakRu ?peakEn ?elev ?ru ?en WHERE {
    ?c wdt:P297 ?iso.
    FILTER NOT EXISTS { ?c wdt:P576 ?dissolved }
    OPTIONAL { ?c wdt:P36 ?cap. ?cap rdfs:label ?capRu FILTER(lang(?capRu)='ru'). OPTIONAL { ?cap rdfs:label ?capEn FILTER(lang(?capEn)='en') } OPTIONAL { ?cap wdt:P625 ?capPos } }
    OPTIONAL { ?c wdt:P610 ?pk. ?pk wdt:P2044 ?elev. OPTIONAL { ?pk rdfs:label ?peakRu FILTER(lang(?peakRu)='ru') } OPTIONAL { ?pk rdfs:label ?peakEn FILTER(lang(?peakEn)='en') } }
    OPTIONAL { ?ru schema:about ?c; schema:isPartOf <https://ru.wikipedia.org/> }
    OPTIONAL { ?en schema:about ?c; schema:isPartOf <https://en.wikipedia.org/> }
  }`;
  const j = await get('https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(q), { headers: { Accept: 'application/sparql-results+json' } });
  const seen = new Set();
  for (const b of j.results.bindings) {
    const id = b.iso.value.toLowerCase(); if (!C[id]) continue; seen.add(id);
    const d = C[id];
    if (b.capRu && !d._capSet) { d.capital = b.capRu.value; d._capSet = 1; }
    const w = fromWd[id] = fromWd[id] || {};
    if (b.capPos && w.lat == null) { const m = /Point\(([-\d.eE]+) ([-\d.eE]+)\)/.exec(b.capPos.value); if (m) { w.lng = round(+m[1], 3); w.lat = round(+m[2], 3); } }
    if (b.elev) { const e = parseFloat(b.elev.value); if (isFinite(e) && e < 9000 && (!d._pk || e > d.peak)) { d.peak = Math.round(e); d.peakRu = b.peakRu?.value || ''; d.peakEn = b.peakEn?.value || ''; d._pk = 1; } }
    if (b.ru) d.wikiRu = decodeURIComponent(b.ru.value.split('/wiki/')[1]);
    if (b.en) d.wikiEn = decodeURIComponent(b.en.value.split('/wiki/')[1]);
  }
  Object.values(C).forEach(d => { delete d._capSet; delete d._pk; });
  // координаты столицы из Wikidata, если REST Countries их не дал
  for (const [id, w] of Object.entries(fromWd)) { const d = C[id]; if (status.restcountries?.ok && d.lat != null) continue; if (w.lat != null) { d.lat = w.lat; d.lng = w.lng; } }
  return seen.size;
});

await step('wikipedia', async () => {
  let n = 0;
  const firstSentences = (t, max) => { if (!t) return ''; t = t.normalize('NFD').replace(/\u0301/g, '').normalize('NFC').replace(/\s*\([^()]*\)/g, '').replace(/\s*\[[^\]]*\]/g, '').replace(/\s+([,.;:])/g, '$1').replace(/\s+/g, ' ').trim(); const parts = t.match(/[^.!?]+[.!?]+/g) || [t]; let out = ''; for (const p of parts) { if ((out + p).length > max && out) break; out += p; } return out.trim().slice(0, max + 40); };
  for (const id of IDS) {
    const d = C[id]; const w = d.wiki = d.wiki || {};
    for (const [lang, title] of [['ru', d.wikiRu], ['en', d.wikiEn]]) {
      if (!title) continue;
      const j = await get(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`).catch(() => null);
      if (j?.extract) { w[lang] = firstSentences(j.extract, 230); n++; }
      await sleep(60);
    }
  }
  return n;
});

await step('elo', async () => {
  const t = await get('https://www.eloratings.net/World.tsv', {}, 'text');
  const code = id => (id === 'gb' ? 'EN' : up(id)), rows = new Map();
  for (const line of t.split('\n')) { const f = line.split('\t'); if (f.length > 3 && f[2]) rows.set(f[2], { rank: +f[0], elo: +f[3] }); }
  // команды, у которых код отличается от ISO, ищем по английскому названию
  const names = new Map(); const teams = await get('https://www.eloratings.net/en.teams.tsv', {}, 'text').catch(() => '');
  for (const line of (teams || '').split('\n')) { const f = line.split('\t'); if (f[0] && !f[0].includes('_')) f.slice(1).forEach(nm => names.set(nm.trim().toLowerCase(), f[0])); }
  let n = 0;
  for (const id of IDS) { const en = ROSTER.find(r => r.id === id).en.toLowerCase(); const r = rows.get(code(id)) || rows.get(names.get(en)) || rows.get(names.get(en.replace(/^the /, ''))); if (r && r.elo) { C[id].elo = r.elo; C[id].eloRank = r.rank; n++; } }
  if (n < 50) throw new Error('слишком мало совпадений: ' + n);
  return n;
});

if (!status.restcountries?.ok) Object.values(C).forEach(d => { if (!d.areaSrc) delete d.area; });
Object.values(C).forEach(d => { if (status.restcountries?.ok && d.area) d.areaSrc = 'restcountries'; });
const out = { updated: new Date().toISOString().slice(0, 10), sources: status, countries: C };
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
const ok = Object.values(status).filter(s => s.ok).length;
console.log(`Готово: ${IDS.length} стран, источников без ошибок: ${ok} из ${Object.keys(status).length}`);
if (!ok) process.exit(1);
