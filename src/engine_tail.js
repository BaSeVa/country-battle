// ---- боссы ----
const BOSSES = [
  { id: 'atl', boss: true, label: 'atl', name: 'Атлантида', nameEn: 'Atlantis', color: '#1f6fb2', hp: 330, speed: 1.6, r: 0.85, minDmg: 4,
    attacks: [{ type: 'ring', radius: 3.4, dmg: 11, cd: 1.7 }, { type: 'dash', dmg: 12, cd: 1.2 }, { type: 'wave', expr: 'sin(x)', amp: 1.3, freq: 1.0, dmg: 10, cd: 1.5 }], onDerive: 'hit',
    desc: 'Затонувший континент с огромным запасом HP. Волнорез: удары слабее 4 не действуют. Чередует водоворот, таран и цунами, на половине HP переходит во вторую фазу и ускоряется.',
    descEn: 'A sunken continent with a huge HP pool. Hits weaker than 4 do nothing.' },
  { id: 'pan', boss: true, label: 'pan', name: 'Пангея', nameEn: 'Pangaea', color: '#7a5a2b', hp: 400, speed: 1.9, r: 0.85,
    attacks: [{ type: 'wave', dmg: 12, cd: 1.5, amp: 1.4, freq: 1.2, expr: 'sin(x)' }, { type: 'summon', dmg: 11, cd: 1.3 }, { type: 'graph', expr: 'x', dmg: 12, cd: 1.4 }],
    terms: [{ label: 'pan:rock', dmg: 8 }, { label: 'pan:rock', dmg: 7 }, { label: 'pan:rock', dmg: 6 }], onDerive: 'hit',
    desc: 'Древний сверхматерик. Откалывает от себя острова-помощников, пускает землетрясения и разломы. На половине HP переходит во вторую фазу.',
    descEn: 'The ancient supercontinent. Breaks off island minions, sends quakes and rifts.' },
];

// ---- союзы в командах ----
const COMBOS = [
  { ids: ['ee', 'lv', 'lt'], name: { ru: 'Балтийский путь', en: 'Baltic Way' }, desc: { ru: 'перезарядки всех троих быстрее на 15 %', en: 'all three recharge 15% faster' }, mod: { ee: { cdMul: 0.85 }, lv: { cdMul: 0.85 }, lt: { cdMul: 0.85 } } },
  { ids: ['be', 'nl'], name: { ru: 'Бенилюкс', en: 'Benelux' }, desc: { ru: '+15 HP обоим', en: '+15 HP each' }, mod: { be: { hpAdd: 15 }, nl: { hpAdd: 15 } } },
  { ids: ['fj', 'ws'], name: { ru: 'Тихоокеанское регби', en: 'Pacific rugby' }, desc: { ru: 'урон обоих +15 %', en: '+15% damage each' }, mod: { fj: { dmgMul: 1.15 }, ws: { dmgMul: 1.15 } } },
  { ids: ['uz', 'kz'], name: { ru: 'Шёлковый путь', en: 'Silk Road' }, desc: { ru: 'перезарядки обоих быстрее на 12 %', en: 'both recharge 12% faster' }, mod: { uz: { cdMul: 0.88 }, kz: { cdMul: 0.88 } } },
  { ids: ['cz', 'sk'], name: { ru: 'Чехословакия', en: 'Czechoslovakia' }, desc: { ru: '+15 HP обоим', en: '+15 HP each' }, mod: { cz: { hpAdd: 15 }, sk: { hpAdd: 15 } } },
  { ids: ['ru', 'kz'], name: { ru: 'Байконур', en: 'Baikonur' }, desc: { ru: 'обе перезарядки быстрее на 15 %', en: 'both recharge 15% faster' }, mod: { ru: { cdMul: 0.85 }, kz: { cdMul: 0.85 } } },
  { ids: ['us', 'ca'], name: { ru: 'Самая длинная граница', en: 'Longest border' }, desc: { ru: '+20 HP обоим', en: '+20 HP each' }, mod: { us: { hpAdd: 20 }, ca: { hpAdd: 20 } } },
  { ids: ['fr', 'de'], name: { ru: 'Евротандем', en: 'Euro tandem' }, desc: { ru: 'обе перезарядки быстрее на 10 %', en: 'both recharge 10% faster' }, mod: { fr: { cdMul: 0.9 }, de: { cdMul: 0.9 } } },
  { ids: ['es', 'mx'], name: { ru: 'Один язык', en: 'Same language' }, desc: { ru: 'урон обоих +15 %', en: '+15% damage each' }, mod: { es: { dmgMul: 1.15 }, mx: { dmgMul: 1.15 } } },
  { ids: ['es', 'ar'], name: { ru: 'Фламенко и танго', en: 'Flamenco & tango' }, desc: { ru: '+12 HP обоим', en: '+12 HP each' }, mod: { es: { hpAdd: 12 }, ar: { hpAdd: 12 } } },
  { ids: ['it', 'gr'], name: { ru: 'Античность', en: 'Antiquity' }, desc: { ru: 'урон обоих +15 %', en: '+15% damage each' }, mod: { it: { dmgMul: 1.15 }, gr: { dmgMul: 1.15 } } },
  { ids: ['gb', 'au'], name: { ru: 'Содружество', en: 'Commonwealth' }, desc: { ru: '+15 HP обоим', en: '+15 HP each' }, mod: { gb: { hpAdd: 15 }, au: { hpAdd: 15 } } },
  { ids: ['gb', 'ca'], name: { ru: 'Содружество', en: 'Commonwealth' }, desc: { ru: '+15 HP обоим', en: '+15 HP each' }, mod: { gb: { hpAdd: 15 }, ca: { hpAdd: 15 } } },
  { ids: ['eg', 'gr'], name: { ru: 'Древние цивилизации', en: 'Ancient civilizations' }, desc: { ru: 'обе перезарядки быстрее на 10 %', en: 'both recharge 10% faster' }, mod: { eg: { cdMul: 0.9 }, gr: { cdMul: 0.9 } } },
  { ids: ['br', 'pt'], name: { ru: 'Португальский язык', en: 'Portuguese-speaking' }, desc: { ru: '+15 HP обоим', en: '+15 HP each' }, mod: { br: { hpAdd: 15 }, pt: { hpAdd: 15 } } },
  { ids: ['br', 'ar'], name: { ru: 'Футбольное дерби', en: 'Football derby' }, desc: { ru: 'урон обоих +10 %', en: '+10% damage each' }, mod: { br: { dmgMul: 1.1 }, ar: { dmgMul: 1.1 } } },
  { ids: ['nl', 'de'], name: { ru: 'Соседи', en: 'Neighbours' }, desc: { ru: '+10 HP обоим', en: '+10 HP each' }, mod: { nl: { hpAdd: 10 }, de: { hpAdd: 10 } } },
  { ids: ['jp', 'kr'], name: { ru: 'Восточный экспресс', en: 'Eastern express' }, desc: { ru: 'обе перезарядки быстрее на 10 %', en: 'both recharge 10% faster' }, mod: { jp: { cdMul: 0.9 }, kr: { cdMul: 0.9 } } },
];

// ---- строки для кадра ----
const STR = {
  ru: { immune: 'неуязвим!', graph: 'удар!', wave: 'волна!', ring: 'круг!', blade: 'рывок!', phaseTo: p => 'такт ' + p, reflect: p => 'такт ' + p + ': отражение!',
    regen: h => 'передышка: +' + h, burning: 'горит!', armor: 'стена держит', shift: l => '→ ' + l, morph: l => '→ ' + l,
    immD: 'неуязвим!', immI: 'неуязвим!', cancel: 'сокращение!', gap: 'ушёл!', gapS: 'увернулся', reset: 'сброс',
    factUp: (n, d) => `сиквел ${n}, урон ${d}`, nulled: 'нейтралитет: урон 0', term: 'новый помощник', absHeal: 'жара лечит', out: 'выбыл!', phase2: 'ФАЗА 2',
    pick_x2: '×2 урон!', pick_C: 'обед: +12', pick_lim: 'щит', shieldUsed: 'щит сработал', split: 'выросли головы!',
    freeze: 'мороз!', frozen: 'замёрз', nest: 'новый слой!', dam: 'дамба готова', tea: 'время чая!', heads: n => 'голов: ' + n, fans: 'фанат!' },
  en: { immune: 'immune!', graph: 'strike!', wave: 'wave!', ring: 'circle!', blade: 'rush!', phaseTo: p => 'beat ' + p, reflect: p => 'beat ' + p + ': reflect!',
    regen: h => 'breather: +' + h, burning: 'burning!', armor: 'the wall holds', shift: l => '→ ' + l, morph: l => '→ ' + l,
    immD: 'immune!', immI: 'immune!', cancel: 'cancel!', gap: 'dodged!', gapS: 'dodged', reset: 'reset',
    factUp: (n, d) => `sequel ${n}, dmg ${d}`, nulled: 'neutrality: 0 dmg', term: 'new helper', absHeal: 'heat heals', out: 'out!', phase2: 'PHASE 2',
    pick_x2: '×2 damage!', pick_C: 'lunch: +12', pick_lim: 'shield', shieldUsed: 'shield used', split: 'heads grew!',
    freeze: 'frost!', frozen: 'frozen', nest: 'new layer!', dam: 'dam ready', tea: 'tea time!', heads: n => 'heads: ' + n, fans: 'fan!' },
};
STR.es = { immune: '¡inmune!', graph: '¡golpe!', wave: '¡ola!', ring: '¡círculo!', blade: '¡embestida!', phaseTo: p => 'compás ' + p, reflect: p => 'compás ' + p + ': ¡reflejo!',
  regen: h => 'respiro: +' + h, burning: '¡arde!', armor: 'la muralla aguanta', gap: '¡esquivó!', gapS: 'esquivó', factUp: (n, d) => `secuela ${n}, daño ${d}`, nulled: 'neutralidad: 0 daño', term: 'nuevo ayudante', absHeal: 'el calor cura', out: '¡fuera!', phase2: 'FASE 2',
  pick_x2: '¡daño ×2!', pick_C: 'almuerzo: +12', pick_lim: 'escudo', shieldUsed: 'escudo usado', split: '¡crecen cabezas!', freeze: '¡helada!', frozen: 'congelado', nest: '¡nueva capa!', dam: 'dique listo', tea: '¡hora del té!', fans: '¡fan!' };
STR.pt = { immune: 'imune!', graph: 'golpe!', wave: 'onda!', ring: 'círculo!', blade: 'investida!', phaseTo: p => 'compasso ' + p, reflect: p => 'compasso ' + p + ': reflexo!',
  regen: h => 'respiro: +' + h, burning: 'pegando fogo!', armor: 'a muralha segura', gap: 'esquivou!', gapS: 'esquivou', factUp: (n, d) => `sequência ${n}, dano ${d}`, nulled: 'neutralidade: 0 dano', term: 'novo ajudante', absHeal: 'o calor cura', out: 'fora!', phase2: 'FASE 2',
  pick_x2: 'dano ×2!', pick_C: 'almoço: +12', pick_lim: 'escudo', shieldUsed: 'escudo usado', split: 'cresceram cabeças!', freeze: 'geada!', frozen: 'congelado', nest: 'nova camada!', dam: 'dique pronto', tea: 'hora do chá!', fans: 'fã!' };
