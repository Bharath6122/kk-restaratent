import { useState, useMemo } from 'react'
import { MENU, ALL } from './data.js'
import { imageFor, HERO } from './images.js'

function Photo({ src, alt, className = '' }) {
  const [bad, setBad] = useState(false)
  return (
    <div className={'photo ' + className}>
      {src && !bad ? <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
        : <div className="ph"><span>KK</span></div>}
    </div>
  )
}

function Card({ item }) {
  return (
    <article className="card">
      <div className="pic">
        <Photo src={imageFor(item.name, item.c)} alt={item.name} />
        <span className={'mark ' + (item.veg ? 'veg' : 'nv')} title={item.veg ? 'Vegetarian' : 'Non-vegetarian'} />
      </div>
      <div className="info">
        <h3>{item.name}</h3>
        <span className="price">₹ {item.price}</span>
      </div>
    </article>
  )
}

const SIGNATURE = ['Chicken Biriyani', 'Butter Chicken Masala', 'Chicken 65', 'Prawn 65', 'Paneer Butter Masala', 'Chicken Tangri Kebab (3 pcs)']
  .map((n) => ALL.find((i) => i.name === n))

export default function App() {
  const [cat, setCat] = useState('All')
  const [type, setType] = useState('all')
  const [q, setQ] = useState('')
  const pickType = (t) => { setType(t); setCat('All') } // reset tab so a filter never lands on an empty category
  const shown = useMemo(() => MENU
    .filter((c) => cat === 'All' || c.name === cat)
    .map((c) => ({ ...c, items: c.items.filter((i) =>
      (type === 'all' || (type === 'veg' && i.veg) || (type === 'nv' && !i.veg)) &&
      i.name.toLowerCase().includes(q.trim().toLowerCase())) }))
    .filter((c) => c.items.length), [cat, type, q])

  return (
    <>
      <div className="topbar">
        <span>Opp. Vivira Mall, OMR, Navalur, Chennai</span>
        <span>Lunch 12:00–3:00 PM · Dinner 7:00–10:30 PM</span>
        <a href="tel:+917339461118">Call +91 73394 61118</a>
      </div>
      <header className="nav">
        <a href="#top" className="brand">KK <small>Restaurant</small></a>
        <nav><a href="#signature">Signature</a><a href="#menu">Menu</a><a href="#contact">Visit us</a>
          <a className="navcta" href="tel:+917339461118">Call to order</a></nav>
      </header>

      <section className="hero" id="top">
        <Photo src={HERO} alt="Indian feast" className="herobg" />
        <div className="shade" />
        <div className="frame">
          <p className="sub">Multi Cuisine Restaurant · Navalur, Chennai</p>
          <h1>KK Restaurant</h1>
          <p className="tag">Chettinad classics, tandoori kebabs, biriyani and Indo-Chinese favourites, cooked fresh and served with royal hospitality.</p>
          <div className="btns"><a className="cta" href="#menu">Explore the menu</a><a className="ghost" href="#contact">Find us</a></div>
        </div>
      </section>

      <section className="facts">
        <div><b>180+</b><span>dishes on our menu</span></div>
        <div><b>Veg &amp; Non-Veg</b><span>every category</span></div>
        <div><b>Lunch &amp; Dinner</b><span>12–3 PM and 7–10:30 PM</span></div>
        <div><b>Dine-in</b><span>1st Floor, OMR Navalur</span></div>
      </section>

      <section className="wrap" id="signature">
        <h2 className="title">Signature Dishes</h2>
        <p className="lead">The plates our guests ask for again and again.</p>
        <div className="grid">{SIGNATURE.map((i) => <Card key={i.name} item={i} />)}</div>
      </section>

      <main id="menu" className="wrap">
        <h2 className="title">Our Menu</h2>
        <div className="tools">
          <input aria-label="Search dishes" placeholder="Search a dish…" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="seg">
            {[['all', 'All'], ['veg', 'Veg'], ['nv', 'Non-Veg']].map(([k, t]) =>
              <button key={k} className={type === k ? 'on' : ''} onClick={() => pickType(k)}>{t}</button>)}
          </div>
        </div>
        <div className="tabs">
          {['All', ...MENU.map((c) => c.name)].map((c) =>
            <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        {shown.length === 0 && (
          <p className="empty">No dishes match here. <button className="link" onClick={() => { setCat('All'); setType('all'); setQ('') }}>Show the full menu</button></p>)}
        {shown.map((c) => (
          <section key={c.name}>
            <h2 className="cat"><span>{c.name}</span></h2>
            <div className="grid">{c.items.map((i) => <Card key={i.name} item={i} />)}</div>
          </section>
        ))}
      </main>

      <footer id="contact">
        <h2 className="title">Visit Us</h2>
        <div className="visit">
          <div className="details">
            <p><b>Address</b><br />Pole Star, Bhoomi &amp; Buildings, 1st Floor, OMR, Navalur, Chennai – 600130 (Opp. to Vivira Mall)</p>
            <p><b>Timings</b><br />Lunch 12:00–3:00 PM<br />Dinner 7:00–10:30 PM</p>
            <p><b>Contact</b><br /><a href="tel:+917339461118">+91 73394 61118</a><br /><a href="tel:+919841008117">+91 98410 08117</a><br />
              <a href="mailto:kkvijayan1981@gmail.com">kkvijayan1981@gmail.com</a></p>
          </div>
          <iframe title="KK Restaurant location" loading="lazy" src="https://maps.google.com/maps?q=Vivira%20Mall%20Navalur%20Chennai&output=embed" />
        </div>
        <small>© {new Date().getFullYear()} KK Restaurant, Multi Cuisine · Proprietor: K. Vijayan</small>
      </footer>
      <a className="fab" href="tel:+917339461118" aria-label="Call KK Restaurant">Call</a>
    </>
  )
}
