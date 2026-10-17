// Загрузка ролика на YouTube через YouTube Data API v3.
//   node tools/youtube-upload.mjs out/meta.json [--privacy private|unlisted|public]
// Секреты (Settings → Secrets and variables → Actions): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
// Как получить refresh token — в README, раздел «YouTube». По умолчанию ролик загружается как приватный:
// проверьте его в YouTube Studio и опубликуйте сами, либо задайте переменную YT_PRIVACY=public.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2), metaPath = path.resolve(args[0] || 'out/meta.json');
const privacy = (args.includes('--privacy') ? args[args.indexOf('--privacy') + 1] : process.env.YT_PRIVACY) || 'private';
const { YT_CLIENT_ID: id, YT_CLIENT_SECRET: secret, YT_REFRESH_TOKEN: refresh } = process.env;
if (!id || !secret || !refresh) { console.log('Секреты YouTube не заданы — загрузка пропущена'); process.exit(0); }
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')), dir = path.dirname(metaPath);
const file = path.join(dir, meta.video);

const tok = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }) }).then(r => r.json());
if (!tok.access_token) { console.error('Не удалось получить токен Google:', tok.error, tok.error_description); process.exit(1); }
const auth = { Authorization: 'Bearer ' + tok.access_token };

const size = fs.statSync(file).size;
const body = { snippet: { title: meta.title.slice(0, 100), description: meta.description.slice(0, 4900), tags: (meta.tags || []).slice(0, 30), categoryId: '20', defaultLanguage: 'ru', defaultAudioLanguage: 'ru' }, status: { privacyStatus: privacy, selfDeclaredMadeForKids: false } };
const init = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Length': String(size), 'X-Upload-Content-Type': 'video/mp4' }, body: JSON.stringify(body) });
if (!init.ok) { console.error('YouTube отказал:', init.status, await init.text()); process.exit(1); }
const url = init.headers.get('location');
const up = await fetch(url, { method: 'PUT', headers: { ...auth, 'Content-Type': 'video/mp4', 'Content-Length': String(size) }, body: fs.readFileSync(file) });
const v = await up.json();
if (!up.ok || !v.id) { console.error('Загрузка не удалась:', up.status, JSON.stringify(v).slice(0, 400)); process.exit(1); }
const link = 'https://youtu.be/' + v.id;
console.log('Загружено:', link, '·', privacy);
if (meta.cover && fs.existsSync(path.join(dir, meta.cover))) {
  // своё превью доступно только подтверждённым каналам; ошибка здесь не критична
  const t = await fetch(`https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${v.id}`, { method: 'POST', headers: { ...auth, 'Content-Type': 'image/png' }, body: fs.readFileSync(path.join(dir, meta.cover)) });
  console.log(t.ok ? 'Превью установлено' : 'Превью не установлено: ' + t.status);
}
meta.youtube = link; fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `youtube=${link}\n`);