function tr(S, key, ...a) { const d = STR[S.lang] || STR.ru; const v = d[key] !== undefined ? d[key] : (STR.en[key] !== undefined && S.lang !== 'ru' ? STR.en[key] : STR.ru[key]); return typeof v === 'function' ? v(...a) : (v ?? key); }

const cloneCfg = c => Object.assign({}, c, { attack: c.attack ? Object.assign({}, c.attack) : undefined, attacks: c.attacks ? c.attacks.map(a => Object.assign({}, a)) : undefined });

// ---- состояние боя ----
// setup: { mode: 'duel'|'team'|'ffa'|'boss', sides: [[cfg...], ...], arena, lang, replay, intro, countdown, outro }
function makeBattle(setup, seed, headless) {
  const S = { t: 0, phase: 'ready', cdT: 3, introT: 0, fightT: 0, endT: 0, outT: 0, replayT: 0, rng: mulberry32(seed >>> 0), seed, teams: [], bodies: [], attacks: [],
    fx: { texts: [], parts: [], rings: [] }, events: [], winner: -1, nextId: 1, shake: 0, headless: !!headless, timeout: false,
    mode: setup.mode || 'duel', arena: setup.arena || 'plane', lang: ['en', 'es', 'pt'].includes(setup.lang) ? setup.lang : 'ru',
    opt: { replay: !!setup.replay && !headless, intro: !!setup.intro && !headless, introDur: setup.introDur || 2.8, countdown: setup.countdown !== false, outro: setup.outro !== false },
    pickups: [], pickT: 2.5, snaps: [], explained: {}, combos: [], feed: [], elim: [], lastKO: null, nSides: setup.sides.length,
    stepN: 0, inputQ: (setup.inputs || []).slice().sort((a, b) => a.step - b.step), inputLog: [], abilityCd: [0, 0], players: !!setup.players, fb: setup.fb || null };
  if (S.fb) S.goalW = GOAL_W * (S.fb.goalK || 0.55);
  S.dmgScale = DMG_SCALE * (S.mode === 'ffa' || S.mode === 'sumo' ? 1.2 : 1);
  setup.sides.forEach((list, s) => list.forEach(cfg0 => {
    const T = { k: S.teams.length, side: s, base: cfg0, cfg: cloneCfg(cfg0), hp: 0, maxHp: 0, disp: 0, status: '', statusT: 0, count: 0, burn: null, phase: 0, cyc: 0, regenT: 0,
      dead: false, hitFlash: 0, transformed: false, fact: 1, nullT: 0, termN: 0, buffT: 0, shield: false, enraged: false, slowT: 0, layers: 2, damT: 0, tea: false, comboN: 0, score: 0 };
    S.teams.push(T);
  }));
  // похожие цвета сторон: правой стороне даём второй цвет флага
  if (S.nSides === 2) {
    const rgb = h => { h = String(h || '#888').replace('#', ''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
    const near = (a, b) => { const p = rgb(a), q = rgb(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 110; };
    const L = S.teams.filter(T => T.side === 0).map(T => T.base.color);
    S.teams.forEach(T => { if (T.side !== 1 || !T.base.alt) return; if (L.some(c => near(c, T.base.color)) && !L.some(c => near(c, T.base.alt))) { T.base = Object.assign({}, T.base, { color: T.base.alt }); T.cfg.color = T.base.alt; } });
  }
  // связки
  for (let s = 0; s < S.nSides; s++) {
    const units = S.teams.filter(T => T.side === s); if (units.length < 2 || S.mode === 'ffa') continue;
    for (const C of COMBOS) {
      const us = C.ids.map(id => units.find(T => T.base.id === id));
      if (us.some(u => !u)) continue;
      us.forEach(T => { const m = C.mod[T.base.id] || {}; Object.assign(T.cfg, m); if (m.pierce && T.cfg.attack) T.cfg.attack.pierce = true; if (m.factStart) T.fact = m.factStart; });
      S.combos.push({ side: s, combo: C });
    }
  }
  const teamN = S.teams.filter(T => !T.cfg.boss).length;
  S.teams.forEach(T => {
    const c = T.cfg;
    if (c.boss) c.hp = Math.round(c.hp * ([0, 0.4, 0.6, 1][Math.min(3, teamN)] || 1));
    if (c.poly) { T.unitHp = c.unitHp || 5; T.maxHp = polyUnits(c.poly, c.kids) * T.unitHp + (c.hpAdd || 0); } else T.maxHp = (c.hp || 70) + (c.hpAdd || 0);
    const lv = Math.max(0, Math.min(5, c.level || 0));
    if (lv) { T.level = lv; c.dmgMul = (c.dmgMul || 1) * (1 + 0.06 * lv); if (c.poly) { T.unitHp = Math.round(T.unitHp * (1 + 0.08 * lv)); T.maxHp = polyUnits(c.poly, c.kids) * T.unitHp + (c.hpAdd || 0); } else T.maxHp = Math.round(T.maxHp * (1 + 0.08 * lv)); }
    T.hp = T.disp = T.maxHp;
    if (c.hpFrac != null && c.hpFrac < 1) T.hp = T.disp = Math.max(1, Math.round(T.maxHp * c.hpFrac));
  });
  // расстановка
  const n = S.teams.length;
  S.teams.forEach((T, i) => {
    let x, y;
    if (S.mode === 'ffa' || S.mode === 'sumo') { const a = Math.PI + i * 2 * Math.PI / n, R = S.mode === 'sumo' ? 2.6 : n <= 2 ? 2.2 : 3.5; x = Math.cos(a) * R; y = Math.sin(a) * R; }
    else {
      const same = S.teams.filter(u => u.side === T.side), j = same.indexOf(T), m = same.length;
      x = T.side === 0 ? -2.4 : 2.4; y = m === 1 ? 0 : (j - (m - 1) / 2) * (m === 2 ? 2.6 : 2.2);
      if (S.mode === 'duel') x = T.side === 0 ? -2.2 : 2.2;
    }
    const nb = Math.max(1, Math.min(3, T.cfg.multi || 1));
    for (let j = 0; j < nb; j++) {
      const off = nb > 1 ? (j - (nb - 1) / 2) * (S.mode === 'duel' ? 2.4 : 1.1) : 0;
      spawnBody(S, T.k, { x: clamp(x + (S.mode === 'ffa' || S.mode === 'sumo' ? off * 0.5 : 0), -U + 0.6, U - 0.6), y: clamp(y + off, -U + 0.6, U - 0.6), r: nb > 1 ? 0.4 : undefined, degree: T.cfg.poly || null, cd: 0.3 + S.rng() * 0.5 });
    }
  });
  if (S.mode === 'football') { initFootball(S); kickoff(S); }
  return S;
}
function startBattle(S) {
  if (S.opt.intro) { S.phase = 'intro'; S.introT = S.opt.introDur; return; }
  beginCountdown(S);
}
function beginCountdown(S) { S.phase = 'countdown'; S.cdT = S.opt.countdown ? 3 : 0.35; if (S.opt.countdown) ev(S, 'count', { n: 3 }); }

function spawnBody(S, k, o) {
  const T = S.teams[k], c = T.cfg, a = S.rng() * Math.PI * 2;
  const b = { id: S.nextId++, team: k, x: o.x, y: o.y, vx: 0, vy: 0, r: o.r || c.r || BR, label: o.label || null, degree: o.degree ?? null, summon: !!o.summon,
    cfg: o.cfg || null, st: 'idle', st_t: 0, cd: o.cd ?? (0.6 + S.rng() * 0.6), wa: a, trail: [], flash: 0, alive: true, hitSet: null, path: null, born: S.t, atkI: 0, curAtk: null };
  if (b.degree != null) {
    if (c.kids) { b.label = null; if (!o.r) b.r = BR * (0.72 + 0.14 * b.degree); b.cfg = Object.assign({}, c, { speed: c.speed * (1 + (3 - b.degree) * 0.1), attack: Object.assign({}, c.attack), attacks: undefined }); }
    else { b.label = polyLabel(b.degree); b.cfg = Object.assign({}, c, { speed: c.speed * (1 + (3 - b.degree) * 0.1), attack: { type: 'graph', expr: polyExpr(b.degree), dmg: POLY_DMG[b.degree], cd: c.attack.cd || 2.2 }, attacks: undefined }); }
  }
  const sp = cfgOf(S, b).speed * 0.7;
  b.vx = Math.cos(a) * sp; b.vy = Math.sin(a) * sp;
  if (o.vx != null) { b.vx = o.vx; b.vy = o.vy; }
  S.bodies.push(b);
  return b;
}
const cfgOf = (S, b) => b.cfg || S.teams[b.team].cfg;
const atkOf = (b, c) => b.curAtk || c.attack || (c.attacks && c.attacks[0]);
const foe = (S, ka, kb) => S.teams[ka].side !== S.teams[kb].side;
function bodyLabel(S, b) {
  if (b.label) return b.label;
  const T = S.teams[b.team];
  if (T.cfg.math) {
    if (T.cfg.passive === 'phaseI') return PH_M[T.phase];
    if (T.cfg.passive === 'factorial') return T.fact + '!';
    if (T.cfg.cycle) return T.cfg.cycle[T.cyc].label;
  }
  return T.cfg.label;
}
function ev(S, name, data) { if (!S.headless) S.events.push(Object.assign({ name }, data || {})); }
function explain(S, key, k, args) { if (S.headless) return; if (S.teams[k] && S.teams[k].cfg.math) key = 'm_' + key; if (S.explained[key]) return; S.explained[key] = 1; ev(S, 'explain', { key, k, id: S.teams[k] && S.teams[k].base.id, args: args || {} }); }
// слово-статус страны: своё вместо общего (cfg.words.ключ = [ru, en])
function wd(S, T, key, ...a) { const w = T && T.cfg.words && T.cfg.words[key]; if (w) return S.lang === 'ru' ? w[0] : w[1]; return tr(S, key, ...a); }
function wdx(S, T, key, ru, en) { const w = T && T.cfg.words && T.cfg.words[key]; if (w) return S.lang === 'ru' ? w[0] : w[1]; return S.lang !== 'ru' ? en : ru; }
function fxText(S, x, y, text, color, size, opt) { if (S.headless) return; S.fx.texts.push(Object.assign({ x, y, text, color, size: size || 64, t: 0, life: 1.1, vy: 0.9 }, opt || {})); }
function fxBurst(S, x, y, color, n, spd) { if (S.headless) return; for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = (0.6 + Math.random()) * (spd || 3); S.fx.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0, life: 0.45 + Math.random() * 0.4, color, r: 4 + Math.random() * 6 }); } }
function fxRing(S, x, y, color, kind, life) { if (S.headless) return; S.fx.rings.push({ x, y, color, kind, t: 0, life: life || 0.6 }); }
function setStatus(T, s, t) { T.status = s; T.statusT = t || 1.3; }

