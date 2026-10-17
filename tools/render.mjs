// Рендер роликов без участия человека (GitHub Actions или свой компьютер).
//   node tools/render.mjs daily [--date 2026-10-17]        ролик дня по расписанию недели
//   node tools/render.mjs duel --a ru --b fr [--seed 123]  бой 1 × 1 (например, по итогам голосования)
//   node tools/render.mjs wc [--state state/wc.json]       следующая серия чемпионата мира
// Общие флаги: --site dist (собранный сайт), --out out, --theme, --fmt 916|169|11, --lang ru|en
// Результат в --out: *.mp4, cover.png (превью 1280×720), meta.json (название, описание, теги, файлы).
// Нужны: npm i (playwright), Chromium (npx playwright install chromium), ffmpeg с libx264.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';

const argv = process.argv.slice(2), MODE = argv[0] || 'daily', A = {};
for (let i = 1; i < argv.length; i++) if (argv[i].startsWith('--')) A[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
const SITE = path.resolve(A.site || 'dist'), OUT = path.resolve(A.out || 'out'), STATE = path.resolve(A.state || 'state/wc.json');
const DATE = A.date || new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 10);
fs.mkdirSync(OUT, { recursive: true });

function rng(seedStr) { let h = 2166136261; for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 1e9) / 1e9; }; }
const R = rng('fnbattle-' + DATE), pick = (arr, n) => { const a = arr.slice(), o = []; while (o.length < n && a.length) o.push(a.splice(Math.floor(R() * a.length), 1)[0]); return o; };
const themes = ['light', 'dark', 'chalk', 'neon', 'notebook', 'blueprint'];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errs = []; page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
if (MODE === 'wc' && fs.existsSync(STATE)) {
  const st = fs.readFileSync(STATE, 'utf8');
  await page.addInitScript(s => { try { localStorage.setItem('fnbattle.wc', s); } catch (e) {} }, st);
}
await page.goto('file://' + path.join(SITE, 'index.html'));
await page.waitForFunction(() => window.__fnbattle && window.__fnbattle.auto, null, { timeout: 30000 });
await page.waitForTimeout(1200);
const roster = await page.evaluate(() => window.__fnbattle.names());
const NAME = Object.fromEntries(roster.map(f => [f.id, f.name]));
const countries = roster.map(f => f.id).filter(id => /^[a-z]{2}$/.test(id));
const live = await page.evaluate(() => window.__fnbattle.live());
const base = { theme: A.theme || themes[Math.floor(R() * themes.length)], fmt: A.fmt || '916', lang: A.lang || 'ru', handle: A.handle || process.env.CHANNEL_HANDLE || '' };

