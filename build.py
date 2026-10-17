#!/usr/bin/env python3
"""Сборка сайта: python3 build.py [папка=dist]. Склеивает src/ в один index.html и кладёт рядом vendor/.
Если есть data/countries.json (его обновляет tools/update-data.mjs), данные встраиваются в страницу."""
import os, sys, shutil, json
ROOT = os.path.dirname(os.path.abspath(__file__)); S = os.path.join(ROOT, 'src')
OUT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'dist'))
rd = lambda n: open(os.path.join(S, n), encoding='utf-8').read()
s = rd('page.html'); eng = rd('engine_head.js') + rd('engine_tail.js')
a = s.index('// ===================== Флаги и шары-страны'); b = s.index('// ===================== Примитивы')
s = s[:a] + rd('flags.js') + '\n' + s[b:]
s = s.replace('/*FACTS*/', rd('facts.json'), 1).replace('/*CSS*/', rd('base.css'), 1).replace('/*ENGINE*/', eng, 1)
live = os.path.join(ROOT, 'data', 'countries.json')
if os.path.exists(live):
    d = json.load(open(live, encoding='utf-8'))
    s = s.replace('/*LIVE*/null', json.dumps(d, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'), 1)
os.makedirs(os.path.join(OUT, 'vendor'), exist_ok=True)
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(s)
open(os.path.join(ROOT, 'tools', 'engine.js'), 'w', encoding='utf-8').write(eng)
for f in os.listdir(os.path.join(ROOT, 'vendor')): shutil.copy(os.path.join(ROOT, 'vendor', f), os.path.join(OUT, 'vendor', f))
print(OUT, len(s))