function nearestEnemy(S, b) {
  let best = null, bd = 1e9;
  for (const o of S.bodies) { if (!o.alive || !foe(S, o.team, b.team)) continue; const d = ((o.x - b.x) ** 2 + (o.y - b.y) ** 2) * (o.summon ? 2.5 : 1); if (d < bd) { bd = d; best = o; } }
  return best;
}
const REPLAY_DUR = 3.4;

// ---- шаг симуляции ----
function step(S, dt) {
  S.t += dt;
  if (S.phase === 'ready' || S.phase === 'done') return;
  if (S.phase === 'intro') { S.introT -= dt; if (S.introT <= 0) beginCountdown(S); return; }
  if (S.phase === 'countdown') {
    const prev = Math.ceil(S.cdT); S.cdT -= dt; const now = Math.ceil(S.cdT);
    if (S.opt.countdown && now !== prev && now > 0) ev(S, 'count', { n: now });
    if (S.cdT <= 0) { S.phase = 'fight'; S.fightT = 0; ev(S, 'go'); }
    return;
  }
  if (S.phase === 'fight') { S.fightT += dt; if (S.fightT > (S.mode === 'ffa' ? 150 : S.mode === 'sumo' ? 60 : S.mode === 'football' ? (S.fb ? (S.score[0] === S.score[1] && !S.fb.draw ? S.fb.time + (S.fb.extra || 30) : S.fb.time) : S.score[0] === S.score[1] ? 90 : 60) : 100)) timeoutWin(S); }
  else if (S.phase === 'replay') { S.replayT += dt; if (S.replayT > REPLAY_DUR) { S.phase = 'win'; S.endT = 0; ev(S, 'winshow'); } }
  else if (S.phase === 'win') { S.endT += dt; if (S.endT > 2.8) { if (S.opt.outro) { S.phase = 'outro'; S.outT = 0; } else { S.phase = 'done'; ev(S, 'done'); } } }
  else if (S.phase === 'outro') { S.outT += dt; if (S.outT > 2.0) { S.phase = 'done'; ev(S, 'done'); } }
  const fighting = S.phase === 'fight';
  if (fighting) {
    S.stepN++;
    S.abilityCd[0] = Math.max(0, S.abilityCd[0] - dt); S.abilityCd[1] = Math.max(0, S.abilityCd[1] - dt);
    while (S.inputQ.length && S.inputQ[0].step <= S.stepN) { const inp = S.inputQ.shift(); useAbility(S, inp.side); }
  }
  if (fighting && S.opt.replay) {
    S.snaps.push({ b: S.bodies.map(b => ({ x: b.x, y: b.y, r: b.r, k: b.team, l: bodyLabel(S, b), s: b.summon, w: b.st === 'windup' })), a: S.attacks.map(a => ({ a, t: a.t })), ball: S.ball ? { x: S.ball.x, y: S.ball.y, r: S.ball.r, a: S.ball.a } : null });
    if (S.snaps.length > 76) S.snaps.shift();
  }
  for (const T of S.teams) {
    T.statusT -= dt; T.hitFlash = Math.max(0, T.hitFlash - dt); T.nullT = Math.max(0, T.nullT - dt); T.buffT = Math.max(0, T.buffT - dt); T.slowT = Math.max(0, T.slowT - dt);
    if (T.dead || !fighting) continue;
    if (T.cfg.boss && !T.enraged && T.hp < T.maxHp * 0.5) {
      T.enraged = true; T.cfg = Object.assign({}, T.cfg, { speed: T.cfg.speed * 1.35, cdMul: (T.cfg.cdMul || 1) * 0.7 });
      const bb = bodyOf(S, T.k); if (bb) { fxText(S, bb.x, bb.y + 1.2, tr(S, 'phase2'), T.cfg.color, 70); fxRing(S, bb.x, bb.y, T.cfg.color, 'hex', 0.9); }
      setStatus(T, tr(S, 'phase2'), 2); S.shake = 1; ev(S, 'phase2');
    }
    if (T.burn) {
      T.burn.timer -= dt;
      if (T.burn.timer <= 0) {
        T.burn.timer += 0.5; T.burn.left--;
        const bb = bodyOf(S, T.k);
        if (T.cfg.passive === 'absval') { const h = Math.min(T.burn.dmg, T.maxHp - T.hp); T.hp += h; if (bb) fxText(S, bb.x, bb.y + 0.6, '+' + T.burn.dmg, T.cfg.color, 44); setStatus(T, tr(S, 'absHeal'), 0.6); explain(S, 'absval', T.k); }
        else damageTeam(S, T, T.burn.dmg, bb || { x: 0, y: 0 }, T.burn.color, { small: true });
        if (T.burn && T.burn.left <= 0) T.burn = null;
      }
    }
    if (T.cfg.passive === 'dam' && !T.shield) {
      T.damT += dt;
      if (T.damT >= 6) { T.damT = 0; T.shield = true; const bb = bodyOf(S, T.k); if (bb) { fxText(S, bb.x, bb.y + 0.9, wd(S, T, 'dam'), T.cfg.color, 44); fxRing(S, bb.x, bb.y, T.cfg.color, 'hex', 0.6); } setStatus(T, wd(S, T, 'dam'), 1.2); ev(S, 'pickup'); explain(S, 'dam', T.k); }
    }
    if (T.cfg.passive === 'tea' && !T.tea && T.hp < T.maxHp * 0.4 && T.hp > 0) {
      T.tea = true; const h = Math.min(13, T.maxHp - T.hp); T.hp += h; const bb = bodyOf(S, T.k);
      if (bb) { fxText(S, bb.x, bb.y + 0.7, '+' + h, T.cfg.color, 62); fxText(S, bb.x, bb.y + 1.4, tr(S, 'tea'), T.cfg.color, 44); }
      setStatus(T, tr(S, 'tea'), 1.6); ev(S, 'heal'); explain(S, 'tea', T.k);
    }
    if (T.cfg.passive === 'regen') {
      T.regenT += dt;
      if (T.regenT >= Math.PI * 2) {
        T.regenT -= Math.PI * 2;
        const h = Math.min(T.cfg.regenAmt || 6, T.maxHp - T.hp);
        if (h > 0) { T.hp += h; const bb = bodyOf(S, T.k); if (bb) fxText(S, bb.x, bb.y + 0.6, '+' + h, T.cfg.color, 58); setStatus(T, tr(S, 'regen', h)); ev(S, 'heal'); explain(S, 'regen', T.k); }
      }
    }
  }
  if (fighting && S.arena === 'bonus') updatePickups(S, dt);
  if (S.mode === 'football') { stepFootball(S, dt, fighting); return; }
  if (fighting) for (const T of S.teams) if (T.cfg.passive === 'haka' && !T.hakaShown && S.fightT > 0.3) { T.hakaShown = true; const bb = bodyOf(S, T.k); if (bb) fxText(S, bb.x, bb.y + 1.1, S.lang !== 'ru' ? 'HAKA!' : 'ХАКА!', T.cfg.color, 58); setStatus(T, S.lang !== 'ru' ? 'haka' : 'хака', 2); ev(S, 'phase2'); explain(S, 'haka', T.k); }
  for (const b of S.bodies) if (b.alive) updateBody(S, b, dt, fighting);
  if (fighting) resolveDashes(S);
  collide(S);
  for (const a of S.attacks) updateAttack(S, a, dt, fighting);
  S.attacks = S.attacks.filter(a => !a.done);
  if (S.mode === 'sumo' && fighting) sumoCheck(S);
  S.bodies = S.bodies.filter(b => b.alive);
}
function updatePickups(S, dt) {
  S.pickT -= dt;
  if (S.pickT <= 0) {
    S.pickT = 3.2 + S.rng() * 1.5;
    if (S.pickups.length < 3) { const types = ['x2', 'C', 'lim']; S.pickups.push({ x: (S.rng() * 2 - 1) * (U - 1), y: (S.rng() * 2 - 1) * (U - 1), type: types[Math.floor(S.rng() * 3)], t: 0 }); }
  }
  for (const p of S.pickups) {
    p.t += dt;
    for (const b of S.bodies) {
      if (!b.alive || b.summon || p.got) continue;
      if ((b.x - p.x) ** 2 + (b.y - p.y) ** 2 < (b.r + 0.32) ** 2) {
        p.got = true; const T = S.teams[b.team];
        if (p.type === 'x2') T.buffT = 5;
        else if (p.type === 'C') { const h = Math.min(12, T.maxHp - T.hp); T.hp += h; fxText(S, b.x, b.y + 0.6, '+' + h, T.cfg.color, 56); }
        else T.shield = true;
        fxText(S, p.x, p.y + 0.9, tr(S, 'pick_' + p.type), T.cfg.color, 44); setStatus(T, tr(S, 'pick_' + p.type), 1.4); fxRing(S, p.x, p.y, T.cfg.color, 'hex', 0.5);
        ev(S, 'pickup'); explain(S, 'pick_' + p.type, T.k);
      }
    }
  }
  S.pickups = S.pickups.filter(p => !p.got);
}

function sideHp(S, s) { let h = 0, m = 0; S.teams.forEach(T => { if (T.side === s) { h += Math.max(0, T.hp); m += T.maxHp; } }); return { h, m, f: m ? h / m : 0 }; }
// способность игрока: следующий удар ×2 и немедленная атака; перезарядка 6 с
const ABILITY_CD = 6;
function pressAbility(S, side) {
  if (S.phase !== 'fight' || side < 0 || side > 1 || S.abilityCd[side] > 0) return false;
  const inp = { step: S.stepN + 1, side }; S.inputQ.push(inp); S.inputLog.push(inp); S.abilityCd[side] = ABILITY_CD; return true;
}
function useAbility(S, side) {
  S.abilityCd[side] = ABILITY_CD;
  for (const T of S.teams) {
    if (T.side !== side || T.dead) continue;
    T.boost = true;
    for (const b of S.bodies) if (b.alive && b.team === T.k && !b.summon) { if (b.st === 'idle' || b.st === 'recover') { b.st = 'idle'; b.cd = 0; } }
    const bb = bodyOf(S, T.k); if (bb) { fxText(S, bb.x, bb.y + 1.0, S.lang !== 'ru' ? 'POWER!' : 'СИЛА!', T.cfg.color, 60); fxRing(S, bb.x, bb.y, T.cfg.color, 'hex', 0.6); }
  }
  ev(S, 'ability', { side });
}
function timeoutWin(S) {
  if (S.mode === 'football') { const sc = S.score; S.timeout = true; if (S.fb && S.fb.draw && sc[0] === sc[1]) { drawGame(S); return; } if (sc[0] === sc[1]) { S.pens = penalties(S); } win(S, sc[0] === sc[1] ? (S.pens[0] > S.pens[1] ? 0 : 1) : sc[0] > sc[1] ? 0 : 1); S.shootout = sc[0] === sc[1]; return; }
  if (S.mode === 'sumo') { let best = -1, bd = 1e9; S.teams.forEach(T => { if (T.dead) return; const b = bodyOf(S, T.k); const d = b ? Math.hypot(b.x, b.y) : 99; if (d < bd) { bd = d; best = T.side; } }); S.timeout = true; win(S, best < 0 ? 0 : best); return; }
  let best = -1, bf = -1;
  for (let s = 0; s < S.nSides; s++) { if (!S.teams.some(T => T.side === s && !T.dead)) continue; const f = sideHp(S, s).f; if (f > bf) { bf = f; best = s; } }
  S.timeout = true; win(S, best < 0 ? 0 : best);
}
// ничья в футболе с разрешёнными ничьими (групповой этап)
function drawGame(S) { if (S.phase !== 'fight') return; S.winner = -1; S.draw = true; S.fightDur = S.fightT; ev(S, 'win', { side: -1, id: '' }); S.attacks.forEach(a => { a.dmg = 0; }); S.phase = 'win'; S.endT = 0; ev(S, 'winshow'); }
// серия пенальти: по пять ударов, дальше до первого промаха
function penalties(S) { const p = [0, 0]; for (let i = 0; i < 5; i++) for (let s = 0; s < 2; s++) if (S.rng() < 0.76) p[s]++; let k = 0; while (p[0] === p[1] && k < 20) { const a = S.rng() < 0.76, b = S.rng() < 0.76; if (a) p[0]++; if (b) p[1]++; k++; } if (p[0] === p[1]) p[S.rng() < 0.5 ? 0 : 1]++; return p; }
function win(S, side) {
  if (S.phase !== 'fight') return;
  S.winner = side; S.fightDur = S.fightT; const wt = S.teams.find(T => T.side === side); ev(S, 'win', { side, id: wt ? wt.base.id : '' });
  S.attacks.forEach(a => { a.dmg = 0; });
  if (S.opt.replay && S.snaps.length > 20 && !S.timeout) { S.phase = 'replay'; S.replayT = 0; } else { S.phase = 'win'; S.endT = 0; ev(S, 'winshow'); }
}

