// Usage: npm run images -- YOUR_PIXABAY_KEY     (free key: https://pixabay.com/api/docs/)
// Finds one photo per dish by its own name, checks the photo's tags, never reuses a photo, saves it in public/dishes/.
import fs from 'node:fs'
import { ALL } from '../src/data.js'
const KEY = process.argv[2] || process.env.PIXABAY_KEY
if (!KEY) { console.log('Usage: npm run images -- YOUR_PIXABAY_KEY'); process.exit(1) }
fs.mkdirSync('public/dishes', { recursive: true })
const MF = 'src/manifest.json'
const manifest = fs.existsSync(MF) ? JSON.parse(fs.readFileSync(MF, 'utf8')) : {}
const meta = fs.existsSync('scripts/meta.json') ? JSON.parse(fs.readFileSync('scripts/meta.json', 'utf8')) : {}
const FIX = { biriyani: 'biryani', panner: 'paneer', dhal: 'dal', chappathi: 'chapati', kothamalli: 'coriander', shangai: 'shanghai', schezwan: 'szechuan', pakoda: 'pakora', pappad: 'papad', naatukozhi: 'country chicken', pozichakozhi: 'kerala fried chicken', nethili: 'anchovy fish', mughali: 'mughlai', burge: 'bhurji', podimass: 'bhurji', haryali: 'hariyali', tangri: 'tangdi', pasinda: 'paneer' }
const STOP = new Set(['dry', 'with', 'and', 'half', 'full', 'spl', 'pcs', 'boneless', 'special', 'veg', 'non'])
// Special searches for dishes whose plain name gives poor results: [search text, tag words to avoid]
const Q = {
  'Chicken 65': ['chicken 65 indian', 'leg|drumstick|wing'], 'Gobi 65': ['gobi 65 cauliflower fry'], 'Fish 65': ['fish 65 fry'], 'Prawn 65': ['prawn fry indian'],
  'Egg Burge (Podimass)': ['egg bhurji'], 'Egg Burge Masala': ['egg bhurji'], 'Tomato Soup': ['tomato soup bowl'], 'Green Salad': ['green salad plate'],
  'Steam Rice': ['steamed white rice bowl'], 'Ghee Rice': ['ghee rice indian'], 'Jeera Rice': ['jeera rice'], 'Mineral Water': ['water bottle glass'],
  'Soft Drinks': ['cola glass ice'], 'Sweet Lassi': ['sweet lassi glass'], 'Fresh Lemon Soda': ['lemon soda glass'], 'Fresh Lemon Juice': ['lemon juice glass'],
  'French Fries': ['french fries plate'], 'Masala Pappad': ['masala papad'], 'Roasted Pappad': ['papad'], 'Cassata Slice': ['cassata ice cream slice'],
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const norm = (s) => s.toLowerCase().replace(/\(.*?\)/g, ' ').split('/')[0].replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).map((w) => FIX[w] ?? w).join(' ').replace(/\s+/g, ' ').trim()
const used = new Set(Object.values(meta).map((m) => m.id))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function search(q) {
  const url = `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(q)}&image_type=photo&category=food&orientation=horizontal&min_width=900&safesearch=true&per_page=40`
  const r = await fetch(url)
  if (r.status === 429) { console.log('\nRate limit reached. Wait one minute and run the same command again; it resumes.'); process.exit(0) }
  if (!r.ok) { console.log('\nPixabay error', r.status, '- check your key.'); process.exit(1) }
  await sleep(700)
  return (await r.json()).hits || []
}
function best(hits, toks, avoid) {
  const need = Math.min(2, toks.length)
  let top = null, topScore = 0
  for (const h of hits) {
    const t = h.tags.toLowerCase()
    if (used.has(h.id) || (avoid && new RegExp(avoid).test(t))) continue
    const s = toks.filter((k) => t.includes(k)).length
    if (s >= need && s > topScore) { top = h; topScore = s }
  }
  return top
}

let done = 0
for (const item of ALL) {
  if (manifest[item.name]) continue
  const n = norm(item.name), toks = n.split(' ').filter((w) => w.length > 2 && !STOP.has(w))
  const [special, avoid] = Q[item.name] || []
  const queries = [...new Set([special, `${n} indian`, n].filter(Boolean))]
  let hit = null
  for (const q of queries) { hit = best(await search(q), special ? special.split(' ').filter((w) => w.length > 2) : toks, avoid); if (hit) break }
  if (!hit) { console.log('no match :', item.name); continue }
  const file = `public/dishes/${slug(item.name)}.jpg`
  fs.writeFileSync(file, Buffer.from(await (await fetch(hit.largeImageURL)).arrayBuffer()))
  used.add(hit.id); manifest[item.name] = '/dishes/' + slug(item.name) + '.jpg'; meta[item.name] = { id: hit.id, tags: hit.tags }
  fs.writeFileSync(MF, JSON.stringify(manifest, null, 1)); fs.writeFileSync('scripts/meta.json', JSON.stringify(meta, null, 1))
  console.log('ok       :', item.name, '<-', hit.tags); done++
}
// Review page: open review.html in your browser to check every photo against its dish name.
const rows = ALL.map((i) => `<tr><td>${i.name}</td><td>${manifest[i.name] ? `<img src="public${manifest[i.name]}" width="260">` : '<b style="color:#c00">NO PHOTO</b>'}</td><td>${meta[i.name]?.tags || ''}</td></tr>`).join('')
fs.writeFileSync('review.html', `<meta charset="utf-8"><title>Photo review</title><style>body{font:14px sans-serif}td{border-bottom:1px solid #ccc;padding:6px}</style><h2>Check each photo matches its dish</h2><table>${rows}</table>`)
console.log(`\nDone. ${done} new photos. Open review.html to check them. Fix any dish in src/manual.json.`)
