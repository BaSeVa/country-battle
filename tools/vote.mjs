// Голосование зрителей через GitHub Issues.
//   node tools/vote.mjs pick                       — выбрать заявку с меткой battle, у которой больше всего 👍
//   node tools/vote.mjs done <номер> <ссылка>      — ответить в заявке ссылкой на ролик и закрыть её
// Нужны переменные GITHUB_TOKEN и GITHUB_REPOSITORY (в Actions они есть).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = process.env.GITHUB_REPOSITORY, TOKEN = process.env.GITHUB_TOKEN;
if (!REPO || !TOKEN) { console.error('Нужны GITHUB_REPOSITORY и GITHUB_TOKEN'); process.exit(2); }
const api = async (p, opt = {}) => {
  const r = await fetch('https://api.github.com/repos/' + REPO + p, { ...opt, headers: { Authorization: 'Bearer ' + TOKEN, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(opt.body ? { 'Content-Type': 'application/json' } : {}) } });
  if (!r.ok) throw new Error(r.status + ' ' + (await r.text()).slice(0, 200));
  return r.json();
};
const out = (k, v) => { if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`); };

// страны из движка: id, русское и английское название
const src = fs.readFileSync(path.join(ROOT, 'src', 'engine_head.js'), 'utf8');
const ROSTER = [...src.matchAll(/\{ id: '([a-z]{2})', label: '[^']*', alt: '[^']*', name: ['"]([^'"]+)['"], nameEn: ['"]([^'"]+)['"]/g)].map(m => ({ id: m[1], ru: m[2], en: m[3] }));
const norm = s => s.toLowerCase().replace(/ё/g, 'е');
// ищем страны в тексте по порядку появления; «Россия», «России», «Россией» — по основе слова
function findCountries(text) {
  const t = norm(text), hits = [];
  for (const c of ROSTER) {
    for (const nm of [c.ru, c.en]) {
      const n = norm(nm), stem = n.length >= 4 && /[а-я]$/.test(n) ? n.slice(0, -1) : n;
      const re = new RegExp('(^|[^a-zа-я])' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-zа-я]{0,3}(?![a-zа-я])', 'u');
      const m = re.exec(t); if (m) { hits.push({ id: c.id, at: m.index, len: n.length }); break; }
    }
  }
  hits.sort((a, b) => a.at - b.at || b.len - a.len);
  return [...new Set(hits.map(h => h.id))];
}

const [cmd, num, link] = process.argv.slice(2);
if (cmd === 'pick') {
  const issues = (await api('/issues?state=open&labels=battle&per_page=100')).filter(i => !i.pull_request);
  const scored = issues.map(i => ({ i, score: (i.reactions?.['+1'] || 0) + (i.reactions?.heart || 0) + (i.reactions?.rocket || 0), ids: findCountries(`${i.title}\n${i.body || ''}`) })).filter(x => x.ids.length >= 2);
  scored.sort((a, b) => b.score - a.score || new Date(a.i.created_at) - new Date(b.i.created_at));
  const w = scored[0];
  if (!w) { console.log('Заявок нет — будет ролик по расписанию'); out('found', 'false'); process.exit(0); }
  const [a, b] = w.ids;
  console.log(`Заявка #${w.i.number} «${w.i.title}»: ${a} против ${b}, голосов ${w.score}`);
  out('found', 'true'); out('issue', w.i.number); out('a', a); out('b', b); out('votes', w.score);
} else if (cmd === 'done') {
  await api(`/issues/${num}/comments`, { method: 'POST', body: JSON.stringify({ body: `Бой готов! 🎬 ${link}\n\nСпасибо за голос. Предлагайте следующую пару — новая заявка, кнопка «New issue» → «Предложить бой».` }) });
  await api(`/issues/${num}`, { method: 'PATCH', body: JSON.stringify({ state: 'closed', state_reason: 'completed' }) });
  console.log('Заявка закрыта', num);
} else if (cmd === 'test') {
  console.log(ROSTER.length, findCountries(process.argv.slice(3).join(' ')));
} else { console.error('Команды: pick | done <номер> <ссылка>'); process.exit(2); }