function updateBody(S, b, dt, fighting) {
  const c = cfgOf(S, b);
  b.flash = Math.max(0, b.flash - dt);
  b.st_t -= dt;
  const tgt = fighting ? nearestEnemy(S, b) : null;
  const atk = atkOf(b, c);
  if (b.st === 'idle' || b.st === 'recover') {
    let ax = 0, ay = 0;
    if (tgt) {
      const dx = tgt.x - b.x, dy = tgt.y - b.y, d = Math.hypot(dx, dy) || 1;
      const nt = (c.attacks ? c.attacks[b.atkI % c.attacks.length] : atk).type;
      const melee = nt === 'dash' || nt === 'slash';
      const pref = melee ? 1.4 : 3.0;
      const k = clamp(d - pref, -1, 1) * (melee ? 1.4 : 0.9);
      ax += dx / d * k; ay += dy / d * k;
    }
    b.wa += (S.rng() - 0.5) * dt * 4;
    ax += Math.cos(b.wa) * 1.0; ay += Math.sin(b.wa) * 1.0;
    if (S.arena === 'polar') { const d = Math.hypot(b.x, b.y) || 1; ax += -b.y / d * 1.1; ay += b.x / d * 1.1; }
    if (S.mode === 'sumo') { const d = Math.hypot(b.x, b.y); if (d > SUMO_R * 0.55) { ax -= b.x / d * 1.6; ay -= b.y / d * 1.6; } }
    if (b.x < -U + 1) ax += 1.2; if (b.x > U - 1) ax -= 1.2; if (b.y < -U + 1) ay += 1.2; if (b.y > U - 1) ay -= 1.2;
    b.vx += ax * dt * 2.4; b.vy += ay * dt * 2.4;
    const slow = speedMul(S, b), sp = Math.hypot(b.vx, b.vy), mx = c.speed * slow, mn = c.speed * 0.45 * slow;
    if (sp > mx) { b.vx *= mx / sp; b.vy *= mx / sp; } else if (sp < mn && sp > 1e-6) { b.vx *= mn / sp; b.vy *= mn / sp; }
    if (b.st === 'recover' && b.st_t <= 0) b.st = 'idle';
    if (fighting && b.st === 'idle') { b.cd -= dt; if (b.cd <= 0 && tgt) startAttack(S, b, tgt, c); }
  } else if (b.st === 'windup') {
    b.vx *= 0.86; b.vy *= 0.86;
    if (b.st_t <= 0) { if (!fighting) { b.st = 'idle'; } else if (atk.type === 'slash') beginSlash(S, b, c); else beginDash(S, b, c); }
  } else if (b.st === 'dash') {
    if (b.st_t <= 0) endAttack(S, b, c);
  } else if (b.st === 'slash') {
    b.pathPos += 15 * dt;
    const P = b.path; let j = b.pathJ;
    while (j < P.length - 1 && P[j + 1][2] < b.pathPos) j++;
    b.pathJ = j;
    if (j >= P.length - 1 || !fighting) { const L = P[P.length - 1]; b.x = L[0]; b.y = L[1]; endAttack(S, b, c); }
    else {
      const p0 = P[j], p1 = P[j + 1], f = (b.pathPos - p0[2]) / Math.max(1e-6, p1[2] - p0[2]);
      const nx = p0[0] + (p1[0] - p0[0]) * f, ny = p0[1] + (p1[1] - p0[1]) * f;
      b.vx = (nx - b.x) / dt * 0.12; b.vy = (ny - b.y) / dt * 0.12; b.x = nx; b.y = ny;
      for (const o of S.bodies) {
        if (!o.alive || !foe(S, o.team, b.team) || b.hitSet.has(o.id)) continue;
        if ((o.x - b.x) ** 2 + (o.y - b.y) ** 2 < (o.r + b.r + 0.1) ** 2) { b.hitSet.add(o.id); applyHit(S, b.team, b, o, { kind: atk.effect || 'hit', dmg: atk.dmg, burn: atk.burn, pierce: isPierce(S, b, c) }); }
      }
    }
  }
  if (b.st !== 'slash') { b.x += b.vx * dt; b.y += b.vy * dt; }
  if (b.kx || b.ky) { b.x += b.kx * dt; b.y += b.ky * dt; b.kx *= 0.9; b.ky *= 0.9; if (Math.abs(b.kx) + Math.abs(b.ky) < 0.05) b.kx = b.ky = 0; }
  const lim = U - b.r;
  if (b.x < -lim) { b.x = -lim; b.vx = Math.abs(b.vx); } if (b.x > lim) { b.x = lim; b.vx = -Math.abs(b.vx); }
  if (b.y < -lim) { b.y = -lim; b.vy = Math.abs(b.vy); } if (b.y > lim) { b.y = lim; b.vy = -Math.abs(b.vy); }
  if (!S.headless) { b.trail.push(b.x, b.y); if (b.trail.length > 36) b.trail.splice(0, 2); }
}
// одновременные тараны: сначала собираем все касания, потом применяем в случайном порядке
function resolveDashes(S) {
  const hits = [];
  for (const b of S.bodies) {
    if (!b.alive || b.st !== 'dash') continue;
    for (const o of S.bodies) {
      if (!o.alive || !foe(S, o.team, b.team) || b.hitSet.has(o.id)) continue;
      if ((o.x - b.x) ** 2 + (o.y - b.y) ** 2 < (o.r + b.r) ** 2) { hits.push([b, o]); break; }
    }
  }
  if (!hits.length) return;
  for (let i = hits.length - 1; i > 0; i--) { const j = Math.floor(S.rng() * (i + 1)); [hits[i], hits[j]] = [hits[j], hits[i]]; }
  for (const [b, o] of hits) {
    if (!b.alive) continue;
    const c = cfgOf(S, b), atk = atkOf(b, c);
    b.hitSet.add(o.id);
    if (o.alive) applyHit(S, b.team, b, o, { kind: atk.effect || 'hit', dmg: atk.dmg, burn: atk.burn, pierce: isPierce(S, b, c) });
    b.vx *= -0.35; b.vy *= -0.35; b.st_t = 0;
  }
}
function isPierce(S, b, c) { const T = S.teams[b.team], a = atkOf(b, c); return !!(a && a.pierce) || (T.cfg.passive === 'phaseI' && (T.phase === 0 || T.phase === 2)); }

function collide(S) {
  const B = S.bodies;
  for (let i = 0; i < B.length; i++) for (let j = i + 1; j < B.length; j++) {
    const a = B[i], b = B[j]; if (!a.alive || !b.alive) continue;
    const dx = b.x - a.x, dy = b.y - a.y, rr = a.r + b.r, d2 = dx * dx + dy * dy;
    if (d2 >= rr * rr || d2 < 1e-9) continue;
    const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = (rr - d) / 2;
    const am = a.st === 'slash' ? 0 : 1, bm = b.st === 'slash' ? 0 : 1;
    if (am) { a.x -= nx * ov; a.y -= ny * ov; } if (bm) { b.x += nx * ov; b.y += ny * ov; }
    const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
    if (rv < 0 && a.st !== 'dash' && b.st !== 'dash') { if (am) { a.vx += rv * nx; a.vy += rv * ny; } if (bm) { b.vx -= rv * nx; b.vy -= rv * ny; } }
  }
}

