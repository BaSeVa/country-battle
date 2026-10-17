// Один раз на своём компьютере: получить YT_REFRESH_TOKEN для загрузки на ваш канал.
//   YT_CLIENT_ID=… YT_CLIENT_SECRET=… node tools/youtube-auth.mjs
// Клиент OAuth в Google Cloud: тип «Desktop app», включён YouTube Data API v3.
import http from 'node:http';
const { YT_CLIENT_ID: id, YT_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) { console.error('Задайте YT_CLIENT_ID и YT_CLIENT_SECRET'); process.exit(2); }
const redirect = 'http://127.0.0.1:8765/';
const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({ client_id: id, redirect_uri: redirect, response_type: 'code', access_type: 'offline', prompt: 'consent', scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube' });
console.log('Откройте в браузере и разрешите доступ к каналу:\n\n' + url + '\n');
http.createServer(async (req, res) => {
  const code = new URL(req.url, redirect).searchParams.get('code'); if (!code) { res.end(); return; }
  const t = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ code, client_id: id, client_secret: secret, redirect_uri: redirect, grant_type: 'authorization_code' }) }).then(r => r.json());
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(t.refresh_token ? 'Готово, вернитесь в терминал.' : 'Ошибка: ' + JSON.stringify(t));
  console.log(t.refresh_token ? 'YT_REFRESH_TOKEN = ' + t.refresh_token + '\n\nДобавьте его в Settings → Secrets and variables → Actions.' : t);
  process.exit(0);
}).listen(8765, '127.0.0.1');
