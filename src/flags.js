// ===================== Флаги и шары-страны =====================
function star5(g, cx, cy, r, rot, col, pts) {
  pts = pts || 5; const ri = pts === 5 ? r * 0.382 : r * 0.45; g.beginPath();
  for (let i = 0; i < pts * 2; i++) { const a = (rot || 0) - Math.PI / 2 + i * Math.PI / pts, rr = i % 2 ? ri : r; i ? g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : g.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
  g.closePath(); g.fillStyle = col; g.fill();
}
function hStr(g, x, y, w, h, cols, wts) { wts = wts || cols.map(() => 1); const tot = wts.reduce((a, b) => a + b, 0); let yy = y; cols.forEach((c, i) => { const hh = h * wts[i] / tot; g.fillStyle = c; g.fillRect(x, yy, w, hh + 0.6); yy += hh; }); }
function vStr(g, x, y, w, h, cols, wts) { wts = wts || cols.map(() => 1); const tot = wts.reduce((a, b) => a + b, 0); let xx = x; cols.forEach((c, i) => { const ww = w * wts[i] / tot; g.fillStyle = c; g.fillRect(xx, y, ww + 0.6, h); xx += ww; }); }
function disc(g, cx, cy, r, col) { g.fillStyle = col; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill(); }
function unionJack(g, x, y, w, h) {
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
  g.fillStyle = '#012169'; g.fillRect(x, y, w, h);
  const d = Math.min(w, h);
  g.lineCap = 'butt'; g.strokeStyle = '#ffffff'; g.lineWidth = d * 0.2;
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y + h); g.moveTo(x + w, y); g.lineTo(x, y + h); g.stroke();
  g.strokeStyle = '#c8102e'; g.lineWidth = d * 0.07;
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y + h); g.moveTo(x + w, y); g.lineTo(x, y + h); g.stroke();
  g.fillStyle = '#ffffff'; g.fillRect(x + w / 2 - d * 0.17, y, d * 0.34, h); g.fillRect(x, y + h / 2 - d * 0.17, w, d * 0.34);
  g.fillStyle = '#c8102e'; g.fillRect(x + w / 2 - d * 0.1, y, d * 0.2, h); g.fillRect(x, y + h / 2 - d * 0.1, w, d * 0.2);
  g.restore();
}
function sunRays(g, cx, cy, r, n, col, len) { g.fillStyle = col; for (let i = 0; i < n; i++) { const a = i * Math.PI * 2 / n; g.beginPath(); g.moveTo(cx + Math.cos(a - 0.08) * r, cy + Math.sin(a - 0.08) * r); g.lineTo(cx + Math.cos(a) * r * len, cy + Math.sin(a) * r * len); g.lineTo(cx + Math.cos(a + 0.08) * r, cy + Math.sin(a + 0.08) * r); g.fill(); } disc(g, cx, cy, r, col); }
const MAPLE = [[0, -1], [0.12, -0.72], [0.3, -0.8], [0.24, -0.38], [0.52, -0.6], [0.58, -0.46], [0.86, -0.52], [0.76, -0.24], [0.9, -0.16], [0.5, 0.2], [0.56, 0.36], [0.06, 0.3], [0.06, 0.78], [-0.06, 0.78], [-0.06, 0.3], [-0.56, 0.36], [-0.5, 0.2], [-0.9, -0.16], [-0.76, -0.24], [-0.86, -0.52], [-0.58, -0.46], [-0.52, -0.6], [-0.24, -0.38], [-0.3, -0.8], [-0.12, -0.72]];
function nordic(g, x, y, w, h, bg, cr, border) {
  g.fillStyle = bg; g.fillRect(x, y, w, h); const cx = x + w * 0.38, cy = y + h / 2, t = h * 0.16, b = h * 0.05;
  if (border) { g.fillStyle = border; g.fillRect(cx - t / 2 - b, y, t + 2 * b, h); g.fillRect(x, cy - t / 2 - b, w, t + 2 * b); }
  g.fillStyle = cr; g.fillRect(cx - t / 2, y, t, h); g.fillRect(x, cy - t / 2, w, t);
}
const FLAGS = {

  pl: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ffffff', '#dc143c']),
  id: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ce1126', '#ffffff']),
  ie: (g, x, y, w, h) => vStr(g, x, y, w, h, ['#169b62', '#ffffff', '#ff883e']),
  th: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#a51931', '#f4f5f8', '#2d2a4a', '#f4f5f8', '#a51931'], [1, 1, 2, 1, 1]),
  co: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#fcd116', '#003893', '#ce1126'], [2, 1, 1]),
  fi: (g, x, y, w, h) => nordic(g, x, y, w, h, '#ffffff', '#002f6c'),
  se: (g, x, y, w, h) => nordic(g, x, y, w, h, '#006aa7', '#fecc00'),
  no: (g, x, y, w, h) => nordic(g, x, y, w, h, '#ba0c2f', '#00205b', '#ffffff'),
  is: (g, x, y, w, h) => nordic(g, x, y, w, h, '#02529c', '#dc1e35', '#ffffff'),
  vn: (g, x, y, w, h) => { g.fillStyle = '#da251d'; g.fillRect(x, y, w, h); star5(g, x + w / 2, y + h / 2, h * 0.3, 0, '#ffff00'); },
  cl: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#ffffff', '#d52b1e']); g.fillStyle = '#0039a6'; g.fillRect(x, y, w * 0.42, h / 2); star5(g, x + w * 0.21, y + h * 0.25, h * 0.12, 0, '#ffffff'); },
  cu: (g, x, y, w, h) => {
    for (let i = 0; i < 5; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#002a8f'; g.fillRect(x, y + h * i / 5, w, h / 5 + 0.6); }
    g.fillStyle = '#cf142b'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.55, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill(); star5(g, x + w * 0.18, y + h / 2, h * 0.12, 0, '#ffffff');
  },
  jm: (g, x, y, w, h) => {
    g.fillStyle = '#009b3a'; g.fillRect(x, y, w, h); g.fillStyle = '#000000';
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + w / 2, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(x + w, y); g.lineTo(x + w / 2, y + h / 2); g.lineTo(x + w, y + h); g.closePath(); g.fill();
    g.strokeStyle = '#fed100'; g.lineWidth = h * 0.15; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y + h); g.moveTo(x + w, y); g.lineTo(x, y + h); g.stroke();
  },
  ke: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#000000', '#ffffff', '#bb0000', '#ffffff', '#006600'], [6, 1, 6, 1, 6]);
    const cx = x + w / 2, cy = y + h / 2; g.fillStyle = '#bb0000'; g.strokeStyle = '#000000'; g.lineWidth = h * 0.02;
    g.beginPath(); g.ellipse(cx, cy, w * 0.11, h * 0.3, 0, 0, 7); g.fill(); g.stroke();
    g.fillStyle = '#000000'; g.beginPath(); g.ellipse(cx, cy - h * 0.15, w * 0.05, h * 0.09, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(cx, cy + h * 0.15, w * 0.05, h * 0.09, 0, 0, 7); g.fill();
    g.fillStyle = '#ffffff'; g.fillRect(cx - w * 0.012, cy - h * 0.06, w * 0.024, h * 0.12);
  },
  za: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#e03c31', '#001489']);
    const t = h * 0.2;
    const Y = (lw, col) => { g.strokeStyle = col; g.lineWidth = lw; g.lineJoin = 'miter'; g.beginPath(); g.moveTo(x - 2, y - 2); g.lineTo(x + w * 0.42, y + h / 2); g.lineTo(x - 2, y + h + 2); g.moveTo(x + w * 0.42, y + h / 2); g.lineTo(x + w + 2, y + h / 2); g.stroke(); };
    Y(t * 1.7, '#ffffff'); Y(t, '#007749');
    g.fillStyle = '#ffb612'; g.beginPath(); g.moveTo(x, y + h * 0.16); g.lineTo(x + w * 0.3, y + h / 2); g.lineTo(x, y + h * 0.84); g.closePath(); g.fill();
    g.fillStyle = '#000000'; g.beginPath(); g.moveTo(x, y + h * 0.24); g.lineTo(x + w * 0.24, y + h / 2); g.lineTo(x, y + h * 0.76); g.closePath(); g.fill();
  },
  nz: (g, x, y, w, h) => {
    g.fillStyle = '#012169'; g.fillRect(x, y, w, h); unionJack(g, x, y, w * 0.5, h * 0.5);
    [[0.76, 0.82, 0.075], [0.62, 0.5, 0.065], [0.78, 0.24, 0.065], [0.88, 0.46, 0.06]].forEach(([a, b, r]) => { star5(g, x + w * a, y + h * b, h * r * 1.3, 0, '#ffffff'); star5(g, x + w * a, y + h * b, h * r, 0, '#c8102e'); });
  },
  ru: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ffffff', '#0039a6', '#d52b1e']),
  de: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#000000', '#dd0000', '#ffce00']),
  nl: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ae1c28', '#ffffff', '#21468b']),
  fr: (g, x, y, w, h) => vStr(g, x, y, w, h, ['#0055a4', '#ffffff', '#ef4135']),
  it: (g, x, y, w, h) => vStr(g, x, y, w, h, ['#009246', '#ffffff', '#ce2b37']),
  ng: (g, x, y, w, h) => vStr(g, x, y, w, h, ['#008751', '#ffffff', '#008751']),
  us: (g, x, y, w, h) => {
    for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#b22234'; g.fillRect(x, y + h * i / 13, w, h / 13 + 0.6); }
    const cw = w * 0.5, ch = h * 7 / 13; g.fillStyle = '#3c3b6e'; g.fillRect(x, y, cw, ch);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) star5(g, x + cw * (c + 0.5 + (r % 2) * 0.0) / 6, y + ch * (r + 0.5) / 5, Math.min(cw / 6, ch / 5) * 0.36, 0, '#ffffff');
  },
  cn: (g, x, y, w, h) => {
    g.fillStyle = '#de2910'; g.fillRect(x, y, w, h);
    star5(g, x + w * 0.27, y + h * 0.3, h * 0.17, 0, '#ffde00');
    [[0.48, 0.12, 0.4], [0.56, 0.22, 0.9], [0.56, 0.36, 0], [0.48, 0.46, 0.5]].forEach(([a, b, r]) => star5(g, x + w * a, y + h * b, h * 0.055, r, '#ffde00'));
  },
  jp: (g, x, y, w, h) => { g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h); disc(g, x + w / 2, y + h / 2, h * 0.3, '#bc002d'); },
  br: (g, x, y, w, h) => {
    g.fillStyle = '#009c3b'; g.fillRect(x, y, w, h);
    g.fillStyle = '#ffdf00'; g.beginPath(); g.moveTo(x + w * 0.5, y + h * 0.1); g.lineTo(x + w * 0.95, y + h * 0.5); g.lineTo(x + w * 0.5, y + h * 0.9); g.lineTo(x + w * 0.05, y + h * 0.5); g.closePath(); g.fill();
    disc(g, x + w / 2, y + h / 2, h * 0.24, '#002776');
    g.save(); g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.24, 0, 7); g.clip();
    g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.05; g.beginPath(); g.arc(x + w * 0.42, y + h * 1.0, h * 0.58, -Math.PI * 0.62, -Math.PI * 0.18); g.stroke(); g.restore();
    [[0.44, 0.58], [0.52, 0.62], [0.58, 0.56], [0.48, 0.66], [0.55, 0.68]].forEach(([a, b]) => disc(g, x + w * a, y + h * b, h * 0.012, '#ffffff'));
  },
  in: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ff9933', '#ffffff', '#138808']);
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.13; g.strokeStyle = '#000080'; g.lineWidth = h * 0.018; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke();
    g.lineWidth = h * 0.008; g.beginPath(); for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12; g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } g.stroke(); disc(g, cx, cy, h * 0.025, '#000080');
  },
  gb: (g, x, y, w, h) => unionJack(g, x, y, w, h),
  es: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#aa151b', '#f1bf00', '#aa151b'], [1, 2, 1]);
    const ex = x + w * 0.3, ey = y + h * 0.5; g.fillStyle = '#aa151b'; g.strokeStyle = '#8c6d00'; g.lineWidth = h * 0.012;
    g.beginPath(); g.moveTo(ex - h * 0.07, ey - h * 0.09); g.lineTo(ex + h * 0.07, ey - h * 0.09); g.lineTo(ex + h * 0.07, ey + h * 0.04); g.quadraticCurveTo(ex, ey + h * 0.13, ex - h * 0.07, ey + h * 0.04); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#c8a200'; g.fillRect(ex - h * 0.065, ey - h * 0.15, h * 0.13, h * 0.05);
  },
  ca: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#d80621', '#ffffff', '#d80621'], [1, 2, 1]);
    const cx = x + w / 2, cy = y + h * 0.5, s = h * 0.27; g.fillStyle = '#d80621'; g.beginPath(); MAPLE.forEach(([a, b], i) => i ? g.lineTo(cx + a * s, cy + b * s) : g.moveTo(cx + a * s, cy + b * s)); g.closePath(); g.fill();
  },
  mx: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#006847', '#ffffff', '#ce1126']);
    const cx = x + w / 2, cy = y + h / 2; g.strokeStyle = '#2e7d32'; g.lineWidth = h * 0.02; g.beginPath(); g.arc(cx, cy + h * 0.02, h * 0.12, Math.PI * 0.15, Math.PI * 0.85); g.stroke();
    g.fillStyle = '#7b4a1e'; g.beginPath(); g.ellipse(cx, cy - h * 0.02, h * 0.07, h * 0.09, 0, 0, 7); g.fill(); disc(g, cx + h * 0.045, cy - h * 0.1, h * 0.03, '#7b4a1e');
  },
  eg: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ce1126', '#ffffff', '#000000']);
    const cx = x + w / 2, cy = y + h / 2; g.fillStyle = '#c09300';
    g.beginPath(); g.moveTo(cx - h * 0.1, cy - h * 0.06); g.lineTo(cx + h * 0.1, cy - h * 0.06); g.lineTo(cx + h * 0.06, cy + h * 0.09); g.lineTo(cx - h * 0.06, cy + h * 0.09); g.closePath(); g.fill(); disc(g, cx, cy - h * 0.1, h * 0.035, '#c09300');
  },
  au: (g, x, y, w, h) => {
    g.fillStyle = '#00247d'; g.fillRect(x, y, w, h); unionJack(g, x, y, w * 0.5, h * 0.5);
    star5(g, x + w * 0.25, y + h * 0.76, h * 0.11, 0, '#ffffff', 7);
    [[0.76, 0.8, 0.07], [0.62, 0.48, 0.065], [0.76, 0.2, 0.065], [0.88, 0.42, 0.065], [0.8, 0.54, 0.035]].forEach(([a, b, r]) => star5(g, x + w * a, y + h * b, h * r, 0, '#ffffff', r < 0.04 ? 5 : 7));
  },
  kr: (g, x, y, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h);
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.22, a = -Math.PI * 0.19;
    g.save(); g.translate(cx, cy); g.rotate(a);
    g.fillStyle = '#cd2e3a'; g.beginPath(); g.arc(0, 0, r, Math.PI, 0); g.fill();
    g.fillStyle = '#0047a0'; g.beginPath(); g.arc(0, 0, r, 0, Math.PI); g.fill();
    disc(g, -r / 2, 0, r / 2, '#cd2e3a'); disc(g, r / 2, 0, r / 2, '#0047a0');
    g.restore();
    g.fillStyle = '#000000'; const tri = (tx, ty, rot, pat) => { g.save(); g.translate(tx, ty); g.rotate(rot); pat.forEach((p, i) => { const yy = (i - 1) * h * 0.05; if (p) g.fillRect(-h * 0.08, yy - h * 0.016, h * 0.16, h * 0.032); else { g.fillRect(-h * 0.08, yy - h * 0.016, h * 0.07, h * 0.032); g.fillRect(h * 0.01, yy - h * 0.016, h * 0.07, h * 0.032); } }); g.restore(); };
    const d = h * 0.36; tri(cx - d * 0.83, cy - d * 0.55, -Math.PI * 0.31 + Math.PI / 2, [1, 1, 1]); tri(cx + d * 0.83, cy + d * 0.55, -Math.PI * 0.31 + Math.PI / 2, [0, 0, 0]); tri(cx + d * 0.83, cy - d * 0.55, Math.PI * 0.31 + Math.PI / 2, [0, 1, 0]); tri(cx - d * 0.83, cy + d * 0.55, Math.PI * 0.31 + Math.PI / 2, [1, 0, 1]);
  },
  ch: (g, x, y, w, h) => { g.fillStyle = '#da291c'; g.fillRect(x, y, w, h); const cx = x + w / 2, cy = y + h / 2, s = Math.min(w, h); g.fillStyle = '#ffffff'; g.fillRect(cx - s * 0.1, cy - s * 0.31, s * 0.2, s * 0.62); g.fillRect(cx - s * 0.31, cy - s * 0.1, s * 0.62, s * 0.2); },
  tr: (g, x, y, w, h) => { g.fillStyle = '#e30a17'; g.fillRect(x, y, w, h); disc(g, x + w * 0.42, y + h / 2, h * 0.25, '#ffffff'); disc(g, x + w * 0.47, y + h / 2, h * 0.2, '#e30a17'); star5(g, x + w * 0.63, y + h / 2, h * 0.1, -Math.PI / 2 + 0.3, '#ffffff'); },
  kz: (g, x, y, w, h) => {
    g.fillStyle = '#00afca'; g.fillRect(x, y, w, h);
    sunRays(g, x + w * 0.55, y + h * 0.4, h * 0.11, 32, '#fec50c', 1.6);
    g.strokeStyle = '#fec50c'; g.lineWidth = h * 0.03; g.beginPath(); g.moveTo(x + w * 0.36, y + h * 0.64); g.quadraticCurveTo(x + w * 0.55, y + h * 0.5, x + w * 0.74, y + h * 0.64); g.stroke();
    g.fillStyle = '#fec50c'; for (let i = 0; i < 8; i++) { const yy = y + h * (0.06 + i * 0.12); g.fillRect(x + w * 0.06, yy, w * 0.035, h * 0.08); g.fillRect(x + w * 0.1, yy + h * 0.03, w * 0.035, h * 0.03); }
  },
  ar: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#74acdf', '#ffffff', '#74acdf']); sunRays(g, x + w / 2, y + h / 2, h * 0.075, 16, '#f6b40e', 1.7); },
  gr: (g, x, y, w, h) => {
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#0d5eaf'; g.fillRect(x, y + h * i / 9, w, h / 9 + 0.6); }
    const c = h * 5 / 9; g.fillStyle = '#0d5eaf'; g.fillRect(x, y, c, c); g.fillStyle = '#ffffff'; g.fillRect(x + c * 0.4, y, c * 0.2, c); g.fillRect(x, y + c * 0.4, c, c * 0.2);
  },
  pt: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#046a38', '#da291c'], [2, 3]);
    const cx = x + w * 0.4, cy = y + h / 2, r = h * 0.17; g.strokeStyle = '#ffe900'; g.lineWidth = h * 0.03; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke();
    g.lineWidth = h * 0.015; g.beginPath(); g.ellipse(cx, cy, r, r * 0.4, 0.4, 0, 7); g.stroke();
    g.fillStyle = '#ffffff'; g.strokeStyle = '#da291c'; g.lineWidth = h * 0.012; g.beginPath(); g.moveTo(cx - r * 0.5, cy - r * 0.55); g.lineTo(cx + r * 0.5, cy - r * 0.55); g.lineTo(cx + r * 0.5, cy + r * 0.2); g.quadraticCurveTo(cx, cy + r * 0.75, cx - r * 0.5, cy + r * 0.2); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#003399'; [[0, -0.3], [-0.22, -0.05], [0.22, -0.05], [0, 0.15]].forEach(([a, b]) => g.fillRect(cx + a * r - r * 0.07, cy + b * r - r * 0.09, r * 0.14, r * 0.18));
  },
  // ---------- Европа, Азия, Океания (добавлены) ----------
  al: (g, x, y, w, h) => {
    g.fillStyle = '#e41e20'; g.fillRect(x, y, w, h);
    const cx = x + w / 2, cy = y + h * 0.52, s = h * 0.36; g.fillStyle = '#16181c';
    for (const sd of [-1, 1]) {
      g.beginPath(); g.moveTo(cx + sd * s * 0.12, cy - s * 0.2);
      for (let i = 0; i <= 6; i++) { const a = -0.25 - i * 0.18; g.lineTo(cx + sd * (s * 0.25 + Math.cos(a) * s * (i % 2 ? 0.85 : 1.0)), cy - s * 0.15 + Math.sin(-a) * -s * 0.7 * (i % 2 ? 0.85 : 1)); }
      g.lineTo(cx + sd * s * 0.2, cy + s * 0.25); g.closePath(); g.fill();
      g.beginPath(); g.ellipse(cx + sd * s * 0.2, cy - s * 0.62, s * 0.11, s * 0.13, 0, 0, 7); g.fill();
      g.beginPath(); g.moveTo(cx + sd * s * 0.28, cy - s * 0.66); g.lineTo(cx + sd * s * 0.44, cy - s * 0.6); g.lineTo(cx + sd * s * 0.28, cy - s * 0.56); g.fill();
    }
    g.beginPath(); g.ellipse(cx, cy, s * 0.2, s * 0.42, 0, 0, 7); g.fill();
    g.beginPath(); g.moveTo(cx - s * 0.22, cy + s * 0.35); g.lineTo(cx, cy + s * 0.8); g.lineTo(cx + s * 0.22, cy + s * 0.35); g.fill();
    g.fillRect(cx - s * 0.06, cy - s * 0.58, s * 0.12, s * 0.2);
  },
  ad: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#10069f', '#fedf00', '#d50032'], [8, 9, 8]);
    const cx = x + w / 2, cy = y + h / 2, s = h * 0.13; g.fillStyle = '#c7a24a'; g.strokeStyle = '#7a5a1e'; g.lineWidth = h * 0.01;
    g.beginPath(); g.moveTo(cx - s, cy - s); g.lineTo(cx + s, cy - s); g.lineTo(cx + s, cy + s * 0.5); g.quadraticCurveTo(cx, cy + s * 1.4, cx - s, cy + s * 0.5); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#d50032'; g.fillRect(cx + s * 0.1, cy - s * 0.8, s * 0.7, s * 0.7); g.fillStyle = '#fedf00'; g.fillRect(cx - s * 0.8, cy + s * 0.05, s * 0.7, s * 0.6);
  },
  at: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#c8102e', '#ffffff', '#c8102e']),
  by: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#c8313e', '#4aa657'], [2, 1]);
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w * 0.11, h);
    g.fillStyle = '#c8313e'; for (let i = 0; i < 9; i++) { const cy = y + h * (0.06 + i * 0.11), cx = x + w * 0.055, r = w * 0.04; g.beginPath(); g.moveTo(cx, cy - r); g.lineTo(cx + r, cy); g.lineTo(cx, cy + r); g.lineTo(cx - r, cy); g.closePath(); g.fill(); }
  },
  be: (g, x, y, w, h) => vStr(g, x, y, w, h, ['#16181c', '#fdda24', '#ef3340']),
  ba: (g, x, y, w, h) => {
    g.fillStyle = '#002395'; g.fillRect(x, y, w, h);
    g.fillStyle = '#fecb00'; g.beginPath(); g.moveTo(x + w * 0.27, y); g.lineTo(x + w * 0.77, y); g.lineTo(x + w * 0.77, y + h); g.closePath(); g.fill();
    for (let i = 0; i < 9; i++) { const t = (i + 0.2) / 8.6; star5(g, x + w * (0.17 + t * 0.5), y + h * (t - 0.02), h * 0.045, 0, '#ffffff'); }
  },
  bg: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ffffff', '#00966e', '#d62612']),
  hr: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ff0000', '#ffffff', '#171796']);
    const s = h * 0.065, x0 = x + w / 2 - s * 2.5, y0 = y + h * 0.36;
    for (let r = 0; r < 5; r++) for (let q = 0; q < 5; q++) { g.fillStyle = (r + q) % 2 ? '#ffffff' : '#ff0000'; g.fillRect(x0 + q * s, y0 + r * s, s + 0.5, s + 0.5); }
    g.strokeStyle = '#171796'; g.lineWidth = h * 0.012; g.strokeRect(x0, y0, s * 5, s * 5);
    g.fillStyle = '#4a7fd6'; for (let i = 0; i < 5; i++) g.fillRect(x0 + i * s + s * 0.1, y0 - s * 0.9, s * 0.8, s * 0.7);
  },
  cy: (g, x, y, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h);
    const P = [[0.2, 0.46], [0.36, 0.4], [0.5, 0.42], [0.62, 0.36], [0.82, 0.24], [0.68, 0.38], [0.74, 0.44], [0.6, 0.5], [0.46, 0.56], [0.32, 0.58], [0.24, 0.54]];
    g.fillStyle = '#d57800'; g.beginPath(); P.forEach(([a, b], i) => i ? g.lineTo(x + w * a, y + h * b) : g.moveTo(x + w * a, y + h * b)); g.closePath(); g.fill();
    g.strokeStyle = '#4e5b31'; g.lineWidth = h * 0.02; g.lineCap = 'round';
    for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(x + w * 0.5, y + h * 0.78); g.quadraticCurveTo(x + w * (0.5 + sd * 0.12), y + h * 0.74, x + w * (0.5 + sd * 0.2), y + h * 0.64); g.stroke(); for (let i = 1; i < 4; i++) { g.fillStyle = '#4e5b31'; g.beginPath(); g.ellipse(x + w * (0.5 + sd * i * 0.05), y + h * (0.76 - i * 0.03), w * 0.025, h * 0.012, sd * 0.6, 0, 7); g.fill(); } }
  },
  cz: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#ffffff', '#d7141a']); g.fillStyle = '#11457e'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.5, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill(); },
  dk: (g, x, y, w, h) => nordic(g, x, y, w, h, '#c8102e', '#ffffff'),
  ee: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#0072ce', '#16181c', '#ffffff']),
  hu: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#cd2a3e', '#ffffff', '#477050']),
  lv: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#9e3039', '#ffffff', '#9e3039'], [2, 1, 2]),
  li: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#002b7f', '#ce1126']);
    const cx = x + w * 0.27, cy = y + h * 0.24, s = h * 0.09; g.fillStyle = '#ffd83d'; g.strokeStyle = '#16181c'; g.lineWidth = h * 0.008;
    g.beginPath(); g.moveTo(cx - s, cy + s * 0.6); g.lineTo(cx - s, cy - s * 0.2); g.quadraticCurveTo(cx - s * 0.5, cy - s * 0.9, cx, cy - s * 1.1); g.quadraticCurveTo(cx + s * 0.5, cy - s * 0.9, cx + s, cy - s * 0.2); g.lineTo(cx + s, cy + s * 0.6); g.closePath(); g.fill(); g.stroke();
    disc(g, cx, cy - s * 1.3, s * 0.2, '#ffd83d');
  },
  lt: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#fdb913', '#006a44', '#c1272d']),
  lu: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ed2939', '#ffffff', '#00a1de']),
  mt: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#ffffff', '#cf142b']);
    const cx = x + w * 0.2, cy = y + h * 0.2, s = h * 0.07; g.fillStyle = '#a7a7a7'; g.strokeStyle = '#cf142b'; g.lineWidth = h * 0.008;
    g.fillRect(cx - s * 0.35, cy - s, s * 0.7, s * 2); g.fillRect(cx - s, cy - s * 0.35, s * 2, s * 0.7); g.strokeRect(cx - s * 0.35, cy - s, s * 0.7, s * 2); g.strokeRect(cx - s, cy - s * 0.35, s * 2, s * 0.7);
  },
  md: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#0046ae', '#ffd200', '#cc092f']);
    const cx = x + w / 2, cy = y + h * 0.5, s = h * 0.12; g.fillStyle = '#8b5a2b';
    g.beginPath(); g.moveTo(cx, cy - s * 1.1); g.lineTo(cx + s * 1.1, cy - s * 0.5); g.lineTo(cx + s * 0.4, cy - s * 0.2); g.lineTo(cx + s * 0.5, cy + s * 0.9); g.lineTo(cx, cy + s * 1.2); g.lineTo(cx - s * 0.5, cy + s * 0.9); g.lineTo(cx - s * 0.4, cy - s * 0.2); g.lineTo(cx - s * 1.1, cy - s * 0.5); g.closePath(); g.fill();
    g.fillStyle = '#cc092f'; g.fillRect(cx - s * 0.35, cy - s * 0.15, s * 0.35, s * 0.6); g.fillStyle = '#0046ae'; g.fillRect(cx, cy - s * 0.15, s * 0.35, s * 0.6);
  },
  mc: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ce1126', '#ffffff']),
  me: (g, x, y, w, h) => {
    g.fillStyle = '#d4af37'; g.fillRect(x, y, w, h); g.fillStyle = '#c40308'; g.fillRect(x + w * 0.05, y + h * 0.05, w * 0.9, h * 0.9);
    const cx = x + w / 2, cy = y + h * 0.5, s = h * 0.2; g.fillStyle = '#d4af37';
    for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(cx, cy - s * 0.2); g.lineTo(cx + sd * s * 1.1, cy - s * 0.8); g.lineTo(cx + sd * s * 0.9, cy + s * 0.2); g.lineTo(cx + sd * s * 0.2, cy + s * 0.5); g.closePath(); g.fill(); disc(g, cx + sd * s * 0.25, cy - s * 0.75, s * 0.15, '#d4af37'); }
    g.beginPath(); g.ellipse(cx, cy + s * 0.1, s * 0.3, s * 0.55, 0, 0, 7); g.fill(); g.fillRect(cx - s * 0.3, cy - s * 1.25, s * 0.6, s * 0.3);
  },
  mk: (g, x, y, w, h) => {
    g.fillStyle = '#d20000'; g.fillRect(x, y, w, h); const cx = x + w / 2, cy = y + h / 2; g.fillStyle = '#ffe600';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; g.beginPath(); g.moveTo(cx + Math.cos(a - 0.12) * h * 0.1, cy + Math.sin(a - 0.12) * h * 0.1); g.lineTo(cx + Math.cos(a - 0.2) * h * 0.9, cy + Math.sin(a - 0.2) * h * 0.9); g.lineTo(cx + Math.cos(a + 0.2) * h * 0.9, cy + Math.sin(a + 0.2) * h * 0.9); g.lineTo(cx + Math.cos(a + 0.12) * h * 0.1, cy + Math.sin(a + 0.12) * h * 0.1); g.closePath(); g.fill(); }
    disc(g, cx, cy, h * 0.15, '#d20000'); disc(g, cx, cy, h * 0.12, '#ffe600');
  },
  ro: (g, x, y, w, h) => vStr(g, x, y, w, h, ['#002b7f', '#fcd116', '#ce1126']),
  sm: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ffffff', '#5eb6e4']); const cx = x + w / 2, cy = y + h / 2, s = h * 0.1;
    g.fillStyle = '#5eb6e4'; g.strokeStyle = '#c7a24a'; g.lineWidth = h * 0.012; g.beginPath(); g.moveTo(cx - s, cy - s); g.lineTo(cx + s, cy - s); g.lineTo(cx + s, cy + s * 0.4); g.quadraticCurveTo(cx, cy + s * 1.4, cx - s, cy + s * 0.4); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffffff'; [-0.55, 0, 0.55].forEach(d => { g.fillRect(cx + d * s - s * 0.12, cy - s * 0.55, s * 0.24, s * 0.7); });
  },
  rs: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#c6363c', '#0c4076', '#ffffff']); const cx = x + w * 0.35, cy = y + h * 0.45, s = h * 0.14;
    g.fillStyle = '#c6363c'; g.strokeStyle = '#d4af37'; g.lineWidth = h * 0.012; g.beginPath(); g.moveTo(cx - s, cy - s); g.lineTo(cx + s, cy - s); g.lineTo(cx + s, cy + s * 0.5); g.quadraticCurveTo(cx, cy + s * 1.4, cx - s, cy + s * 0.5); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffffff'; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(cx, cy - s * 0.2); g.lineTo(cx + sd * s * 0.8, cy - s * 0.7); g.lineTo(cx + sd * s * 0.6, cy + s * 0.2); g.closePath(); g.fill(); disc(g, cx + sd * s * 0.2, cy - s * 0.65, s * 0.12, '#ffffff'); }
    g.beginPath(); g.ellipse(cx, cy, s * 0.22, s * 0.45, 0, 0, 7); g.fill(); g.fillStyle = '#d4af37'; g.fillRect(cx - s * 0.4, cy - s * 1.35, s * 0.8, s * 0.3);
  },
  sk: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ffffff', '#0b4ea2', '#ee1c25']); const cx = x + w * 0.35, cy = y + h * 0.5, s = h * 0.16;
    g.fillStyle = '#ee1c25'; g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.016; g.beginPath(); g.moveTo(cx - s, cy - s); g.lineTo(cx + s, cy - s); g.lineTo(cx + s, cy + s * 0.4); g.quadraticCurveTo(cx, cy + s * 1.3, cx - s, cy + s * 0.4); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#0b4ea2'; g.beginPath(); g.arc(cx - s * 0.5, cy + s * 0.75, s * 0.35, Math.PI, 0); g.arc(cx, cy + s * 0.6, s * 0.35, Math.PI, 0); g.arc(cx + s * 0.5, cy + s * 0.75, s * 0.35, Math.PI, 0); g.lineTo(cx + s * 0.6, cy + s * 0.95); g.lineTo(cx - s * 0.6, cy + s * 0.95); g.closePath(); g.fill();
    g.fillStyle = '#ffffff'; g.fillRect(cx - s * 0.09, cy - s * 0.8, s * 0.18, s * 1.3); g.fillRect(cx - s * 0.45, cy - s * 0.55, s * 0.9, s * 0.16); g.fillRect(cx - s * 0.6, cy - s * 0.2, s * 1.2, s * 0.16);
  },
  si: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ffffff', '#003da5', '#ed1c24']); const cx = x + w * 0.3, cy = y + h * 0.32, s = h * 0.13;
    g.fillStyle = '#003da5'; g.strokeStyle = '#ed1c24'; g.lineWidth = h * 0.012; g.beginPath(); g.moveTo(cx - s, cy - s); g.lineTo(cx + s, cy - s); g.lineTo(cx + s, cy + s * 0.5); g.quadraticCurveTo(cx, cy + s * 1.4, cx - s, cy + s * 0.5); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(cx - s * 0.8, cy + s * 0.5); g.lineTo(cx - s * 0.4, cy); g.lineTo(cx - s * 0.2, cy + s * 0.2); g.lineTo(cx, cy - s * 0.35); g.lineTo(cx + s * 0.2, cy + s * 0.2); g.lineTo(cx + s * 0.4, cy); g.lineTo(cx + s * 0.8, cy + s * 0.5); g.closePath(); g.fill();
    [[-0.4, -0.7], [0, -0.75], [0.4, -0.7]].forEach(([a, b]) => star5(g, cx + a * s, cy + b * s, s * 0.14, 0, '#ffd200', 6));
  },
  ua: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#0057b7', '#ffd700']),
  va: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#ffe000', '#ffffff']); const cx = x + w * 0.72, cy = y + h * 0.52, s = h * 0.14; g.lineWidth = h * 0.03; g.lineCap = 'round';
    [['#d4af37', 1], ['#a7a7a7', -1]].forEach(([c, sd]) => { g.strokeStyle = c; g.beginPath(); g.moveTo(cx - sd * s, cy - s); g.lineTo(cx + sd * s, cy + s); g.stroke(); g.beginPath(); g.arc(cx - sd * s * 1.05, cy - s * 1.05, s * 0.22, 0, 7); g.stroke(); g.fillStyle = c; g.fillRect(cx + sd * s * 0.75, cy + s * 0.7, sd * s * 0.4, s * 0.12); });
    g.fillStyle = '#d4af37'; g.fillRect(cx - s * 0.35, cy - s * 1.5, s * 0.7, s * 0.4);
  },
  af: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#16181c', '#d32011', '#007a36']); const cx = x + w / 2, cy = y + h / 2, r = h * 0.17;
    g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.022; g.beginPath(); g.arc(cx, cy, r, Math.PI * 0.6, Math.PI * 2.4); g.stroke();
    g.fillStyle = '#ffffff'; g.fillRect(cx - r * 0.5, cy - r * 0.1, r, r * 0.55); g.beginPath(); g.moveTo(cx - r * 0.55, cy - r * 0.1); g.lineTo(cx, cy - r * 0.55); g.lineTo(cx + r * 0.55, cy - r * 0.1); g.closePath(); g.fill();
    g.fillStyle = '#d32011'; g.fillRect(cx - r * 0.12, cy + r * 0.1, r * 0.24, r * 0.35);
  },
  am: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#d90012', '#0033a0', '#f2a800']),
  az: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#00b5e2', '#ef3340', '#509e2f']); const cx = x + w * 0.47, cy = y + h / 2;
    disc(g, cx, cy, h * 0.12, '#ffffff'); disc(g, cx + h * 0.03, cy, h * 0.1, '#ef3340'); star5(g, cx + h * 0.1, cy, h * 0.055, 0, '#ffffff', 8);
  },
  bh: (g, x, y, w, h) => {
    g.fillStyle = '#ce1126'; g.fillRect(x, y, w, h); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.25, y);
    for (let i = 0; i < 5; i++) { g.lineTo(x + w * 0.4, y + h * (i + 0.5) / 5); g.lineTo(x + w * 0.25, y + h * (i + 1) / 5); }
    g.lineTo(x, y + h); g.closePath(); g.fill();
  },
  bd: (g, x, y, w, h) => { g.fillStyle = '#006a4e'; g.fillRect(x, y, w, h); disc(g, x + w * 0.45, y + h / 2, h * 0.3, '#f42a41'); },
  bt: (g, x, y, w, h) => {
    g.fillStyle = '#ff4e12'; g.fillRect(x, y, w, h); g.fillStyle = '#ffcc33'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.07; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + w * 0.22, y + h * 0.78); g.bezierCurveTo(x + w * 0.4, y + h * 0.45, x + w * 0.55, y + h * 0.75, x + w * 0.78, y + h * 0.26); g.stroke();
    g.lineWidth = h * 0.02; for (let i = 0; i < 5; i++) { const t = 0.2 + i * 0.14, px = x + w * (0.22 + t * 0.56), py = y + h * (0.78 - t * 0.52); g.beginPath(); g.moveTo(px, py); g.lineTo(px + w * 0.05, py + h * 0.07); g.stroke(); }
    disc(g, x + w * 0.8, y + h * 0.22, h * 0.06, '#ffffff');
  },
  bn: (g, x, y, w, h) => {
    g.fillStyle = '#f7e017'; g.fillRect(x, y, w, h); g.save(); g.translate(x + w / 2, y + h / 2); g.rotate(0.45);
    g.fillStyle = '#ffffff'; g.fillRect(-w, -h * 0.17, 2 * w, h * 0.17); g.fillStyle = '#16181c'; g.fillRect(-w, 0, 2 * w, h * 0.17); g.restore();
    const cx = x + w / 2, cy = y + h / 2; g.fillStyle = '#cf1126'; g.beginPath(); g.arc(cx, cy + h * 0.02, h * 0.13, 0.1, Math.PI - 0.1); g.lineTo(cx - h * 0.03, cy - h * 0.02); g.lineTo(cx, cy - h * 0.2); g.lineTo(cx + h * 0.03, cy - h * 0.02); g.closePath(); g.fill();
    g.fillRect(cx - h * 0.02, cy - h * 0.14, h * 0.04, h * 0.2);
  },
  kh: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#032ea1', '#e00025', '#032ea1'], [1, 2, 1]); const cx = x + w / 2, by = y + h * 0.66; g.fillStyle = '#ffffff';
    g.fillRect(cx - h * 0.3, by - h * 0.05, h * 0.6, h * 0.05);
    [[-0.22, 0.14], [-0.11, 0.2], [0, 0.26], [0.11, 0.2], [0.22, 0.14]].forEach(([a, t]) => { const px = cx + a * h; g.fillRect(px - h * 0.035, by - h * t * 0.55, h * 0.07, h * t * 0.55); g.beginPath(); g.moveTo(px - h * 0.035, by - h * t * 0.55); g.lineTo(px, by - h * t); g.lineTo(px + h * 0.035, by - h * t * 0.55); g.closePath(); g.fill(); });
  },
  ge: (g, x, y, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h); g.fillStyle = '#e8112d'; const t = h * 0.18; g.fillRect(x + w / 2 - t / 2, y, t, h); g.fillRect(x, y + h / 2 - t / 2, w, t);
    [[0.22, 0.22], [0.78, 0.22], [0.22, 0.78], [0.78, 0.78]].forEach(([a, b]) => { const cx = x + w * a, cy = y + h * b, s = h * 0.08; g.fillRect(cx - s * 0.25, cy - s, s * 0.5, s * 2); g.fillRect(cx - s, cy - s * 0.25, s * 2, s * 0.5); });
  },
  ir: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#239f40', '#ffffff', '#da0000']); g.fillStyle = 'rgba(255,255,255,.75)';
    for (let i = 0; i < 11; i++) { g.fillRect(x + w * (0.03 + i * 0.09), y + h * 0.3, w * 0.05, h * 0.02); g.fillRect(x + w * (0.03 + i * 0.09), y + h * 0.68, w * 0.05, h * 0.02); }
    const cx = x + w / 2, cy = y + h / 2; g.strokeStyle = '#da0000'; g.lineWidth = h * 0.022; g.lineCap = 'round';
    g.beginPath(); g.arc(cx - h * 0.04, cy, h * 0.08, Math.PI * 0.6, Math.PI * 1.45); g.stroke(); g.beginPath(); g.arc(cx + h * 0.04, cy, h * 0.08, -Math.PI * 0.45, Math.PI * 0.4); g.stroke();
    g.beginPath(); g.moveTo(cx, cy - h * 0.1); g.lineTo(cx, cy + h * 0.1); g.stroke();
  },
  iq: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ce1126', '#ffffff', '#16181c']); g.strokeStyle = '#007a3d'; g.lineWidth = h * 0.025; g.lineCap = 'round';
    const cy = y + h / 2; g.beginPath(); g.moveTo(x + w * 0.3, cy + h * 0.05); g.lineTo(x + w * 0.7, cy + h * 0.05); g.stroke();
    [0.34, 0.42, 0.5, 0.58, 0.66].forEach((a, i) => { g.beginPath(); g.moveTo(x + w * a, cy + h * 0.05); g.lineTo(x + w * a, cy - h * (i % 2 ? 0.05 : 0.1)); g.stroke(); });
  },
  il: (g, x, y, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h); g.fillStyle = '#0038b8'; g.fillRect(x, y + h * 0.1, w, h * 0.15); g.fillRect(x, y + h * 0.75, w, h * 0.15);
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.15; g.strokeStyle = '#0038b8'; g.lineWidth = h * 0.025;
    for (const rot of [0, Math.PI]) { g.beginPath(); for (let i = 0; i < 3; i++) { const a = rot - Math.PI / 2 + i * Math.PI * 2 / 3; i ? g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : g.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } g.closePath(); g.stroke(); }
  },
  jo: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#16181c', '#ffffff', '#007a3d']); g.fillStyle = '#ce1126'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.5, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill();
    star5(g, x + w * 0.18, y + h / 2, h * 0.07, 0, '#ffffff', 7);
  },
  kw: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#007a3d', '#ffffff', '#ce1126']); g.fillStyle = '#16181c'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.25, y + h / 3); g.lineTo(x + w * 0.25, y + h * 2 / 3); g.lineTo(x, y + h); g.closePath(); g.fill(); },
  kg: (g, x, y, w, h) => {
    g.fillStyle = '#e8112d'; g.fillRect(x, y, w, h); const cx = x + w / 2, cy = y + h / 2; sunRays(g, cx, cy, h * 0.16, 40, '#ffef00', 1.7); disc(g, cx, cy, h * 0.17, '#ffef00');
    disc(g, cx, cy, h * 0.11, '#e8112d'); g.strokeStyle = '#ffef00'; g.lineWidth = h * 0.016; g.save(); g.beginPath(); g.arc(cx, cy, h * 0.11, 0, 7); g.clip();
    for (const d of [-0.04, 0.04]) { g.beginPath(); g.moveTo(cx + d * h - h * 0.1, cy - h * 0.12); g.quadraticCurveTo(cx + d * h, cy, cx + d * h - h * 0.1, cy + h * 0.12); g.stroke(); g.beginPath(); g.moveTo(cx - d * h + h * 0.1, cy - h * 0.12); g.quadraticCurveTo(cx - d * h, cy, cx - d * h + h * 0.1, cy + h * 0.12); g.stroke(); }
    g.restore();
  },
  la: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#ce1126', '#002868', '#ce1126'], [1, 2, 1]); disc(g, x + w / 2, y + h / 2, h * 0.2, '#ffffff'); },
  lb: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ed1c24', '#ffffff', '#ed1c24'], [1, 2, 1]); const cx = x + w / 2, cy = y + h / 2; g.fillStyle = '#00a651';
    [[-0.2, 0.3], [-0.06, 0.24], [0.08, 0.17], [0.2, 0.1]].forEach(([b, s]) => { g.beginPath(); g.moveTo(cx - h * s, cy + h * (b + 0.12)); g.lineTo(cx, cy + h * (b - 0.02)); g.lineTo(cx + h * s, cy + h * (b + 0.12)); g.closePath(); g.fill(); });
    g.fillStyle = '#8b5a2b'; g.fillRect(cx - h * 0.02, cy + h * 0.12, h * 0.04, h * 0.1);
  },
  my: (g, x, y, w, h) => {
    for (let i = 0; i < 14; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#cc0001'; g.fillRect(x, y + h * i / 14, w, h / 14 + 0.6); }
    const cw = w * 0.5, ch = h * 8 / 14; g.fillStyle = '#010066'; g.fillRect(x, y, cw, ch);
    disc(g, x + cw * 0.38, y + ch / 2, ch * 0.32, '#ffcc00'); disc(g, x + cw * 0.45, y + ch / 2, ch * 0.27, '#010066'); star5(g, x + cw * 0.72, y + ch / 2, ch * 0.22, 0, '#ffcc00', 14);
  },
  mv: (g, x, y, w, h) => { g.fillStyle = '#d21034'; g.fillRect(x, y, w, h); g.fillStyle = '#007e3a'; g.fillRect(x + w * 0.25, y + h * 0.25, w * 0.5, h * 0.5); disc(g, x + w * 0.52, y + h / 2, h * 0.14, '#ffffff'); disc(g, x + w * 0.56, y + h / 2, h * 0.12, '#007e3a'); },
  mn: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#c4272f', '#015197', '#c4272f']); const cx = x + w / 6, s = h * 0.05; g.fillStyle = '#f9cf02';
    g.beginPath(); g.moveTo(cx, y + h * 0.12); g.lineTo(cx + s * 0.6, y + h * 0.22); g.lineTo(cx - s * 0.6, y + h * 0.22); g.closePath(); g.fill(); disc(g, cx, y + h * 0.28, s * 0.8, '#f9cf02');
    disc(g, cx, y + h * 0.4, s * 1.1, '#f9cf02'); disc(g, cx, y + h * 0.38, s * 1.0, '#c4272f');
    [0.47, 0.56, 0.75, 0.84].forEach(b => g.fillRect(cx - s * 1.2, y + h * b, s * 2.4, s * 0.6)); g.fillRect(cx - s * 2.2, y + h * 0.47, s * 0.7, h * 0.39); g.fillRect(cx + s * 1.5, y + h * 0.47, s * 0.7, h * 0.39);
    disc(g, cx, y + h * 0.66, s * 1.0, '#f9cf02');
  },
  mm: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#fecb00', '#34b233', '#ea2839']); star5(g, x + w / 2, y + h * 0.53, h * 0.36, 0, '#ffffff'); },
  np: (g, x, y, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h); const P = [[0.2, 0.05], [0.82, 0.46], [0.42, 0.46], [0.8, 0.95], [0.2, 0.95]];
    const path = k => { g.beginPath(); P.forEach(([a, b], i) => { const px = x + w * (0.2 + (a - 0.2) * k), py = y + h * (0.5 + (b - 0.5) * k); i ? g.lineTo(px, py) : g.moveTo(px, py); }); g.closePath(); };
    path(1); g.fillStyle = '#003893'; g.fill(); path(0.86); g.fillStyle = '#dc143c'; g.fill();
    disc(g, x + w * 0.36, y + h * 0.36, h * 0.07, '#ffffff'); disc(g, x + w * 0.36, y + h * 0.33, h * 0.065, '#dc143c'); sunRays(g, x + w * 0.36, y + h * 0.36, h * 0.04, 8, '#ffffff', 1.5);
    star5(g, x + w * 0.36, y + h * 0.74, h * 0.07, 0, '#ffffff', 12);
  },
  kp: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#024fa2', '#ffffff', '#ed1c27', '#ffffff', '#024fa2'], [6, 1, 15, 1, 6]);
    disc(g, x + w * 0.35, y + h / 2, h * 0.18, '#ffffff'); star5(g, x + w * 0.35, y + h / 2, h * 0.17, 0, '#ed1c27');
  },
  om: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ffffff', '#db161b', '#008000']); g.fillStyle = '#db161b'; g.fillRect(x, y, w * 0.28, h);
    const cx = x + w * 0.14, cy = y + h * 0.18, s = h * 0.08; g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.018; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx - s, cy - s); g.lineTo(cx + s, cy + s); g.moveTo(cx + s, cy - s); g.lineTo(cx - s, cy + s); g.stroke(); g.beginPath(); g.moveTo(cx, cy - s * 0.8); g.quadraticCurveTo(cx + s * 0.6, cy + s * 0.6, cx - s * 0.2, cy + s * 1.2); g.stroke();
  },
  pk: (g, x, y, w, h) => { g.fillStyle = '#ffffff'; g.fillRect(x, y, w * 0.25, h); g.fillStyle = '#01411c'; g.fillRect(x + w * 0.25, y, w * 0.75, h); const cx = x + w * 0.62, cy = y + h / 2; disc(g, cx, cy, h * 0.24, '#ffffff'); disc(g, cx + h * 0.06, cy - h * 0.05, h * 0.21, '#01411c'); star5(g, cx + h * 0.1, cy - h * 0.1, h * 0.07, 0.6, '#ffffff'); },
  ph: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#0038a8', '#ce1126']); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.5, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill();
    const cx = x + w * 0.17, cy = y + h / 2; sunRays(g, cx, cy, h * 0.06, 8, '#fcd116', 2.0); disc(g, cx, cy, h * 0.065, '#fcd116');
    [[0.05, 0.1], [0.05, 0.9], [0.42, 0.5]].forEach(([a, b]) => star5(g, x + w * a, y + h * b, h * 0.035, 0, '#fcd116'));
  },
  qa: (g, x, y, w, h) => {
    g.fillStyle = '#8a1538'; g.fillRect(x, y, w, h); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.3, y);
    for (let i = 0; i < 9; i++) { g.lineTo(x + w * 0.4, y + h * (i + 0.5) / 9); g.lineTo(x + w * 0.3, y + h * (i + 1) / 9); }
    g.lineTo(x, y + h); g.closePath(); g.fill();
  },
  sa: (g, x, y, w, h) => {
    g.fillStyle = '#006c35'; g.fillRect(x, y, w, h); g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.022; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x + w * 0.22, y + h * 0.42); for (let i = 0; i <= 12; i++) { const px = x + w * (0.22 + i * 0.047), py = y + h * (0.42 - (i % 3 === 1 ? 0.1 : i % 3 === 2 ? 0.03 : 0)); g.lineTo(px, py); } g.stroke();
    [0.3, 0.45, 0.6, 0.72].forEach(a => { g.beginPath(); g.moveTo(x + w * a, y + h * 0.42); g.lineTo(x + w * a, y + h * 0.27); g.stroke(); });
    g.lineWidth = h * 0.03; g.beginPath(); g.moveTo(x + w * 0.24, y + h * 0.62); g.lineTo(x + w * 0.74, y + h * 0.62); g.stroke(); g.lineWidth = h * 0.02; g.beginPath(); g.moveTo(x + w * 0.74, y + h * 0.58); g.lineTo(x + w * 0.74, y + h * 0.66); g.stroke();
    g.beginPath(); g.moveTo(x + w * 0.24, y + h * 0.62); g.quadraticCurveTo(x + w * 0.19, y + h * 0.6, x + w * 0.2, y + h * 0.55); g.stroke();
  },
  sg: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ef3340', '#ffffff']); const cx = x + w * 0.2, cy = y + h * 0.25; disc(g, cx, cy, h * 0.14, '#ffffff'); disc(g, cx + h * 0.05, cy, h * 0.13, '#ef3340');
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; star5(g, cx + h * 0.1 + Math.cos(a) * h * 0.065, cy + Math.sin(a) * h * 0.065, h * 0.025, 0, '#ffffff'); }
  },
  lk: (g, x, y, w, h) => {
    g.fillStyle = '#ffbe29'; g.fillRect(x, y, w, h); g.fillStyle = '#005f56'; g.fillRect(x + w * 0.04, y + h * 0.05, w * 0.13, h * 0.9); g.fillStyle = '#eb7400'; g.fillRect(x + w * 0.17, y + h * 0.05, w * 0.13, h * 0.9);
    g.fillStyle = '#8d153a'; g.fillRect(x + w * 0.34, y + h * 0.05, w * 0.62, h * 0.9);
    const cx = x + w * 0.65, cy = y + h * 0.52, s = h * 0.16; g.fillStyle = '#ffbe29';
    g.beginPath(); g.ellipse(cx, cy, s * 1.1, s * 0.5, 0, 0, 7); g.fill(); disc(g, cx - s * 0.9, cy - s * 0.5, s * 0.45, '#ffbe29');
    g.fillRect(cx - s * 0.9, cy, s * 0.25, s * 0.95); g.fillRect(cx + s * 0.6, cy, s * 0.25, s * 0.95); g.fillRect(cx - s * 0.4, cy - s * 1.4, s * 0.12, s * 0.9);
  },
  sy: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#007a3d', '#ffffff', '#16181c']); [0.3, 0.5, 0.7].forEach(a => star5(g, x + w * a, y + h / 2, h * 0.09, 0, '#ce1126')); },
  tj: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#cc0000', '#ffffff', '#006600'], [2, 3, 2]); const cx = x + w / 2, cy = y + h * 0.53;
    g.fillStyle = '#f8c300'; g.beginPath(); g.moveTo(cx - h * 0.08, cy + h * 0.04); g.lineTo(cx - h * 0.08, cy - h * 0.02); g.lineTo(cx - h * 0.04, cy + h * 0.01); g.lineTo(cx, cy - h * 0.05); g.lineTo(cx + h * 0.04, cy + h * 0.01); g.lineTo(cx + h * 0.08, cy - h * 0.02); g.lineTo(cx + h * 0.08, cy + h * 0.04); g.closePath(); g.fill();
    for (let i = 0; i < 7; i++) { const a = Math.PI + Math.PI * (i + 0.5) / 7; star5(g, cx + Math.cos(a) * h * 0.15, cy - h * 0.02 + Math.sin(a) * h * 0.12, h * 0.022, 0, '#f8c300'); }
  },
  tl: (g, x, y, w, h) => {
    g.fillStyle = '#dc241f'; g.fillRect(x, y, w, h); g.fillStyle = '#ffc726'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.5, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.fillStyle = '#16181c'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.33, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill(); star5(g, x + w * 0.11, y + h / 2, h * 0.09, -0.4, '#ffffff');
  },
  tm: (g, x, y, w, h) => {
    g.fillStyle = '#00843d'; g.fillRect(x, y, w, h); g.fillStyle = '#d22630'; g.fillRect(x + w * 0.12, y, w * 0.2, h);
    for (let i = 0; i < 5; i++) { const cx = x + w * 0.22, cy = y + h * (0.12 + i * 0.19), s = h * 0.06; g.fillStyle = '#f2a900'; g.beginPath(); g.moveTo(cx, cy - s); g.lineTo(cx + s * 1.3, cy); g.lineTo(cx, cy + s); g.lineTo(cx - s * 1.3, cy); g.closePath(); g.fill(); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(cx, cy - s * 0.5); g.lineTo(cx + s * 0.6, cy); g.lineTo(cx, cy + s * 0.5); g.lineTo(cx - s * 0.6, cy); g.closePath(); g.fill(); }
    const cx = x + w * 0.5, cy = y + h * 0.2; disc(g, cx, cy, h * 0.1, '#ffffff'); disc(g, cx + h * 0.035, cy, h * 0.085, '#00843d');
    [[0.58, 0.12], [0.62, 0.2], [0.58, 0.28], [0.66, 0.1], [0.66, 0.3]].forEach(([a, b]) => star5(g, x + w * a, y + h * b, h * 0.022, 0, '#ffffff'));
  },
  ae: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#00732f', '#ffffff', '#16181c']); g.fillStyle = '#ff0000'; g.fillRect(x, y, w * 0.26, h); },
  uz: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#0099b5', '#ce1126', '#ffffff', '#ce1126', '#1eb53a'], [10, 0.6, 9, 0.6, 10]);
    const cx = x + w * 0.16, cy = y + h * 0.16; disc(g, cx, cy, h * 0.1, '#ffffff'); disc(g, cx + h * 0.035, cy, h * 0.09, '#0099b5');
    [[0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [0, 1], [2, 2], [1, 2], [0, 2], [-0.5, 1]].slice(0, 9).forEach(([c, r]) => star5(g, x + w * (0.27 + c * 0.06), y + h * (0.08 + r * 0.07), h * 0.02, 0, '#ffffff'));
  },
  ye: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#ce1126', '#ffffff', '#16181c']),
  ps: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#16181c', '#ffffff', '#007a3d']); g.fillStyle = '#ce1126'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.42, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill(); },
  fj: (g, x, y, w, h) => {
    g.fillStyle = '#68bfe5'; g.fillRect(x, y, w, h); unionJack(g, x, y, w * 0.5, h * 0.5);
    const cx = x + w * 0.72, cy = y + h * 0.55, s = h * 0.17; g.fillStyle = '#ffffff'; g.strokeStyle = '#16181c'; g.lineWidth = h * 0.008;
    g.beginPath(); g.moveTo(cx - s, cy - s); g.lineTo(cx + s, cy - s); g.lineTo(cx + s, cy + s * 0.5); g.quadraticCurveTo(cx, cy + s * 1.3, cx - s, cy + s * 0.5); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ce1126'; g.fillRect(cx - s, cy - s, s * 2, s * 0.45); g.fillRect(cx - s * 0.1, cy - s * 0.55, s * 0.2, s * 1.6); g.fillRect(cx - s, cy - s * 0.05, s * 2, s * 0.2);
  },
  ki: (g, x, y, w, h) => {
    g.fillStyle = '#ce1126'; g.fillRect(x, y, w, h * 0.55); const cx = x + w / 2, cy = y + h * 0.55; sunRays(g, cx, cy, h * 0.14, 17, '#fcd116', 1.8); disc(g, cx, cy, h * 0.15, '#fcd116');
    for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#003f87'; g.fillRect(x, y + h * (0.55 + i * 0.075), w, h * 0.076); }
    g.fillStyle = '#fcd116'; g.beginPath(); g.moveTo(cx - h * 0.3, y + h * 0.2); g.quadraticCurveTo(cx - h * 0.1, y + h * 0.12, cx + h * 0.05, y + h * 0.22); g.quadraticCurveTo(cx + h * 0.15, y + h * 0.12, cx + h * 0.32, y + h * 0.16); g.lineTo(cx + h * 0.05, y + h * 0.3); g.closePath(); g.fill();
  },
  mh: (g, x, y, w, h) => {
    g.fillStyle = '#003893'; g.fillRect(x, y, w, h); g.save(); g.beginPath(); g.moveTo(x, y + h * 0.95); g.lineTo(x + w, y + h * 0.05); g.lineTo(x + w, y + h * 0.2); g.lineTo(x, y + h * 1.05); g.closePath(); g.fillStyle = '#dd7500'; g.fill();
    g.beginPath(); g.moveTo(x, y + h * 0.8); g.lineTo(x + w, y - h * 0.1); g.lineTo(x + w, y + h * 0.05); g.lineTo(x, y + h * 0.95); g.closePath(); g.fillStyle = '#ffffff'; g.fill(); g.restore();
    star5(g, x + w * 0.22, y + h * 0.26, h * 0.12, 0, '#ffffff', 24);
  },
  fm: (g, x, y, w, h) => { g.fillStyle = '#75b2dd'; g.fillRect(x, y, w, h); const cx = x + w / 2, cy = y + h / 2; [[0, -0.2], [0.2, 0], [0, 0.2], [-0.2, 0]].forEach(([a, b]) => star5(g, cx + a * h, cy + b * h, h * 0.075, 0, '#ffffff')); },
  nr: (g, x, y, w, h) => { g.fillStyle = '#002b7f'; g.fillRect(x, y, w, h); g.fillStyle = '#ffc61e'; g.fillRect(x, y + h * 0.46, w, h * 0.08); star5(g, x + w * 0.3, y + h * 0.72, h * 0.1, 0, '#ffffff', 12); },
  pw: (g, x, y, w, h) => { g.fillStyle = '#4aadd6'; g.fillRect(x, y, w, h); disc(g, x + w * 0.45, y + h / 2, h * 0.28, '#ffde00'); },
  pg: (g, x, y, w, h) => {
    g.fillStyle = '#16181c'; g.fillRect(x, y, w, h); g.fillStyle = '#d40000'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y); g.lineTo(x + w, y + h); g.closePath(); g.fill();
    [[0.22, 0.55, 0.06], [0.3, 0.7, 0.06], [0.14, 0.72, 0.05], [0.22, 0.85, 0.07], [0.26, 0.76, 0.03]].forEach(([a, b, r]) => star5(g, x + w * a, y + h * b, h * r, 0, '#ffffff'));
    const cx = x + w * 0.68, cy = y + h * 0.3; g.fillStyle = '#fcd116'; g.beginPath(); g.ellipse(cx, cy, h * 0.1, h * 0.05, -0.4, 0, 7); g.fill(); disc(g, cx + h * 0.1, cy - h * 0.06, h * 0.03, '#fcd116');
    g.strokeStyle = '#fcd116'; g.lineWidth = h * 0.02; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx - h * 0.08, cy + h * 0.02); g.bezierCurveTo(cx - h * 0.2, cy + h * 0.1, cx - h * 0.1, cy + h * 0.22, cx - h * 0.22, cy + h * 0.25); g.stroke();
    g.beginPath(); g.moveTo(cx - h * 0.02, cy - h * 0.03); g.quadraticCurveTo(cx + h * 0.02, cy - h * 0.16, cx - h * 0.1, cy - h * 0.18); g.stroke();
  },
  ws: (g, x, y, w, h) => {
    g.fillStyle = '#ce1126'; g.fillRect(x, y, w, h); g.fillStyle = '#002b7f'; g.fillRect(x, y, w * 0.5, h * 0.5);
    [[0.25, 0.1, 0.05], [0.37, 0.22, 0.05], [0.25, 0.4, 0.06], [0.12, 0.24, 0.05], [0.3, 0.3, 0.03]].forEach(([a, b, r]) => star5(g, x + w * a, y + h * b, h * r, 0, '#ffffff'));
  },
  sb: (g, x, y, w, h) => {
    g.fillStyle = '#215b33'; g.fillRect(x, y, w, h); g.fillStyle = '#0051ba'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.strokeStyle = '#fcd116'; g.lineWidth = h * 0.08; g.beginPath(); g.moveTo(x, y + h); g.lineTo(x + w, y); g.stroke();
    [[0.12, 0.1], [0.32, 0.1], [0.22, 0.2], [0.12, 0.3], [0.32, 0.3]].forEach(([a, b]) => star5(g, x + w * a, y + h * b, h * 0.045, 0, '#ffffff'));
  },
  to: (g, x, y, w, h) => { g.fillStyle = '#c10000'; g.fillRect(x, y, w, h); g.fillStyle = '#ffffff'; g.fillRect(x, y, w * 0.45, h * 0.5); g.fillStyle = '#c10000'; g.fillRect(x + w * 0.19, y + h * 0.08, w * 0.07, h * 0.34); g.fillRect(x + w * 0.1, y + h * 0.215, w * 0.25, h * 0.07); },
  tv: (g, x, y, w, h) => {
    g.fillStyle = '#009fca'; g.fillRect(x, y, w, h); unionJack(g, x, y, w * 0.5, h * 0.5);
    [[0.58, 0.82], [0.62, 0.62], [0.72, 0.74], [0.7, 0.46], [0.82, 0.58], [0.8, 0.3], [0.9, 0.42], [0.9, 0.16], [0.6, 0.38]].forEach(([a, b]) => star5(g, x + w * a, y + h * b, h * 0.04, 0, '#ffce00'));
  },
  vu: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#d21034', '#009543']); const Y = (lw, col) => { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.moveTo(x - 2, y - 2); g.lineTo(x + w * 0.42, y + h / 2); g.lineTo(x - 2, y + h + 2); g.moveTo(x + w * 0.42, y + h / 2); g.lineTo(x + w + 2, y + h / 2); g.stroke(); };
    Y(h * 0.14, '#16181c'); Y(h * 0.08, '#fdce12');
    g.fillStyle = '#16181c'; g.beginPath(); g.moveTo(x, y + h * 0.1); g.lineTo(x + w * 0.33, y + h / 2); g.lineTo(x, y + h * 0.9); g.closePath(); g.fill();
    g.strokeStyle = '#fdce12'; g.lineWidth = h * 0.025; g.beginPath(); g.arc(x + w * 0.12, y + h / 2, h * 0.08, -Math.PI * 0.4, Math.PI * 1.3); g.stroke();
  },
  // ---------- Америка (добавлены) ----------
  ag: (g, x, y, w, h) => {
    g.fillStyle = '#ce1126'; g.fillRect(x, y, w, h); g.save(); g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y); g.lineTo(x + w / 2, y + h); g.closePath(); g.clip();
    hStr(g, x, y, w, h, ['#16181c', '#0072c6', '#ffffff'], [3.6, 2.2, 3.2]); sunRays(g, x + w / 2, y + h * 0.36, h * 0.09, 16, '#fcd116', 1.9); g.fillStyle = '#fcd116'; g.fillRect(x, y + h * 0.36, w, h * 0.04); g.restore();
  },
  bs: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#00abc9', '#fae042', '#00abc9']); g.fillStyle = '#16181c'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.45, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill(); },
  bb: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#00267f', '#ffc726', '#00267f']); const cx = x + w / 2, s = h * 0.2; g.strokeStyle = '#16181c'; g.lineWidth = h * 0.035; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx, y + h * 0.78); g.lineTo(cx, y + h * 0.28); g.moveTo(cx - s, y + h * 0.3); g.quadraticCurveTo(cx - s, y + h * 0.52, cx, y + h * 0.54); g.quadraticCurveTo(cx + s, y + h * 0.52, cx + s, y + h * 0.3); g.stroke();
  },
  bz: (g, x, y, w, h) => {
    g.fillStyle = '#ce1126'; g.fillRect(x, y, w, h); g.fillStyle = '#003f87'; g.fillRect(x, y + h * 0.1, w, h * 0.8);
    disc(g, x + w / 2, y + h / 2, h * 0.27, '#ffffff'); g.strokeStyle = '#2e7d32'; g.lineWidth = h * 0.03; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.23, 0, 7); g.stroke();
    g.fillStyle = '#8b5a2b'; g.fillRect(x + w / 2 - h * 0.06, y + h * 0.42, h * 0.12, h * 0.14);
  },
  cr: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#002b7f', '#ffffff', '#ce1126', '#ffffff', '#002b7f'], [1, 1, 2, 1, 1]),
  dm: (g, x, y, w, h) => {
    g.fillStyle = '#006b3f'; g.fillRect(x, y, w, h); const cx = x + w / 2, cy = y + h / 2, t = h * 0.06;
    [['#fcd116', -1], ['#16181c', 0], ['#ffffff', 1]].forEach(([c, i]) => { g.fillStyle = c; g.fillRect(cx - t * 1.5 + (i + 1) * t, y, t, h); g.fillRect(x, cy - t * 1.5 + (i + 1) * t, w, t); });
    disc(g, cx, cy, h * 0.2, '#d41c30'); for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; star5(g, cx + Math.cos(a) * h * 0.15, cy + Math.sin(a) * h * 0.15, h * 0.025, 0, '#3cb043'); }
    g.fillStyle = '#7b3f99'; g.beginPath(); g.ellipse(cx, cy, h * 0.05, h * 0.08, 0.3, 0, 7); g.fill();
  },
  do: (g, x, y, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h); const t = h * 0.12, cx = x + w / 2, cy = y + h / 2;
    g.fillStyle = '#002d62'; g.fillRect(x, y, w / 2 - t / 2, h / 2 - t / 2); g.fillRect(x + w / 2 + t / 2, y + h / 2 + t / 2, w / 2, h / 2);
    g.fillStyle = '#ce1126'; g.fillRect(x + w / 2 + t / 2, y, w / 2, h / 2 - t / 2); g.fillRect(x, y + h / 2 + t / 2, w / 2 - t / 2, h / 2);
    g.fillStyle = '#2e7d32'; g.beginPath(); g.arc(cx, cy, h * 0.08, 0.2, Math.PI - 0.2); g.lineTo(cx, cy - h * 0.05); g.closePath(); g.fill();
  },
  sv: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#0f47af', '#ffffff', '#0f47af']); const cx = x + w / 2, cy = y + h / 2; g.strokeStyle = '#d4af37'; g.lineWidth = h * 0.02; g.beginPath(); g.arc(cx, cy, h * 0.12, 0, 7); g.stroke();
    g.fillStyle = '#2e7d32'; g.beginPath(); g.moveTo(cx - h * 0.08, cy + h * 0.06); g.lineTo(cx, cy - h * 0.07); g.lineTo(cx + h * 0.08, cy + h * 0.06); g.closePath(); g.fill();
  },
  gd: (g, x, y, w, h) => {
    g.fillStyle = '#ce1126'; g.fillRect(x, y, w, h); const x0 = x + w * 0.1, y0 = y + h * 0.13, w0 = w * 0.8, h0 = h * 0.74;
    g.fillStyle = '#fcd116'; g.fillRect(x0, y0, w0, h0); g.fillStyle = '#007a5e'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + w0 / 2, y0 + h0 / 2); g.lineTo(x0, y0 + h0); g.closePath(); g.fill(); g.beginPath(); g.moveTo(x0 + w0, y0); g.lineTo(x0 + w0 / 2, y0 + h0 / 2); g.lineTo(x0 + w0, y0 + h0); g.closePath(); g.fill();
    disc(g, x + w / 2, y + h / 2, h * 0.1, '#ce1126'); star5(g, x + w / 2, y + h / 2, h * 0.07, 0, '#fcd116');
    [0.25, 0.5, 0.75].forEach(a => { star5(g, x + w * a, y + h * 0.065, h * 0.04, 0, '#fcd116'); star5(g, x + w * a, y + h * 0.935, h * 0.04, 0, '#fcd116'); });
    g.fillStyle = '#c47a3a'; g.beginPath(); g.ellipse(x0 + w0 * 0.14, y0 + h0 / 2, h * 0.03, h * 0.045, 0.4, 0, 7); g.fill();
  },
  gt: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#4997d0', '#ffffff', '#4997d0']); const cx = x + w / 2, cy = y + h / 2; g.strokeStyle = '#2e7d32'; g.lineWidth = h * 0.02; g.beginPath(); g.arc(cx, cy + h * 0.02, h * 0.12, Math.PI * 0.1, Math.PI * 0.9); g.stroke();
    g.fillStyle = '#efe6c8'; g.fillRect(cx - h * 0.07, cy - h * 0.06, h * 0.14, h * 0.1); g.fillStyle = '#1a8f5a'; g.beginPath(); g.ellipse(cx, cy - h * 0.1, h * 0.04, h * 0.025, 0, 0, 7); g.fill();
  },
  ht: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#00209f', '#d21034']); g.fillStyle = '#ffffff'; g.fillRect(x + w * 0.35, y + h * 0.35, w * 0.3, h * 0.3);
    g.fillStyle = '#2e7d32'; g.beginPath(); g.moveTo(x + w / 2, y + h * 0.38); g.lineTo(x + w * 0.56, y + h * 0.58); g.lineTo(x + w * 0.44, y + h * 0.58); g.closePath(); g.fill(); g.fillStyle = '#8b5a2b'; g.fillRect(x + w / 2 - h * 0.01, y + h * 0.5, h * 0.02, h * 0.1);
  },
  hn: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#0073cf', '#ffffff', '#0073cf']); const cx = x + w / 2, cy = y + h / 2; [[0, 0], [-0.12, -0.05], [0.12, -0.05], [-0.12, 0.05], [0.12, 0.05]].forEach(([a, b]) => star5(g, cx + a * h, cy + b * h, h * 0.035, 0, '#0073cf')); },
  ni: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#0067c6', '#ffffff', '#0067c6']); const cx = x + w / 2, cy = y + h / 2; g.strokeStyle = '#c9a000'; g.lineWidth = h * 0.012; g.beginPath(); g.arc(cx, cy, h * 0.12, 0, 7); g.stroke();
    g.fillStyle = '#0067c6'; g.beginPath(); g.moveTo(cx, cy - h * 0.08); g.lineTo(cx + h * 0.08, cy + h * 0.06); g.lineTo(cx - h * 0.08, cy + h * 0.06); g.closePath(); g.fill(); g.fillStyle = '#2e7d32'; g.fillRect(cx - h * 0.06, cy + h * 0.02, h * 0.12, h * 0.03);
  },
  pa: (g, x, y, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w, h); g.fillStyle = '#da121a'; g.fillRect(x + w / 2, y, w / 2, h / 2); g.fillStyle = '#072357'; g.fillRect(x, y + h / 2, w / 2, h / 2);
    star5(g, x + w * 0.25, y + h * 0.25, h * 0.09, 0, '#072357'); star5(g, x + w * 0.75, y + h * 0.75, h * 0.09, 0, '#da121a');
  },
  kn: (g, x, y, w, h) => {
    g.fillStyle = '#009e49'; g.fillRect(x, y, w, h); g.fillStyle = '#ce1126'; g.beginPath(); g.moveTo(x + w, y); g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.strokeStyle = '#fcd116'; g.lineWidth = h * 0.3; g.beginPath(); g.moveTo(x - 4, y + h + 4); g.lineTo(x + w + 4, y - 4); g.stroke(); g.strokeStyle = '#16181c'; g.lineWidth = h * 0.2; g.stroke();
    star5(g, x + w * 0.38, y + h * 0.6, h * 0.06, 0.3, '#ffffff'); star5(g, x + w * 0.62, y + h * 0.4, h * 0.06, 0.3, '#ffffff');
  },
  lc: (g, x, y, w, h) => {
    g.fillStyle = '#66ccff'; g.fillRect(x, y, w, h); const cx = x + w / 2;
    g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(cx, y + h * 0.2); g.lineTo(cx + h * 0.2, y + h * 0.8); g.lineTo(cx - h * 0.2, y + h * 0.8); g.closePath(); g.fill();
    g.fillStyle = '#16181c'; g.beginPath(); g.moveTo(cx, y + h * 0.25); g.lineTo(cx + h * 0.16, y + h * 0.8); g.lineTo(cx - h * 0.16, y + h * 0.8); g.closePath(); g.fill();
    g.fillStyle = '#fcd116'; g.beginPath(); g.moveTo(cx, y + h * 0.5); g.lineTo(cx + h * 0.2, y + h * 0.8); g.lineTo(cx - h * 0.2, y + h * 0.8); g.closePath(); g.fill();
  },
  vc: (g, x, y, w, h) => {
    vStr(g, x, y, w, h, ['#0072c6', '#fcd116', '#009e60'], [1, 2, 1]); const cx = x + w / 2, cy = y + h / 2, d = h * 0.07;
    const dia = (px, py) => { g.fillStyle = '#009e60'; g.beginPath(); g.moveTo(px, py - d); g.lineTo(px + d * 0.7, py); g.lineTo(px, py + d); g.lineTo(px - d * 0.7, py); g.closePath(); g.fill(); };
    dia(cx - h * 0.1, cy - h * 0.06); dia(cx + h * 0.1, cy - h * 0.06); dia(cx, cy + h * 0.1);
  },
  tt: (g, x, y, w, h) => { g.fillStyle = '#da1a35'; g.fillRect(x, y, w, h); g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.3; g.beginPath(); g.moveTo(x - 4, y - 4); g.lineTo(x + w + 4, y + h + 4); g.stroke(); g.strokeStyle = '#16181c'; g.lineWidth = h * 0.22; g.stroke(); },
  bo: (g, x, y, w, h) => hStr(g, x, y, w, h, ['#d52b1e', '#f9e300', '#007934']),
  ec: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#ffd100', '#034ea2', '#ef3340'], [2, 1, 1]); const cx = x + w / 2, cy = y + h * 0.48;
    g.fillStyle = '#5ab0e0'; g.beginPath(); g.ellipse(cx, cy, h * 0.08, h * 0.11, 0, 0, 7); g.fill(); g.strokeStyle = '#c9a000'; g.lineWidth = h * 0.012; g.stroke();
    g.fillStyle = '#5c3a1e'; g.beginPath(); g.moveTo(cx - h * 0.16, cy - h * 0.14); g.quadraticCurveTo(cx, cy - h * 0.2, cx + h * 0.16, cy - h * 0.14); g.lineTo(cx, cy - h * 0.1); g.closePath(); g.fill();
  },
  gy: (g, x, y, w, h) => {
    g.fillStyle = '#009e49'; g.fillRect(x, y, w, h); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.fillStyle = '#fcd116'; g.beginPath(); g.moveTo(x, y + h * 0.04); g.lineTo(x + w * 0.94, y + h / 2); g.lineTo(x, y + h * 0.96); g.closePath(); g.fill();
    g.fillStyle = '#16181c'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.5, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.fillStyle = '#ce1126'; g.beginPath(); g.moveTo(x, y + h * 0.05); g.lineTo(x + w * 0.44, y + h / 2); g.lineTo(x, y + h * 0.95); g.closePath(); g.fill();
  },
  py: (g, x, y, w, h) => {
    hStr(g, x, y, w, h, ['#d52b1e', '#ffffff', '#0038a8']); const cx = x + w / 2, cy = y + h / 2; g.strokeStyle = '#16181c'; g.lineWidth = h * 0.012; g.beginPath(); g.arc(cx, cy, h * 0.1, 0, 7); g.stroke();
    g.strokeStyle = '#2e7d32'; g.lineWidth = h * 0.016; g.beginPath(); g.arc(cx, cy, h * 0.075, Math.PI * 0.1, Math.PI * 0.9); g.stroke(); star5(g, cx, cy - h * 0.01, h * 0.035, 0, '#fcd116');
  },
  pe: (g, x, y, w, h) => vStr(g, x, y, w, h, ['#d91023', '#ffffff', '#d91023']),
  sr: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#377e3f', '#ffffff', '#b40a2d', '#ffffff', '#377e3f'], [2, 1, 4, 1, 2]); star5(g, x + w / 2, y + h / 2, h * 0.16, 0, '#ecc81d'); },
  uy: (g, x, y, w, h) => {
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#0081c6' : '#ffffff'; g.fillRect(x, y + h * i / 9, w, h / 9 + 0.6); }
    g.fillStyle = '#ffffff'; g.fillRect(x, y, w * 0.4, h * 5 / 9); const cx = x + w * 0.2, cy = y + h * 0.27; sunRays(g, cx, cy, h * 0.08, 16, '#fcd116', 1.7); disc(g, cx, cy, h * 0.085, '#fcd116');
  },
  ve: (g, x, y, w, h) => { hStr(g, x, y, w, h, ['#ffcc00', '#00247d', '#cf142b']); for (let i = 0; i < 8; i++) { const a = Math.PI * (1.15 + i * 0.7 / 7); star5(g, x + w / 2 + Math.cos(a) * h * 0.2, y + h * 0.62 + Math.sin(a) * h * 0.2, h * 0.025, 0, '#ffffff'); } },
  atl: (g, x, y, w, h) => {
    const gr = g.createLinearGradient(x, y, x, y + h); gr.addColorStop(0, '#2a8fd6'); gr.addColorStop(1, '#0b2f63'); g.fillStyle = gr; g.fillRect(x, y, w, h);
    g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = h * 0.03; for (let i = 0; i < 3; i++) { const yy = y + h * (0.62 + i * 0.12); g.beginPath(); for (let k = 0; k <= 16; k++) { const xx = x + w * k / 16; const v = yy + Math.sin(k * 1.3 + i) * h * 0.025; k ? g.lineTo(xx, v) : g.moveTo(xx, v); } g.stroke(); }
    const cx = x + w / 2; g.strokeStyle = '#f5c542'; g.lineWidth = h * 0.045; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, y + h * 0.7); g.lineTo(cx, y + h * 0.18); g.moveTo(cx - w * 0.16, y + h * 0.2); g.lineTo(cx - w * 0.16, y + h * 0.36); g.quadraticCurveTo(cx - w * 0.16, y + h * 0.46, cx, y + h * 0.46); g.quadraticCurveTo(cx + w * 0.16, y + h * 0.46, cx + w * 0.16, y + h * 0.36); g.lineTo(cx + w * 0.16, y + h * 0.2); g.stroke(); g.lineCap = 'butt';
  },
  pan: (g, x, y, w, h) => {
    g.fillStyle = '#2d7fb8'; g.fillRect(x, y, w, h);
    g.fillStyle = '#6b8e23'; g.beginPath(); const P = [[0.18, 0.3], [0.38, 0.12], [0.62, 0.16], [0.84, 0.32], [0.8, 0.52], [0.66, 0.6], [0.6, 0.86], [0.42, 0.9], [0.36, 0.66], [0.2, 0.58]]; P.forEach(([a, b], i) => i ? g.lineTo(x + w * a, y + h * b) : g.moveTo(x + w * a, y + h * b)); g.closePath(); g.fill();
    g.fillStyle = '#9b6b2f'; g.beginPath(); g.ellipse(x + w * 0.52, y + h * 0.38, w * 0.16, h * 0.12, 0.3, 0, 7); g.fill(); g.beginPath(); g.ellipse(x + w * 0.46, y + h * 0.72, w * 0.07, h * 0.1, 0, 0, 7); g.fill();
  },
};
const FLAG_DEF = new Map();
// флаг своего бойца: { kind: 'h'|'v', colors: [...], emblem: 'none'|'disc'|'star'|'cross'|'crescent', ecolor }
function flagFromSpec(sp) {
  sp = sp || {}; const cols = (Array.isArray(sp.colors) && sp.colors.length ? sp.colors : ['#5b62e6', '#ffffff']).slice(0, 4);
  return (g, x, y, w, h) => {
    (sp.kind === 'v' ? vStr : hStr)(g, x, y, w, h, cols);
    const cx = x + w / 2, cy = y + h / 2, ec = sp.ecolor || '#ffffff';
    if (sp.emblem === 'disc') disc(g, cx, cy, h * 0.22, ec);
    else if (sp.emblem === 'star') star5(g, cx, cy, h * 0.24, 0, ec);
    else if (sp.emblem === 'cross') { g.fillStyle = ec; g.fillRect(x, cy - h * 0.09, w, h * 0.18); g.fillRect(x + w * 0.36, y, h * 0.18, h); }
    else if (sp.emblem === 'crescent') { disc(g, cx - h * 0.04, cy, h * 0.22, ec); disc(g, cx + h * 0.04, cy, h * 0.18, cols[Math.floor(cols.length / 2)]); }
  };
}
const isFlag = spec => typeof spec === 'string' && (FLAGS[spec] || FLAG_DEF.has(spec) || /:/.test(spec));
const FTEX = new Map();
function flagTex(code) {
  let c = FTEX.get(code); if (c) return c;
  c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  const fn = FLAGS[code] || FLAG_DEF.get(code); if (fn) fn(g, 0, 0, 256, 256); else { g.fillStyle = '#9aa3ad'; g.fillRect(0, 0, 256, 256); }
  FTEX.set(code, c); return c;
}
// рисует шар-страну в текущем ctx
function drawBall(x, y, r, spec, P, o) {
  o = o || {};
  const parts = String(spec).split(':'), code = parts[0], kind = parts[1] || '';
  if (kind === 'slice') { drawSlice(x, y, r, o); return; }
  if (kind === 'box') { drawBox(x, y, r, o); return; }
  if (kind === 'brick') { drawBrick(x, y, r, o); return; }
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1;
  if (P.style === 'neon' && o.color) { ctx.shadowColor = o.color; ctx.shadowBlur = r * 0.6; disc(ctx, x, y, r, '#000'); ctx.shadowBlur = 0; }
  else if (!o.noShadow) { ctx.fillStyle = 'rgba(0,0,0,0.16)'; ctx.beginPath(); ctx.ellipse(x + r * 0.06, y + r * 0.92, r * 0.8, r * 0.18, 0, 0, 7); ctx.fill(); }
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
  ctx.drawImage(flagTex(code), x - r, y - r, r * 2, r * 2);
  if (kind === 'rock') { ctx.strokeStyle = 'rgba(40,25,10,.7)'; ctx.lineWidth = Math.max(1.5, r * 0.08); ctx.beginPath(); ctx.moveTo(x - r * 0.6, y - r * 0.2); ctx.lineTo(x - r * 0.1, y + r * 0.1); ctx.lineTo(x + r * 0.2, y - r * 0.3); ctx.lineTo(x + r * 0.7, y + r * 0.2); ctx.stroke(); }
  const sh = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r * 1.05);
  sh.addColorStop(0, 'rgba(255,255,255,0.28)'); sh.addColorStop(0.5, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.28)');
  ctx.fillStyle = sh; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  if (o.flash) { ctx.fillStyle = `rgba(255,255,255,${Math.min(0.85, o.flash * 4)})`; ctx.fillRect(x - r, y - r, r * 2, r * 2); }
  ctx.restore();
  ctx.lineWidth = o.lw || Math.max(2, r * 0.07); ctx.strokeStyle = P.dark ? '#f2f4f7' : '#16181c';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke();
  if (!o.noEyes && r > 7) {
    const dx = (o.look || 0) * r * 0.12, ey = y - r * 0.12, ex = r * 0.3, sq = o.squint ? 0.45 : 1;
    [-1, 1].forEach(s => { ctx.beginPath(); ctx.ellipse(x + s * ex + dx, ey, r * 0.17, r * 0.22 * sq, 0, 0, 7); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = Math.max(1.5, r * 0.05); ctx.strokeStyle = '#16181c'; ctx.stroke(); });
  }
  if (!o.noCrown && r > 9 && typeof awardOf === 'function') { const aw = awardOf(code); if (aw) drawCrown(x, y, r, aw); }
  if (o.cross) { ctx.strokeStyle = P.muted; ctx.lineWidth = Math.max(3, r * 0.1); ctx.beginPath(); ctx.moveTo(x - r * 0.8, y - r * 0.8); ctx.lineTo(x + r * 0.8, y + r * 0.8); ctx.stroke(); }
  ctx.restore();
}
function drawBox(x, y, r, o) {
  ctx.save(); ctx.globalAlpha = o.alpha ?? 1; ctx.translate(x, y);
  ctx.fillStyle = '#c99a5b'; ctx.strokeStyle = '#16181c'; ctx.lineWidth = Math.max(2, r * 0.08);
  ctx.beginPath(); ctx.rect(-r * 0.85, -r * 0.6, r * 1.7, r * 1.2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#006aa7'; ctx.fillRect(-r * 0.85, -r * 0.15, r * 1.7, r * 0.3); ctx.fillStyle = '#fecc00'; ctx.fillRect(-r * 0.85, -r * 0.06, r * 1.7, r * 0.12);
  if (o.flash) { ctx.fillStyle = `rgba(255,255,255,${Math.min(0.85, o.flash * 4)})`; ctx.fillRect(-r * 0.85, -r * 0.6, r * 1.7, r * 1.2); }
  ctx.restore();
}
function drawBrick(x, y, r, o) {
  ctx.save(); ctx.globalAlpha = o.alpha ?? 1; ctx.translate(x, y); const c = '#e3000b';
  ctx.fillStyle = c; ctx.strokeStyle = '#16181c'; ctx.lineWidth = Math.max(2, r * 0.08);
  ctx.beginPath(); ctx.rect(-r * 0.9, -r * 0.35, r * 1.8, r * 0.9); ctx.fill(); ctx.stroke();
  [-0.45, 0.45].forEach(d => { ctx.beginPath(); ctx.rect(d * r - r * 0.25, -r * 0.62, r * 0.5, r * 0.27); ctx.fill(); ctx.stroke(); });
  if (o.flash) { ctx.fillStyle = `rgba(255,255,255,${Math.min(0.85, o.flash * 4)})`; ctx.fillRect(-r * 0.9, -r * 0.62, r * 1.8, r * 1.2); }
  ctx.restore();
}
function drawSlice(x, y, r, o) {
  ctx.save(); ctx.globalAlpha = o.alpha ?? 1; ctx.translate(x, y); ctx.rotate(Math.PI);
  ctx.beginPath(); ctx.moveTo(0, r * 1.0); ctx.lineTo(-r * 0.95, -r * 0.6); ctx.quadraticCurveTo(0, -r * 1.05, r * 0.95, -r * 0.6); ctx.closePath();
  ctx.fillStyle = '#ffcf4a'; ctx.fill(); ctx.lineWidth = Math.max(2, r * 0.08); ctx.strokeStyle = '#16181c'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-r * 0.95, -r * 0.6); ctx.quadraticCurveTo(0, -r * 1.05, r * 0.95, -r * 0.6); ctx.lineWidth = r * 0.28; ctx.strokeStyle = '#c9832e'; ctx.stroke();
  [[-0.3, -0.25], [0.32, -0.3], [0.02, 0.25]].forEach(([a, b]) => disc(ctx, a * r, b * r, r * 0.17, '#d23a2a'));
  if (o.flash) { ctx.fillStyle = `rgba(255,255,255,${Math.min(0.85, o.flash * 4)})`; ctx.fill(); }
  ctx.restore();
}
const FURL = new Map();
function flagURL(spec, px) {
  const key = spec + '|' + (px || 64); let u = FURL.get(key); if (u) return u;
  const c = document.createElement('canvas'), s = px || 64; c.width = c.height = s;
  const keep = ctx; ctx = c.getContext('2d'); try { drawBall(s / 2, s / 2, s / 2 - 2, spec, PAL.light, { noShadow: true, noCrown: true, lw: Math.max(1.5, s * 0.035) }); } finally { ctx = keep; }
  u = c.toDataURL('image/png'); FURL.set(key, u); return u;
}