function startAttack(S, b, tgt, c) {
  b.curAtk = c.attacks ? c.attacks[b.atkI++ % c.attacks.length] : null;
  const atk = atkOf(b, c), t = atk.type, T = S.teams[b.team];
  if (t === 'dash') { b.st = 'windup'; b.st_t = 0.22; ev(S, 'charge'); return; }
  if (t === 'summon') {
    const n = S.bodies.filter(o => o.alive && o.team === b.team && o.summon).length;
    if (n >= 3) { b.st = 'windup'; b.st_t = 0.22; ev(S, 'charge'); return; }
    const terms = c.terms || T.cfg.terms || TERMS, term = terms[T.termN % terms.length]; T.termN++;
    const a = S.rng() * Math.PI * 2;
    spawnBody(S, b.team, { x: clamp(b.x + Math.cos(a) * (b.r + 0.4), -U + 0.5, U - 0.5), y: clamp(b.y + Math.sin(a) * (b.r + 0.4), -U + 0.5, U - 0.5), r: 0.36, label: term.label, summon: true, cd: 0.6 + S.rng() * 0.5,
      cfg: Object.assign({}, T.cfg, { speed: 2.8, passive: 'none', r: 0.36, attacks: undefined, attack: { type: 'dash', dmg: term.dmg, cd: 1.1 } }) });
    fxText(S, b.x, b.y + 1.0, '+1', T.cfg.color, 48); setStatus(T, tr(S, 'term'), 1.0); ev(S, 'split'); explain(S, c.boss ? 'zeta' : 'series', T.k);
    afterAttack(S, b, c); return;
  }
  if (t === 'slash') {
    const res = buildCurve(S, b, tgt, c, [0.35, 1, 2.6], true);
    if (!res || !res.path || res.path.length < 2) { b.cd = 0.4; return; }
    b.path = res.path; b.st = 'windup'; b.st_t = 0.38;
    S.attacks.push({ kind: 'curve', team: b.team, segs: res.segs, color: T.cfg.color, tele: 0.38, act: 0.42, fade: 0.35, t: 0, dmg: 0, hit: new Set(), blade: true });
    ev(S, 'charge');
    return;
  }
  if (t === 'graph' || t === 'wave') {
    const res = buildCurve(S, b, tgt, c, [1], false);
    if (res) S.attacks.push({ kind: 'curve', team: b.team, segs: res.segs, color: (b.summon ? '#7d8796' : T.cfg.color), tele: 0.45, act: 0.4, fade: 0.35, t: 0,
      dmg: atk.dmg, burn: atk.burn, pierce: isPierce(S, b, c), hit: new Set(), src: b, wide: t === 'wave' });
    if (!b.summon) setStatus(T, tr(S, t === 'wave' ? 'wave' : 'graph'), 1.0);
    ev(S, 'graph');
  } else if (t === 'ring') {
    const R = (atk.radius || Math.PI) * (c.ringMul || 1);
    S.attacks.push({ kind: 'ring', team: b.team, x: b.x, y: b.y, R, rotate: !!atk.rotate, label: atk.rotate ? '↻ 90°' : atk.radius && Math.abs(atk.radius - Math.PI) > 0.01 ? null : 'r = π', color: T.cfg.color, tele: 0.55, act: 0.22, fade: 0.4, t: 0, dmg: atk.dmg, burn: atk.burn, pierce: isPierce(S, b, c), hit: new Set(), src: b });
    setStatus(T, tr(S, 'ring'), 1.0);
    ev(S, 'graph'); if (T.base.id === 'in' || T.cfg.exRing) explain(S, 'ring', T.k);
  }
  afterAttack(S, b, c);
}
function beginDash(S, b, c) {
  const tgt = nearestEnemy(S, b);
  if (!tgt) { b.st = 'idle'; return; }
  const px = tgt.x + tgt.vx * 0.12, py = tgt.y + tgt.vy * 0.12;
  const dx = px - b.x, dy = py - b.y, d = Math.hypot(dx, dy) || 1;
  const sp = c.speed * 3.8 * speedMul(S, b) * (S.teams[b.team].slowT > 0 ? 1.1 : 1);
  b.vx = dx / d * sp; b.vy = dy / d * sp; b.st = 'dash'; b.st_t = Math.min(0.45, d / sp + 0.12); b.hitSet = new Set();
  ev(S, 'dash');
}
function beginSlash(S, b, c) { b.st = 'slash'; b.pathPos = 0; b.pathJ = 0; b.hitSet = new Set(); setStatus(S.teams[b.team], tr(S, 'blade'), 1.0); ev(S, 'slash'); }
function endAttack(S, b, c) { b.st = 'recover'; b.st_t = 0.25; afterAttack(S, b, c); }
function afterAttack(S, b, c) {
  const T = S.teams[b.team], atk = atkOf(b, c);
  b.cd = atk.cd * (c.cdMul || 1) * (0.85 + 0.3 * S.rng());
  if (T.cfg.passive === 'phaseI' && !b.summon) { T.phase = (T.phase + 1) % 4; setStatus(T, tr(S, 'phaseTo', PH[T.phase]), 0.9); ev(S, 'phase'); if (T.phase === 1) explain(S, 'phase', T.k); }
}