let res, meta = { date: DATE, mode: MODE, live };
if (MODE === 'wc') {
  if (!fs.existsSync(STATE)) await page.evaluate(o => window.__fnbattle.wcNew(o.size, 'all', o.seed, o.name, true), { size: +(A.size || 32), seed: +(A.seed || 2026), name: A.name || '' });
  res = await page.evaluate(c => window.__fnbattle.wcEpisode(c), base);
  if (!res) fail('Серия чемпионата не отрендерилась (возможно, чемпионат завершён)');
  fs.mkdirSync(path.dirname(STATE), { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify(res.state));
  const [a, b] = res.pair || [];
  meta.title = `${res.state?.name || 'Чемпионат мира шаров'} · ${res.label}`.slice(0, 95);
  meta.description = [res.label, res.champ ? `Чемпион мира: ${res.champ}!` : '', 'Каждая серия — новый тур: отбор по частям света, группы и плей-офф. Сила сборных — по реальному рейтингу Эло.', '#countryballs #футбол #чемпионатмира #shorts'].filter(Boolean).join('\n\n');
  meta.tags = ['countryballs', 'футбол', 'чемпионат мира', a && NAME[a], b && NAME[b]].filter(Boolean);
  meta.pair = res.pair; meta.wcDone = res.done;
} else {
  let sel, cfg;
  if (MODE === 'duel') {
    const a = A.a, b = A.b; if (!NAME[a] || !NAME[b] || a === b) fail(`Неизвестная пара: ${a} ${b}`);
    sel = { mode: 'duel', a, b, arena: A.arena || 'plane' }; cfg = { ...base, sel, seed: A.seed ? +A.seed : undefined, caption: A.caption || '' };
  } else {
    const wd = new Date(DATE + 'T12:00:00Z').getUTCDay(), arenas = ['plane', 'plane', 'complex', 'polar', 'bonus'];
    const plan = { 1: 'duel', 2: 'team2', 3: 'boss', 4: 'duel', 5: 'ffa', 6: 'team3', 0: 'football' }[wd];
    sel = { mode: plan, arena: plan === 'duel' ? 'plane' : arenas[Math.floor(R() * arenas.length)] };
    if (plan === 'duel' || plan === 'football') { const [a, c] = pick(countries, 2); sel.a = a; sel.b = c; }
    if (plan === 'team2' || plan === 'team3') { const n = plan === 'team2' ? 2 : 3, x = pick(countries, n * 2); sel.ta = x.slice(0, n); sel.tb = x.slice(n); }
    if (plan === 'ffa') sel.ffa = pick(countries, 8);
    if (plan === 'boss') { sel.boss = R() < 0.5 ? 'atl' : 'pan'; sel.bt = pick(countries, 3); }
    cfg = { ...base, sel, split: false, quiz: true }; meta.plan = plan;
  }
  res = await page.evaluate(c => window.__fnbattle.auto(c), cfg);
  if (!res) fail('Рендер не удался');
  const s = res.summary || {};
  const who = sel.a ? `${NAME[sel.a]} vs ${NAME[sel.b]}` : sel.ta ? `${sel.ta.map(i => NAME[i]).join(", ")} vs ${sel.tb.map(i => NAME[i]).join(', ')}` : sel.ffa ? `Битва ${sel.ffa.length} стран` : `Босс vs ${sel.bt.map(i => NAME[i]).join(', ')}`;
  meta.title = `${who} — кто победит? #shorts`.slice(0, 95);
  meta.description = [`${who}. Кто победит? Пишите в комментариях до просмотра!`, `Сид боя: ${res.seed}`, '#countryballs #битвастран #shorts'].filter(Boolean).join('\n\n');
  meta.tags = ['countryballs', 'битва стран', ...Object.values(sel).flat().filter(x => NAME[x]).map(x => NAME[x])].slice(0, 15);
  meta.sel = sel; meta.seed = res.seed; meta.result = s;
  meta.pair = sel.a ? [sel.a, sel.b] : null;
}

const files = [];
for (const v of res.videos) {
  const raw = path.join(OUT, 'raw-' + v.name), fin = path.join(OUT, v.name.replace(/\.(webm|mp4)$/, '') + '.mp4');
  fs.writeFileSync(raw, Buffer.from(v.b64, 'base64'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', fin]);
  fs.unlinkSync(raw); files.push(path.basename(fin));
}
for (const s of res.srt || []) for (const lang of ['ru', 'en']) { const f = `${s.name}.${lang}.srt`; fs.writeFileSync(path.join(OUT, f), s[lang]); files.push(f); }
if (meta.pair) {
  const png = await page.evaluate(([a, b]) => window.__fnbattle.thumb(a, b), meta.pair);
  if (png) { fs.writeFileSync(path.join(OUT, 'cover.png'), Buffer.from(png, 'base64')); meta.cover = 'cover.png'; files.push('cover.png'); }
}
meta.files = files; meta.video = files.find(f => f.endsWith('.mp4'));
fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 2));
await browser.close();
if (errs.length) console.warn('Ошибки страницы:', errs.slice(0, 5));
console.log(JSON.stringify({ title: meta.title, files }, null, 2));

function fail(msg) { console.error(msg, errs.slice(0, 5)); process.exit(3); }
