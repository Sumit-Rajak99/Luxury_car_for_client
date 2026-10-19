import { useMemo, useState } from 'react'

const cars = [
  { id: 1, name: 'Mercedes-Benz S-Class', trim: 'S 350d · AMG Line', year: 2023, km: '18,400 km', fuel: 'Diesel', transmission: 'Automatic', price: 11800000, priceLabel: '₹1.18 Cr', tag: 'EDITOR’S PICK', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85', color: 'Obsidian Black' },
  { id: 2, name: 'BMW 5 Series', trim: '530Li · M Sport', year: 2022, km: '22,100 km', fuel: 'Petrol', transmission: 'Automatic', price: 6750000, priceLabel: '₹67.5 Lakh', tag: 'CERTIFIED', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85', color: 'Carbon Black' },
  { id: 3, name: 'Porsche 911 Carrera', trim: 'Carrera · 3.0L', year: 2021, km: '12,600 km', fuel: 'Petrol', transmission: 'PDK Automatic', price: 18500000, priceLabel: '₹1.85 Cr', tag: 'RARE FIND', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85', color: 'GT Silver' },
  { id: 4, name: 'Range Rover Sport', trim: 'Dynamic SE · 3.0 Diesel', year: 2023, km: '15,900 km', fuel: 'Diesel', transmission: 'Automatic', price: 14200000, priceLabel: '₹1.42 Cr', tag: 'NEW ARRIVAL', image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=85', color: 'Santorini Black' },
  { id: 5, name: 'Audi A6', trim: 'Technology · 45 TFSI', year: 2022, km: '26,300 km', fuel: 'Petrol', transmission: 'Automatic', price: 5350000, priceLabel: '₹53.5 Lakh', tag: 'GREAT VALUE', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85', color: 'Mythos Black' },
  { id: 6, name: 'Lexus ES 300h', trim: 'Luxury · Hybrid', year: 2023, km: '11,200 km', fuel: 'Hybrid', transmission: 'Automatic', price: 6250000, priceLabel: '₹62.5 Lakh', tag: 'LOW MILEAGE', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85', color: 'Graphite Black' },
]
const formatPrice = (value) => value >= 10000000 ? `₹${(value / 10000000).toFixed(2).replace(/0$/, '').replace(/\.$/, '')} Cr` : `₹${(value / 100000).toFixed(1)} Lakh`

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [fuel, setFuel] = useState('All fuel types')
  const [sort, setSort] = useState('Featured')
  const [budget, setBudget] = useState('Any budget')
  const [saved, setSaved] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [toast, setToast] = useState('')

  const visibleCars = useMemo(() => {
    let result = cars.filter(car => `${car.name} ${car.trim} ${car.year}`.toLowerCase().includes(search.toLowerCase()))
    if (fuel !== 'All fuel types') result = result.filter(car => car.fuel === fuel)
    if (budget === 'Under ₹60 Lakh') result = result.filter(car => car.price < 6000000)
    if (budget === '₹60 Lakh – ₹1 Cr') result = result.filter(car => car.price >= 6000000 && car.price <= 10000000)
    if (budget === 'Above ₹1 Cr') result = result.filter(car => car.price > 10000000)
    if (sort === 'Price: Low to High') result.sort((a, b) => a.price - b.price)
    if (sort === 'Price: High to Low') result.sort((a, b) => b.price - a.price)
    if (sort === 'Newest first') result.sort((a, b) => b.year - a.year)
    return result
  }, [search, fuel, budget, sort])

  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const openInquiry = (car = null) => {
    setSelectedCar(car)
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const submitInquiry = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const phone = data.get('phone')
    const interest = selectedCar?.name || data.get('interest') || 'Luxury car collection'
    const message = `Hello Luxe Motors, I’m ${name}. I’m interested in ${interest}. My phone number is ${phone}. Please contact me.`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    showToast('Your inquiry is ready to send on WhatsApp.')
    event.currentTarget.reset()
  }

  return <div className="min-h-screen bg-ink text-white selection:bg-gold selection:text-black">
    <div className="topline"><span>CURATED LUXURY. VERIFIED HISTORY.</span><span className="topline-right">Appointments available · Mon–Sat, 10 AM–7 PM</span></div>
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Luxe Motors home"><span className="brand-mark">L<span>M</span></span><span className="brand-copy"><strong>LUXE MOTORS</strong><small>DRIVEN BY DISTINCTION</small></span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '✕' : '☰'}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}><a href="#collection" onClick={() => setMenuOpen(false)}>The Collection</a><a href="#promise" onClick={() => setMenuOpen(false)}>Our Promise</a><a href="#process" onClick={() => setMenuOpen(false)}>How It Works</a><a href="#inquiry" className="nav-cta" onClick={() => setMenuOpen(false)}>Enquire Now <span>↗</span></a></nav>
    </header>

    <main>
      <section id="home" className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90" alt="Premium sports car in a dramatic studio" />
        <div className="hero-overlay" />
        <div className="hero-content"><p className="eyebrow"><span /> THE ART OF THE DRIVE</p><h1>Exceptional cars.<br/><em>Extraordinary</em> lives.</h1><p className="hero-description">A considered collection of the world’s finest automobiles. Personally selected, meticulously inspected, and ready for your next chapter.</p><div className="hero-actions"><a href="#collection" className="button button-gold">Explore the collection <span>↗</span></a><a href="#promise" className="text-link">Discover the Luxe standard <span>↓</span></a></div><div className="hero-note"><span className="note-line"/><span>THE LUXE DIFFERENCE</span><span className="note-sub">Quality is never a compromise.</span></div></div>
        <div className="hero-index"><span>01</span><i /> 03</div>
      </section>

      <section className="stats-strip"><div><strong>150<span>+</span></strong><small>Premium cars delivered</small></div><div><strong>100<span>%</span></strong><small>Inspection-led selection</small></div><div><strong>1:1</strong><small>Personal buying assistance</small></div><div className="stats-quote">“The right car is more than a purchase.<br/>It’s a feeling.”</div></section>

      <section id="collection" className="collection section-wrap"><div className="section-heading"><div><p className="eyebrow"><span/> THE PRIVATE COLLECTION</p><h2>Find your <em>forever drive.</em></h2><p className="section-intro">Every vehicle has a story. Explore a handpicked selection of remarkable machines.</p></div><a href="#inquiry" className="underlined-link">Need a recommendation? <span>↗</span></a></div>
        <div className="filters"><label className="search-field"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search make, model or year" aria-label="Search cars"/><kbd>⌘ K</kbd></label><select value={fuel} onChange={e => setFuel(e.target.value)} aria-label="Filter by fuel"><option>All fuel types</option><option>Petrol</option><option>Diesel</option><option>Hybrid</option></select><select value={budget} onChange={e => setBudget(e.target.value)} aria-label="Filter by budget"><option>Any budget</option><option>Under ₹60 Lakh</option><option>₹60 Lakh – ₹1 Cr</option><option>Above ₹1 Cr</option></select><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort cars"><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest first</option></select></div>
        <div className="collection-meta"><span>SHOWING <b>{visibleCars.length.toString().padStart(2, '0')}</b> VEHICLES</span><span>HANDPICKED. NEVER ORDINARY.</span></div>
        {visibleCars.length ? <div className="car-grid">{visibleCars.map((car, index) => <article className="car-card" key={car.id}><div className="car-photo-wrap"><img className="car-photo" src={car.image} alt={car.name} loading="lazy"/><span className="car-tag">{car.tag}</span><button className={saved.includes(car.id) ? 'save-button is-saved' : 'save-button'} onClick={() => setSaved(prev => prev.includes(car.id) ? prev.filter(id => id !== car.id) : [...prev, car.id])} aria-label={saved.includes(car.id) ? 'Remove from saved cars' : 'Save car'}>{saved.includes(car.id) ? '♥' : '♡'}</button><span className="photo-number">0{index + 1}</span></div><div className="car-info"><div className="car-title-line"><div><h3>{car.name}</h3><p>{car.trim}</p></div><strong className="car-price">{car.priceLabel}</strong></div><div className="car-specs"><span>{car.year}</span><i/> <span>{car.km}</span><i/> <span>{car.fuel}</span></div><div className="car-card-bottom"><span className="verified"><span>✓</span> Inspected</span><button onClick={() => openInquiry(car)} className="details-button">Enquire <span>↗</span></button></div></div></article>)}</div> : <div className="empty-state"><span>⌕</span><h3>No exact match just yet.</h3><p>Try adjusting your filters, or let our team find the right car for you.</p><button className="button button-gold" onClick={() => { setSearch(''); setFuel('All fuel types'); setBudget('Any budget') }}>Reset filters</button></div>}
        <p className="demo-disclaimer">Demo inventory and prices are illustrative and should be confirmed before publication.</p>
      </section>

      <section id="promise" className="promise-section"><div className="promise-image"><img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=85" alt="Luxury car detail in a premium setting" loading="lazy"/><div className="image-caption"><span>THE LUXE STANDARD</span><strong>More than a car.<br/>A considered choice.</strong></div></div><div className="promise-copy"><p className="eyebrow"><span/> CONFIDENCE, BUILT IN</p><h2>Luxury should feel<br/><em>effortless.</em></h2><p className="promise-intro">Buying a premium car should be as exceptional as driving one. We make every step personal, transparent, and worthy of the vehicle you choose.</p><div className="promise-list"><div><span className="promise-icon">01</span><div><h3>Personally inspected</h3><p>Every car is reviewed for condition, service history, and quality before it joins our collection.</p></div></div><div><span className="promise-icon">02</span><div><h3>Transparent by design</h3><p>Clear vehicle details and straightforward conversations. No pressure, no surprises.</p></div></div><div><span className="promise-icon">03</span><div><h3>Personal from start to finish</h3><p>A dedicated point of contact to guide your shortlist, viewing, and next steps.</p></div></div></div><a href="#inquiry" className="button button-outline">Experience the difference <span>↗</span></a></div></section>

      <section id="process" className="process-section section-wrap"><div className="process-heading"><p className="eyebrow"><span/> YOUR JOURNEY, REFINED</p><h2>Three steps to <em>the keys.</em></h2></div><div className="process-grid"><div><span className="process-num">01</span><h3>Tell us what moves you.</h3><p>Share your wish list, priorities, and the way you love to drive.</p><span className="process-arrow">↗</span></div><div><span className="process-num">02</span><h3>Explore your shortlist.</h3><p>We’ll help you compare the right vehicles and arrange a viewing.</p><span className="process-arrow">↗</span></div><div><span className="process-num">03</span><h3>Make it yours.</h3><p>Move forward with confidence and a team by your side.</p><span className="process-arrow">↗</span></div></div></section>

      <section className="testimonial"><div className="quote-mark">“</div><blockquote>It wasn’t just finding the right car.<br/>It was enjoying every step of the journey.</blockquote><div className="quote-rule"/><p>A DIFFERENT KIND OF CAR BUYING EXPERIENCE</p></section>

      <section id="inquiry" className="inquiry-section"><div className="inquiry-copy"><p className="eyebrow"><span/> YOUR NEXT CHAPTER STARTS HERE</p><h2>Let’s find the car<br/>that feels <em>like you.</em></h2><p>Tell us a little about what you’re looking for. Our team will get in touch to help you take the next step.</p><div className="contact-promise"><span className="contact-icon">✳</span><span><strong>A real conversation. No pressure.</strong><small>Personal assistance, tailored to you.</small></span></div></div><form className="inquiry-form" onSubmit={submitInquiry}><div className="form-top"><span>PERSONAL ENQUIRY</span><span>01 / 01</span></div><label>Your name<input name="name" placeholder="e.g. Arjun Mehta" required minLength="2"/></label><div className="form-row"><label>Phone number<input name="phone" type="tel" placeholder="+91 98765 43210" required pattern="[+0-9() -]{8,20}" title="Enter a valid phone number"/></label><label>I'm interested in<select name="interest" defaultValue={selectedCar?.name || ''} key={selectedCar?.id || 'default'}><option value="">Help me decide</option>{cars.map(car => <option key={car.id}>{car.name}</option>)}</select></label></div><label>Anything else? <span className="optional">OPTIONAL</span><textarea name="message" rows="3" placeholder="Budget, preferred model, or questions…"/></label><button type="submit" className="button button-gold form-submit">Start a conversation <span>↗</span></button><p className="privacy-note">By submitting, you agree to be contacted about your enquiry. This demo opens WhatsApp with your message; it does not store your details.</p></form></section>
    </main>

    <footer className="footer"><div className="footer-main"><a href="#home" className="brand"><span className="brand-mark">L<span>M</span></span><span className="brand-copy"><strong>LUXE MOTORS</strong><small>DRIVEN BY DISTINCTION</small></span></a><p>For those who know the difference.</p><a className="footer-top" href="#home">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© 2026 LUXE MOTORS · DEMO WEBSITE</span><span>CURATED WITH INTENTION. DRIVEN WITH PURPOSE.</span><span>INSTAGRAM&nbsp;&nbsp; ↗</span></div></footer>
    {toast && <div className="toast" role="status">✓ &nbsp;{toast}</div>}
    <a className="floating-contact" href="#inquiry" aria-label="Contact Luxe Motors"><span>✳</span><span>LET’S TALK</span></a>
  </div>
}

export default App