// ---- кривые ----
function curveFns(S, b, c) {
  const T = S.teams[b.team], atk = atkOf(b, c);
  if (atk.type === 'wave') {
    const e = T.cfg.cycle && !b.summon ? T.cfg.cycle[T.cyc].expr : (atk.expr || 'sin(x)');
    const f = getFn(e), A = atk.amp || 1.2, w = atk.freq || 1.6;
    return { v: u => A * f(w * u), wave: true };
  }
  const f = getFn(atk.expr || 'x');
  let u0 = 0; if (!Number.isFinite(f(0))) u0 = Number.isFinite(f(1)) ? 1 : 0.5;
  const f0 = f(u0);
  return { v: u => f(u + u0) - f0, wave: false };
}
function buildCurve(S, b, tgt, c, scales, wantPath) {
  const { v, wave } = curveFns(S, b, c);
  const px = tgt.x + tgt.vx * 0.3, py = tgt.y + tgt.vy * 0.3;
  const rots = wave ? [0, Math.PI / 2] : [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  const mirrors = wave ? [1] : [1, -1];
  const cands = [];
  for (const a of scales) for (const th of rots) for (const m of mirrors) {
    const cs = Math.cos(th), sn = Math.sin(th);
    let best = 1e9;
    for (let u = -14; u <= 14; u += 0.15) {
      const vv = a * v(u); if (!Number.isFinite(vv)) continue;
      const lu = m * u, x = b.x + cs * lu - sn * vv, y = b.y + sn * lu + cs * vv;
      if (x < -U || x > U || y < -U || y > U) continue;
      const d = (x - px) ** 2 + (y - py) ** 2; if (d < best) best = d;
    }
    cands.push({ a, th, m, d: best });
  }
  cands.sort((p, q) => p.d - q.d);
  const pick = S.rng() < 0.72 ? cands[0] : cands[Math.min(cands.length - 1, 1 + Math.floor(S.rng() * 2))];
  const cs = Math.cos(pick.th), sn = Math.sin(pick.th);
  const segs = []; let cur = null, prev = null;
  const pts = [];
  for (let u = -14; u <= 14.0001; u += 0.05) {
    const vv = pick.a * v(u);
    let ok = Number.isFinite(vv);
    let x = 0, y = 0;
    if (ok) { const lu = pick.m * u; x = b.x + cs * lu - sn * vv; y = b.y + sn * lu + cs * vv; ok = x > -U - 0.4 && x < U + 0.4 && y > -U - 0.4 && y < U + 0.4; }
    if (ok && prev && Math.hypot(x - prev[0], y - prev[1]) > 1.2) { cur = null; pts.push(null); }
    if (ok) { if (!cur) { cur = []; segs.push(cur); } cur.push(x, y); prev = [x, y]; pts.push([x, y, u]); }
    else { cur = null; prev = null; pts.push(null); }
  }
  const out = { segs: segs.filter(s => s.length >= 4) };
  if (wantPath) {
    let ia = -1, ib = -1, bd = 1e9, ad = 1e9;
    pts.forEach((p, i) => { if (!p) return; if (Math.abs(p[2]) < ad) { ad = Math.abs(p[2]); ia = i; } const d = (p[0] - px) ** 2 + (p[1] - py) ** 2; if (d < bd) { bd = d; ib = i; } });
    if (ia < 0 || ib < 0 || ia === ib) return out;
    const dir = ib > ia ? 1 : -1, path = []; let L = 0, Lhit = -1, last = null;
    for (let i = ia; i >= 0 && i < pts.length; i += dir) {
      const p = pts[i]; if (!p) break;
      if (last) L += Math.hypot(p[0] - last[0], p[1] - last[1]);
      path.push([clamp(p[0], -U + b.r, U - b.r), clamp(p[1], -U + b.r, U - b.r), L]); last = p;
      if (i === ib) Lhit = L;
      if (Lhit >= 0 && L - Lhit > 1.2) break;
      if (L > 16) break;
    }
    out.path = path;
  }
  return out;
}
function distSegs(segs, x, y) {
  let best = 1e9;
  for (const s of segs) for (let i = 0; i + 3 < s.length; i += 2) {
    const ax = s[i], ay = s[i + 1], bx = s[i + 2], by = s[i + 3];
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    let t = l2 > 0 ? ((x - ax) * dx + (y - ay) * dy) / l2 : 0; t = t < 0 ? 0 : t > 1 ? 1 : t;
    const ex = ax + dx * t - x, ey = ay + dy * t - y, d = ex * ex + ey * ey;
    if (d < best) best = d;
  }
  return Math.sqrt(best);
}
function updateAttack(S, a, dt, fighting) {
  a.t += dt;
  if (a.t > a.tele + a.act + a.fade) { a.done = true; return; }
  const active = a.t >= a.tele && a.t < a.tele + a.act;
  if (active && !a.fired) { a.fired = true; if (a.dmg) ev(S, 'zap'); }
  if (!active || !fighting || !a.dmg) return;
  for (const o of S.bodies) {
    if (!o.alive || !foe(S, o.team, a.team) || a.hit.has(o.id)) continue;
    let touch = false;
    if (a.kind === 'curve') touch = distSegs(a.segs, o.x, o.y) < o.r + 0.12;
    else if (a.kind === 'ring') touch = Math.hypot(o.x - a.x, o.y - a.y) < a.R + o.r * 0.5;
    if (touch && a.rotate) {
      const dx = o.x - a.x, dy = o.y - a.y; o.x = clamp(a.x - dy, -U + o.r, U - o.r); o.y = clamp(a.y + dx, -U + o.r, U - o.r); o.trail = [];
      const t2 = o.vx; o.vx = -o.vy; o.vy = t2; fxRing(S, o.x, o.y, S.teams[a.team].cfg.color, 'reflect', 0.5); explain(S, 'rotate', a.team);
    }
    if (touch) { a.hit.add(o.id); applyHit(S, a.team, a.src && a.src.alive ? a.src : null, o, { kind: 'hit', dmg: a.dmg, burn: a.burn, pierce: a.pierce }); }
  }
}

// ---- попадания ----
function bodyOf(S, k) { return S.bodies.find(b => b.alive && b.team === k && !b.summon) || S.bodies.find(b => b.alive && b.team === k); }
function unitMul(S, A) {
  let m = A.cfg.dmgMul || 1;
  if (A.buffT > 0) m *= 2;
  if (A.cfg.passive === 'growth') m *= 1 + Math.min(1.4, S.fightT / 25);
  if (A.cfg.passive === 'rage' && A.hp < A.maxHp * 0.4) m *= 1.5;
  if (S.arena === 'beach') { const ts = (A.cfg.attacks || [A.cfg.attack]).map(a => a && a.type); if (ts.includes('wave')) m *= 1.3; }
  if (S.arena === 'complex') { const ts = (A.cfg.attacks || [A.cfg.attack]).map(a => a && a.type); if (ts.includes('dash') || ts.includes('slash')) m *= 1.25; }
  if (S.arena === 'polar') { const ts = (A.cfg.attacks || [A.cfg.attack]).map(a => a && a.type); if (ts.includes('wave') || ts.includes('ring')) m *= 1.4; }
  return m;
}
function applyHit(S, ka, src, tgt, o) {
  if (S.phase !== 'fight' || !tgt.alive) return;
  const A = S.teams[ka], T = S.teams[tgt.team];
  let dmg = o.dmg || 0;
  tgt.flash = 0.2;
  if (A.nullT > 0) { fxText(S, tgt.x, tgt.y + 0.7, '0', '#7d8796', 52); ev(S, 'pop'); return; }
  const factHit = A.cfg.passive === 'factorial' && src && !src.summon && o.kind !== 'derive';
  if (factHit) { dmg = FACT_DMG[Math.min(5, A.fact)]; if (A.fact >= 3) explain(S, 'fact', A.k); }
  dmg *= unitMul(S, A);
  if (A.cfg.passive === 'first' && !A.firstDone && src && !src.summon && S.mode !== 'sumo') { A.firstDone = true; dmg *= 2.5; fxText(S, tgt.x, tgt.y + 1.4, S.lang !== 'ru' ? 'first strike!' : 'первый удар!', A.cfg.color, 46); explain(S, 'first', A.k); }
  if (A.cfg.passive === 'rage' && A.hp < A.maxHp * 0.4 && S.mode !== 'sumo') explain(S, 'rage', A.k);
  if (S.mode === 'sumo') { if (tgt.summon) { killBody(S, tgt); ev(S, 'pop'); return; } sumoPush(S, A, src, tgt, dmg, o); return; }
  if (A.cfg.passive === 'luck' && src && !src.summon && S.rng() < 0.25) { dmg *= 2; fxText(S, tgt.x, tgt.y + 1.4, wdx(S, A, 'luck', 'удача!', 'lucky!'), A.cfg.color, 46); explain(S, 'luck', A.k); }
  if (A.cfg.passive === 'combo' && src && !src.summon) { A.comboN++; if (A.comboN % 3 === 0) { dmg *= 2.5; fxText(S, tgt.x, tgt.y + 1.4, wdx(S, A, 'combo', 'локоть!', 'elbow!'), A.cfg.color, 50); explain(S, 'combo', A.k); } }
  if (T.cfg.passive === 'haka' && S.fightT < 8) dmg *= 0.7;
  if (S.arena === 'night' && !o.pierce && !tgt.summon && S.rng() < 0.08) { fxText(S, tgt.x, tgt.y + 0.8, S.lang !== 'ru' ? 'missed in the dark' : 'мимо в темноте', '#9aa6b8', 38); ev(S, 'reflect'); explain(S, 'night', T.k); return; }
  if (A.boost && dmg > 0) { dmg *= 2; A.boost = false; fxText(S, tgt.x, tgt.y + 1.5, '×2', A.cfg.color, 52); }
  fxBurst(S, tgt.x, tgt.y, A.cfg.color, 10, 3.2);
  if (tgt.summon) { killBody(S, tgt); fxText(S, tgt.x, tgt.y + 0.4, '×', T.cfg.color, 56); ev(S, 'pop'); return; }
  if (o.pierce && A.cfg.attack && A.cfg.attack.pierce && (T.shield || T.cfg.passive === 'logArmor' || T.cfg.passive === 'cap' || T.cfg.passive === 'blink' || T.cfg.minDmg)) explain(S, 'pierce', A.k);
  if (T.cfg.poly && T.cfg.kids && tgt.degree > 0 && !(T.shield && !o.pierce)) hydraSplit(S, tgt, T);
  if (T.shield && !o.pierce) { T.shield = false; fxText(S, tgt.x, tgt.y + 0.8, tr(S, 'shieldUsed'), T.cfg.color, 44); setStatus(T, tr(S, 'shieldUsed'), 1); fxRing(S, tgt.x, tgt.y, T.cfg.color, 'hex', 0.6); ev(S, 'immune'); return; }
  if (T.cfg.passive === 'phaseI' && (T.phase === 1 || T.phase === 2)) {
    if (o.kind === 'derive' && T.cfg.onDerive === 'zero') dmg *= 2.5;
    const sb = (src && src.alive) ? src : bodyOf(S, ka);
    fxText(S, tgt.x, tgt.y + 0.75, '↩', T.cfg.color, 60);
    fxRing(S, tgt.x, tgt.y, T.cfg.color, 'reflect', 0.5);
    setStatus(T, tr(S, 'reflect', PH[T.phase]), 1.2);
    ev(S, 'reflect'); explain(S, 'phase', T.k);
    if (sb) damageTeam(S, A, dmg, sb, T.cfg.color);
    if (o.burn && !A.dead) applyBurn(S, A, o.burn, T.cfg.color);
    return;
  }
  if (T.cfg.passive === 'blink' && !o.pierce && S.rng() < (T.cfg.blinkP || 0.2)) {
    fxRing(S, tgt.x, tgt.y, T.cfg.color, 'reflect', 0.5);
    tgt.x = (S.rng() * 2 - 1) * (U - 1); tgt.y = (S.rng() * 2 - 1) * (U - 1); tgt.trail = [];
    fxText(S, tgt.x, tgt.y + 0.8, tr(S, 'gap'), T.cfg.color, 46); setStatus(T, tr(S, 'gapS'), 1.0); ev(S, 'reflect'); explain(S, 'blink', T.k);
    if (o.kind === 'derive') A.count++;
    return;
  }
  if (o.kind === 'partialY') {
    A.count++;
    if (tgt.degree != null) {
      const lost = polyUnits(tgt.degree) * T.unitHp;
      S.lastKO = { x: tgt.x, y: tgt.y };
      fxText(S, tgt.x, tgt.y + 1.2, '∂(' + bodyLabel(S, tgt) + ')/∂y = 0', A.cfg.color, 42, { math: true, life: 1.4 });
      fxText(S, tgt.x, tgt.y + 0.5, '−' + Math.round(lost), A.cfg.color, 70);
      killBody(S, tgt); T.hp -= lost; T.hitFlash = 0.3; S.shake = 1; ev(S, 'hit', { dmg: 20 }); explain(S, 'partialY', A.k);
      checkDeath(S, T); return;
    }
    dmg *= 2.5; fxText(S, tgt.x, tgt.y + 1.3, '∂(' + bodyLabel(S, tgt) + ')/∂y = 0', A.cfg.color, 40, { math: true, life: 1.2 }); explain(S, 'partialY', A.k);
  }
  if (o.kind === 'derive' && T.cfg.passive === 'factorial' && T.fact > 1) { T.fact = 1; setStatus(T, tr(S, 'reset'), 1.2); fxText(S, tgt.x, tgt.y + 1.3, 'n → 1', A.cfg.color, 44, { math: true }); }
  if (o.kind === 'derive') {
    A.count++;
    const od = T.cfg.onDerive || 'hit', L = bodyLabel(S, tgt);
    if (od === 'immune' && !o.pierce) {
      fxText(S, tgt.x, tgt.y + 0.8, tr(S, 'immune'), T.cfg.color, 46); fxText(S, tgt.x, tgt.y + 1.35, '(' + L + ')′ = ' + L, T.cfg.color, 42, { math: true, life: 1.4 });
      fxRing(S, tgt.x, tgt.y, T.cfg.color, 'hex', 0.7); setStatus(T, tr(S, 'immD')); ev(S, 'immune'); explain(S, 'immune_d', T.k, { L }); return;
    }
    if (od === 'split' && tgt.degree != null) { splitPoly(S, tgt, A); return; }
    if (od === 'cancel') { dmg *= 1.5; fxText(S, tgt.x, tgt.y + 1.3, 'd/dx ∘ ∫ = 1', A.cfg.color, 40, { math: true, life: 1.3 }); setStatus(T, tr(S, 'cancel')); explain(S, 'cancel', T.k); }
    if (od === 'zero') { dmg *= 2.5; fxText(S, tgt.x, tgt.y + 1.3, '(' + L + ')′ = 0', A.cfg.color, 42, { math: true, life: 1.3 }); explain(S, 'const', T.k, { L }); }
    if (od === 'cycle' && T.cfg.cycle) { const from = T.cfg.cycle[T.cyc].label; T.cyc = (T.cyc + 1) % T.cfg.cycle.length; const to = T.cfg.cycle[T.cyc].label; fxText(S, tgt.x, tgt.y + 1.3, '→ ' + to, T.cfg.color, 44, { math: true }); setStatus(T, tr(S, 'shift', to)); explain(S, 'cycle', T.k, { from, to }); }
    if (od === 'transform' && !T.transformed && T.cfg.deriveTo) {
      const from = T.cfg.label; T.transformed = true; T.cfg = Object.assign({}, T.cfg, T.cfg.deriveTo, { attack: Object.assign({}, T.cfg.attack, T.cfg.deriveTo.attack || {}) });
      fxText(S, tgt.x, tgt.y + 1.35, '(' + from + ')′ = ' + T.cfg.label, A.cfg.color, 42, { math: true, life: 1.5 }); setStatus(T, tr(S, 'morph', T.cfg.label), 1.6); ev(S, 'split'); explain(S, 'transform', T.k, { from, to: T.cfg.label });
      for (const bb of S.bodies) if (bb.team === T.k && !bb.summon && !bb.label) { bb.st = 'idle'; bb.cd = 0.6; }
    }
  } else if (o.kind === 'integrate') {
    A.count++;
    if (T.cfg.onIntegrate === 'immune' && !o.pierce) {
      fxText(S, tgt.x, tgt.y + 0.8, tr(S, 'immune'), T.cfg.color, 46); fxText(S, tgt.x, tgt.y + 1.35, '∫' + T.cfg.label + 'dx = ' + T.cfg.label + ' + C', T.cfg.color, 40, { math: true, life: 1.4 });
      fxRing(S, tgt.x, tgt.y, T.cfg.color, 'hex', 0.7); setStatus(T, tr(S, 'immI')); ev(S, 'immune'); explain(S, 'immune_i', T.k, { L: T.cfg.label }); spawnC(S, ka, src); return;
    }
    spawnC(S, ka, src);
  }
  if (T.cfg.passive === 'logArmor' && !o.pierce && dmg > 2) { const r = Math.max(1, Math.round(3 * Math.log(1 + dmg))); if (r < dmg) { dmg = r; setStatus(T, wd(S, T, 'armor'), 0.9); explain(S, 'logArmor', T.k); } }
  if (T.cfg.passive === 'armor' && !o.pierce && dmg > 3) { dmg -= 2.5; setStatus(T, S.lang !== 'ru' ? 'armour: −2.5' : 'броня: −2,5', 0.8); explain(S, 'armor', T.k); }
  if (T.cfg.passive === 'cap' && !o.pierce && dmg > 7) { dmg = 7; setStatus(T, S.lang !== 'ru' ? 'yoga: max 7' : 'йога: не больше 7', 0.9); explain(S, 'cap', T.k); }
  if (T.cfg.minDmg && !o.pierce && dmg * S.dmgScale < T.cfg.minDmg) { fxText(S, tgt.x, tgt.y + 0.9, S.lang !== 'ru' ? 'no effect' : 'не пробил', T.cfg.color, 42); explain(S, 'inf', T.k); ev(S, 'immune'); return; }
  const hp0 = T.hp;
  if (dmg > 0) damageTeam(S, T, dmg, tgt, A.cfg.color);
  const dealt = Math.max(0, hp0 - Math.max(0, T.hp));
  if (T.cfg.passive === 'thorns' && dealt > 0 && !A.dead && A !== T) { const sb = (src && src.alive) ? src : bodyOf(S, ka); if (sb) { damageTeam(S, A, Math.max(1, dealt * 0.25), sb, T.cfg.color, { small: true }); fxRing(S, sb.x, sb.y, T.cfg.color, 'reflect', 0.4); explain(S, 'thorns', T.k); } }
  if (A.cfg.passive === 'vamp' && dealt > 0 && !A.dead) { const hv = Math.min(A.maxHp - A.hp, Math.max(1, Math.round(dealt * 0.3))); if (hv > 0) { A.hp += hv; const ab = (src && src.alive) ? src : bodyOf(S, ka); if (ab) fxText(S, ab.x, ab.y + 0.9, '+' + hv, '#1a8f5a', 44); explain(S, 'vamp', A.k); } }
  if (o.burn && !T.dead) applyBurn(S, T, o.burn, A.cfg.color);
  if (factHit && A.fact < 5) { A.fact++; setStatus(A, tr(S, 'factUp', A.fact, FACT_DMG[A.fact]), 1.0); }
  if (o.kind === 'knock' && src && tgt.alive) {
    const dx = tgt.x - src.x, dy = tgt.y - src.y, d = Math.hypot(dx, dy) || 1;
    tgt.x = clamp(tgt.x + dx / d * 1.1, -U + tgt.r, U - tgt.r); tgt.y = clamp(tgt.y + dy / d * 1.1, -U + tgt.r, U - tgt.r); tgt.vx += dx / d * 6; tgt.vy += dy / d * 6; explain(S, 'knock', A.k);
  }
  if (A.cfg.passive === 'delta' && dmg > 0) explain(S, 'delta', A.k);
  if (A.cfg.passive === 'growth' && S.fightT > 12) explain(S, 'growth', A.k);
  if (A.cfg.passive === 'marathon' && S.fightT > 15) explain(S, 'marathon', A.k);
  if (o.kind === 'nullify' && !T.dead) { T.nullT = 1.3; fxText(S, tgt.x, tgt.y + 1.3, '= 0', A.cfg.color, 50); setStatus(T, tr(S, 'nulled'), 1.3); explain(S, 'null', A.k); }
  if (o.kind === 'freeze' && !T.dead) { T.slowT = S.arena === 'winter' ? 2.4 : 1.6; fxText(S, tgt.x, tgt.y + 1.3, tr(S, 'freeze'), '#5fb6ff', 48); fxRing(S, tgt.x, tgt.y, '#7cc8ff', 'hex', 0.6); setStatus(T, tr(S, 'frozen'), 1.6); explain(S, 'freeze', A.k); }
}
function applyBurn(S, T, burn, color) { T.burn = { dmg: burn.dmg, left: burn.ticks, timer: 0.5, color }; setStatus(T, tr(S, 'burning'), 1.6); }
function damageTeam(S, T, dmg, pos, color, opt) {
  if (S.phase !== 'fight' || T.dead) return;
  dmg = Math.max(1, Math.round(dmg * (opt && opt.small ? 1 : S.dmgScale)));
  if (T.cfg.passive === 'sisu' && T.hp < T.maxHp / 3 && dmg > 1) { dmg = Math.max(1, Math.round(dmg * 0.5)); explain(S, 'sisu', T.k); }
  T.hp -= dmg; T.hitFlash = 0.3;
  if (T.cfg.passive === 'second' && !T.secondUsed && T.hp > 0 && T.hp < T.maxHp * 0.25) { T.secondUsed = true; const hv = Math.round(T.maxHp * 0.25); T.hp += hv; if (pos) fxText(S, pos.x, pos.y + 1.2, '+' + hv, '#1a8f5a', 56); setStatus(T, S.lang !== 'ru' ? 'second wind!' : 'второе дыхание!', 1.4); ev(S, 'pickup'); explain(S, 'second', T.k); }
  fxText(S, pos.x + (Math.random() - 0.5) * 0.3, pos.y + 0.6, '−' + dmg, color, opt && opt.small ? 44 : Math.min(96, 52 + dmg * 2.2));
  if (!(opt && opt.small)) { S.shake = Math.min(1, S.shake + dmg / 30); ev(S, 'hit', { dmg }); } else ev(S, 'tick');
  if (pos.flash !== undefined) pos.flash = 0.2;
  if (T.cfg.passive === 'nest' && T.layers > 0 && T.hp > 0 && T.hp < T.maxHp * T.layers / 3) {
    T.layers--; T.shield = true; T.cfg = Object.assign({}, T.cfg, { speed: T.cfg.speed * 1.12 });
    for (const b of S.bodies) if (b.alive && b.team === T.k && !b.summon) { b.r *= 0.86; fxRing(S, b.x, b.y, T.cfg.color, 'hex', 0.7); fxText(S, b.x, b.y + 1.1, tr(S, 'nest'), T.cfg.color, 46); }
    setStatus(T, tr(S, 'nest'), 1.4); ev(S, 'split'); explain(S, 'nest', T.k);
  }
  checkDeath(S, T);
}
function killBody(S, b) { b.alive = false; if (!S.headless) fxBurst(S, b.x, b.y, S.teams[b.team].cfg.color, 18, 4); }
function checkDeath(S, T) {
  if (T.dead) return;
  const alive = S.bodies.some(b => b.alive && b.team === T.k && !b.summon);
  if (T.hp <= 0 || !alive) {
    const lb = bodyOf(S, T.k) || S.bodies.find(b => b.team === T.k);
    T.hp = 0; T.dead = true;
    if (lb) S.lastKO = { x: lb.x, y: lb.y };
    S.elim.push(T.k);
    if (lb && S.mode !== 'duel') fxText(S, lb.x, lb.y + 1.0, tr(S, 'out'), T.cfg.color, 54);
    S.feed.push({ k: T.k, t: S.t });
    for (const b of S.bodies) if (b.team === T.k && b.alive) killBody(S, b);
    ev(S, 'ko');
    const sides = new Set(S.teams.filter(u => !u.dead).map(u => u.side));
    if (sides.size <= 1) win(S, sides.size ? [...sides][0] : (S.teams.find(u => u.side !== T.side) || T).side);
  }
}
function splitPoly(S, b, A) {
  const T = S.teams[b.team], n = b.degree;
  T.hp -= T.unitHp; T.hitFlash = 0.3;
  S.lastKO = { x: b.x, y: b.y };
  killBody(S, b);
  fxText(S, b.x, b.y + 0.6, '−' + T.unitHp, A.cfg.color, 56);
  const kids = T.cfg.kids || n;
  if (n > 0) {
    for (let i = 0; i < kids; i++) {
      const a = (i / kids) * Math.PI * 2 + S.rng() * 0.8, sp = 2.4;
      spawnBody(S, T.k, { x: clamp(b.x + Math.cos(a) * 0.5, -U + 0.5, U - 0.5), y: clamp(b.y + Math.sin(a) * 0.5, -U + 0.5, U - 0.5), degree: n - 1, cd: 0.7 + S.rng() * 1.0, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp });
    }
    fxText(S, b.x, b.y + 1.3, '×' + kids, T.cfg.color, 50);
    setStatus(T, tr(S, 'split'), 1.3); ev(S, 'split'); explain(S, 'hydra', T.k, { n });
  } else {
    fxText(S, b.x, b.y + 1.2, '×', T.cfg.color, 60); ev(S, 'pop');
  }
  checkDeath(S, T);
}
function hydraSplit(S, b, T) {
  const n = b.degree, kids = T.cfg.kids || 2;
  killBody(S, b);
  for (let i = 0; i < kids; i++) {
    const a = (i / kids) * Math.PI * 2 + S.rng() * 0.8, sp = 2.4;
    spawnBody(S, T.k, { x: clamp(b.x + Math.cos(a) * 0.5, -U + 0.5, U - 0.5), y: clamp(b.y + Math.sin(a) * 0.5, -U + 0.5, U - 0.5), degree: n - 1, cd: 0.7 + S.rng() * 1.0, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp });
  }
  fxText(S, b.x, b.y + 1.3, '×' + kids, T.cfg.color, 50);
  setStatus(T, tr(S, 'split'), 1.3); ev(S, 'split'); explain(S, 'hydra', T.k, { n });
}
function spawnC(S, k, src) {
  const n = S.bodies.filter(b => b.alive && b.team === k && b.summon).length;
  if (n >= 2 || S.rng() > 0.55) return;
  const T = S.teams[k], p = src && src.alive ? src : bodyOf(S, k); if (!p) return;
  spawnBody(S, k, { x: p.x, y: p.y, r: 0.36, label: T.cfg.label + ':fan', summon: true, cd: 1.0 + S.rng(),
    cfg: Object.assign({}, T.cfg, { speed: 1.9, passive: 'none', r: 0.36, attacks: undefined, attack: { type: 'graph', expr: '0', dmg: 4, cd: 2.6 } }) });
  fxText(S, p.x, p.y + 1.0, T.cfg.fanWord ? (S.lang === 'ru' ? T.cfg.fanWord[0] : T.cfg.fanWord[1]) : tr(S, 'fans'), T.cfg.color, 46); ev(S, 'split'); explain(S, 'plusC', k);
}

// ---- скорость: мороз, зима, марафон ----
function speedMul(S, b) {
  const T = S.teams[b.team]; let m = T.slowT > 0 ? 0.5 : 1;
  if (S.arena === 'winter') m *= 0.9;
  if (T.cfg.passive === 'marathon' && S.phase === 'fight') m *= 1 + Math.min(0.4, S.fightT / 60);
  return m;
}
// ---- сумо: удары толкают, вылет за круг — поражение ----
const SUMO_R = 4.3;
function sumoPush(S, A, src, tgt, dmg, o) {
  const fromX = src ? src.x : tgt.x - tgt.vx, fromY = src ? src.y : tgt.y - tgt.vy;
  let dx = tgt.x - fromX, dy = tgt.y - fromY; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
  const T = S.teams[tgt.team]; let pow = (2.4 + dmg * 0.42) * Math.sqrt(90 / Math.max(40, T.maxHp));
  if (T.cfg.passive === 'logArmor' || T.cfg.passive === 'cap') pow *= 0.75;
  if (T.shield && !o.pierce) { T.shield = false; pow *= 0.3; fxText(S, tgt.x, tgt.y + 0.8, tr(S, 'shieldUsed'), T.cfg.color, 40); }
  tgt.kx = (tgt.kx || 0) + dx * pow; tgt.ky = (tgt.ky || 0) + dy * pow; tgt.flash = 0.2;
  fxBurst(S, tgt.x, tgt.y, A.cfg.color, 8, 3); fxText(S, tgt.x, tgt.y + 0.7, '→', A.cfg.color, 52);
  S.shake = Math.min(1, S.shake + pow / 14); ev(S, 'hit', { dmg: pow * 2 });
  if (o.kind === 'freeze') T.slowT = 1.6;
}
function sumoCheck(S) {
  for (const b of S.bodies) {
    if (!b.alive || b.summon) continue; const T = S.teams[b.team]; if (T.dead) continue;
    if (Math.hypot(b.x, b.y) > SUMO_R + b.r * 0.5) {
      killBody(S, b);
      if (!S.bodies.some(o => o.alive && o.team === T.k && !o.summon)) { T.hp = 0; fxText(S, b.x * 0.85, b.y * 0.85, S.lang !== 'ru' ? 'OUT!' : 'АУТ!', T.cfg.color, 60); checkDeath(S, T); }
    }
  }
}
// ---- футбол: мяч, ворота, счёт ----
const GOAL_W = 1.7, BALL_R = 0.3;
function initFootball(S) {
  S.score = [0, 0]; S.ball = { x: 0, y: 0, vx: 0, vy: 0, r: BALL_R, a: 0 }; S.goalT = 0; S.lastTouch = -1;
  S.teams.forEach(T => { T.hp = T.maxHp = 100; });
}
function kickoff(S, conceded) {
  const B = S.ball; B.x = 0; B.y = 0; B.vx = 0; B.vy = 0;
  S.bodies.forEach(b => { const T = S.teams[b.team], same = S.teams.filter(u => u.side === T.side), j = same.indexOf(T), m = same.length;
    b.x = (T.side === 0 ? -1 : 1) * (2.4 + (b.summon ? 1 : 0)); b.y = m === 1 ? 0 : (j - (m - 1) / 2) * 2.2; b.vx = b.vy = 0; b.st = 'idle'; b.cd = 0.4 + S.rng() * 0.6; b.trail = []; });
  if (conceded != null) S.bodies.filter(b => S.teams[b.team].side === conceded).forEach(b => { b.x *= 0.6; });
}
function stepFootball(S, dt, fighting) {
  const B = S.ball;
  if (S.goalT > 0) { S.goalT -= dt; if (S.goalT <= 0) kickoff(S, S.lastGoalBy == null ? null : 1 - S.lastGoalBy); return; }
  for (const b of S.bodies) {
    if (!b.alive) continue; const T = S.teams[b.team], c = T.cfg, side = T.side;
    b.flash = Math.max(0, b.flash - dt); b.st_t -= dt;
    const gx = side === 0 ? U : -U, ownX = -gx;
    let dx = gx - B.x, dy = -B.y; const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
    const back = b.r + B.r + 0.3;
    let px = B.x - dx * back, py = B.y - dy * back;
    // если стоим между мячом и чужими воротами — обходим мяч сбоку
    const rx = b.x - B.x, ry = b.y - B.y, front = rx * dx + ry * dy;
    if (front > -0.1) { const side2 = (rx * -dy + ry * dx) >= 0 ? 1 : -1; px = B.x - dx * back * 0.3 - dy * side2 * (back + 0.5); py = B.y - dy * back * 0.3 + dx * side2 * (back + 0.5); }
    px = clamp(px, -U + b.r, U - b.r); py = clamp(py, -U + b.r, U - b.r);
    const mates = S.bodies.filter(o => o.alive && S.teams[o.team].side === side);
    const closest = mates.reduce((a, o) => (Math.hypot(o.x - B.x, o.y - B.y) < Math.hypot(a.x - B.x, a.y - B.y) ? o : a), b);
    let tx = px, ty = py;
    if (closest !== b) { tx = (B.x + ownX * 1.4) / 2.4; ty = B.y * 0.5 + (b.id % 2 ? 1.4 : -1.4); }
    const spd = c.speed * speedMul(S, b) * 1.05;
    if (b.st === 'dash') { if (b.st_t <= 0) { b.st = 'idle'; b.cd = (atkOf(b, c).cd || 1) * 0.5 * (0.85 + 0.3 * S.rng()); } }
    else {
      let ax = tx - b.x, ay = ty - b.y; const d = Math.hypot(ax, ay) || 1;
      b.wa += (S.rng() - 0.5) * dt * 4;
      b.vx += (ax / d * Math.min(1, d * 1.5) * 16 + Math.cos(b.wa) * 0.8) * dt; b.vy += (ay / d * Math.min(1, d * 1.5) * 16 + Math.sin(b.wa) * 0.8) * dt;
      const sp = Math.hypot(b.vx, b.vy); if (sp > spd) { b.vx *= spd / sp; b.vy *= spd / sp; }
      b.cd -= dt;
      const bx = B.x - b.x, by = B.y - b.y, bd = Math.hypot(bx, by) || 1, behind = (bx * dx + by * dy) / bd;
      if (fighting && closest === b && b.cd <= 0 && bd < 1.9 && behind > 0.45) {
        const aimX = B.x + dx * 0.4 - b.x, aimY = B.y + dy * 0.4 - b.y, al = Math.hypot(aimX, aimY) || 1;
        b.vx = aimX / al * spd * 3.4; b.vy = aimY / al * spd * 3.4; b.st = 'dash'; b.st_t = 0.34; ev(S, 'dash');
      }
    }
    b.x += b.vx * dt; b.y += b.vy * dt;
    const lim = U - b.r; if (b.x < -lim) { b.x = -lim; b.vx = Math.abs(b.vx); } if (b.x > lim) { b.x = lim; b.vx = -Math.abs(b.vx); } if (b.y < -lim) { b.y = -lim; b.vy = Math.abs(b.vy); } if (b.y > lim) { b.y = lim; b.vy = -Math.abs(b.vy); }
    if (!S.headless) { b.trail.push(b.x, b.y); if (b.trail.length > 36) b.trail.splice(0, 2); }
    // касание мяча
    const ex = B.x - b.x, ey = B.y - b.y, ed = Math.hypot(ex, ey), rr = b.r + B.r;
    if (ed < rr && ed > 1e-6) {
      const nx = ex / ed, ny = ey / ed; B.x = b.x + nx * rr; B.y = b.y + ny * rr;
      const atk = atkOf(b, c), power = clamp(5 + (atk.dmg || 7) * 0.3, 6, 11) * (b.st === 'dash' ? 1 : 0.45);
      const rel = (b.vx - B.vx) * nx + (b.vy - B.vy) * ny;
      if (b.st === 'dash') {
        const gdx = gx - B.x, gdy = (S.rng() * 2 - 1) * (S.goalW || GOAL_W) * 0.9 - B.y, ga = Math.atan2(gdy, gdx), dist = Math.hypot(gdx, gdy);
        const ang = ga + (S.rng() * 2 - 1) * Math.min(0.5, 0.08 + dist * 0.035), shot = power * (1.05 + Math.min(0.6, dist / 12));
        // удар направлен в сторону ворот, если бьём спереди; иначе по нормали касания
        const ok = (Math.cos(ang) * nx + Math.sin(ang) * ny) > 0.2;
        B.vx = ok ? Math.cos(ang) * shot : nx * shot; B.vy = ok ? Math.sin(ang) * shot : ny * shot;
      } else { const imp = Math.max(0, rel) * 0.9 + power * 0.25; B.vx += nx * imp; B.vy += ny * imp; }
      S.lastTouch = side;
      if (b.st === 'dash') { b.st = 'idle'; b.cd = (atk.cd || 1) * 0.55; b.vx *= 0.3; b.vy *= 0.3; ev(S, 'hit', { dmg: 6 }); fxBurst(S, B.x, B.y, c.color, 6, 2.5); }
      else ev(S, 'tick');
    }
  }
  collide(S);
  // мяч
  B.x += B.vx * dt; B.y += B.vy * dt; const fr = Math.pow(0.55, dt); B.vx *= fr; B.vy *= fr; B.a += Math.hypot(B.vx, B.vy) * dt * 2 * Math.sign(B.vx || 1);
  const sp = Math.hypot(B.vx, B.vy); if (sp > 16) { B.vx *= 16 / sp; B.vy *= 16 / sp; }
  if (B.y < -U + B.r) { B.y = -U + B.r; B.vy = Math.abs(B.vy) * 0.8; } if (B.y > U - B.r) { B.y = U - B.r; B.vy = -Math.abs(B.vy) * 0.8; }
  const inMouth = Math.abs(B.y) < (S.goalW || GOAL_W) - B.r * 0.3;
  if (fighting && inMouth && (B.x > U || B.x < -U)) {
    if (S.fb && S.rng() < (S.fb.save ?? 0.68)) { const sg = B.x > U ? 1 : -1; B.x = sg * (U - B.r - 0.05); B.vx = -sg * Math.max(3, Math.abs(B.vx) * 0.6); B.vy += (S.rng() - 0.5) * 6; fxText(S, sg * (U - 1.4), B.y + 0.9, ({ ru: 'СЕЙВ!', en: 'SAVE!', es: '¡PARADA!', pt: 'DEFESA!' })[S.lang], '#5c6670', 56, { life: 0.9 }); ev(S, 'reflect'); return; }
    const by = B.x > U ? 0 : 1; S.score[by]++; S.lastGoalBy = by; S.goalT = 1.6; S.lastKO = { x: B.x > 0 ? U - 0.5 : -U + 0.5, y: B.y };
    const T = S.teams.find(u => u.side === by); fxText(S, B.x > 0 ? U - 1.5 : -U + 1.5, B.y + 1.2, ({ ru: 'ГОЛ!', en: 'GOAL!', es: '¡GOL!', pt: 'GOL!' })[S.lang], T ? T.base.color : '#333', 90, { life: 1.5 });
    S.shake = 1; ev(S, 'goal', { side: by }); ev(S, 'ko'); setStatus(T, ({ ru: 'гол!', en: 'goal!', es: '¡gol!', pt: 'gol!' })[S.lang], 1.6); explain(S, 'goal', T.k);
    S.teams.forEach(u => { if (u.side !== by) { u.hp = Math.max(0, u.hp); u.hitFlash = 0.3; } });
    if (S.fb) { if (S.fightT > S.fb.time && S.score[0] !== S.score[1]) win(S, by); }
    else if (S.score[by] >= 3 || (S.fightT > 60 && S.score[0] !== S.score[1])) { win(S, by); }
    return;
  }
  if (!inMouth) { if (B.x < -U + B.r) { B.x = -U + B.r; B.vx = Math.abs(B.vx) * 0.8; } if (B.x > U - B.r) { B.x = U - B.r; B.vx = -Math.abs(B.vx) * 0.8; } }
  if (!fighting) return;
}

// ---- безголовый прогон ----
function simulate(setup, seed) {
  const S = makeBattle(Object.assign({}, setup, { replay: false, intro: false }), seed, true); startBattle(S);
  let n = 0; while ((S.phase === 'countdown' || S.phase === 'fight') && n < 60 * 160) { step(S, STEP); n++; }
  const sh = []; for (let s = 0; s < S.nSides; s++) sh.push(sideHp(S, s));
  if (S.mode === 'football') { const sc = S.score, w = S.winner; return { winner: w, hpFrac: Math.min(1, Math.abs(sc[0] - sc[1]) / 4), hp: sc[w] || 0, sideHp: sc.slice(), sideFrac: [0, 0], hpA: sc[0], hpB: sc[1], dur: S.fightDur || S.fightT, timeout: false, order: [], score: sc.slice(), shootout: !!S.shootout, pens: S.pens || null, draw: !!S.draw }; }
  const W = S.winner >= 0 ? sh[S.winner] : { h: 0, f: 0 };
  const order = S.elim.slice(); S.teams.forEach(T => { if (!order.includes(T.k)) order.push(T.k); });
  return { winner: S.winner, hpFrac: W.f, hp: Math.ceil(W.h), sideHp: sh.map(x => Math.ceil(x.h)), sideFrac: sh.map(x => x.f), hpA: sh[0] ? sh[0].h : 0, hpB: sh[1] ? sh[1].h : 0, dur: S.fightDur || S.fightT, timeout: S.timeout, order };
}
const duelSetup = (A, B, extra) => Object.assign({ mode: 'duel', sides: [[A], [B]] }, extra || {});

if (typeof module !== 'undefined') module.exports = { ROSTER, MATH_ROSTER, BOSSES, COMBOS, pressAbility, simulate, duelSetup, compileExpr, makeBattle, startBattle, step, STEP };
