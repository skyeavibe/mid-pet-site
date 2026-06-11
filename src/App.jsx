import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import PixiBackground from './PixiBackground'
import './index.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo">
          La Pâtisserie <span>Dorée</span>
        </a>
        <div className="nav__links">
          <a href="#about" className="nav__link">Notre Histoire</a>
          <a href="#specialties" className="nav__link">Spécialités</a>
          <a href="#menu" className="nav__link">La Carte</a>
          <a href="#location" className="nav__link">Nous Trouver</a>
          <a href="#contact" className="nav__link">Contact</a>
          <a href="#contact" className="nav__cta">Réserver</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 150])
  const textY = useTransform(scrollY, [0, 600], [0, -80])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section className="hero" id="top">
      <motion.div className="hero__bg" style={{ y: bgY }} />
      <div className="hero__decorative hero__decorative--top">Boulangerie</div>
      <div className="hero__decorative hero__decorative--bottom">Pâtisserie</div>

      <motion.div style={{ y: textY, opacity }}>
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          ✦ Depuis 1987 ✦
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Where Every Crumb Tells a <em>Story</em>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Handcrafted pastries and artisan breads made with love, tradition,
          and the finest ingredients from local farms.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <a href="#specialties" className="btn btn--primary">
            Discover Our Craft
          </a>
          <a href="#menu" className="btn btn--outline">
            View the Menu
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}

function About() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="about" ref={ref}>
      <div className="section__inner">
        <div className="about__grid">
          <motion.div
            className="about__content"
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="about__eyebrow">Notre Histoire</div>
            <h2 className="about__title">
              A Family Tradition, <br />Baked with Heart
            </h2>
            <p className="about__text">
              Founded in 1987 by master pâtissier Jean-Pierre Moreau, La Pâtisserie
              Dorée began as a small neighborhood bakery with a simple vision: to bring
              the authentic flavors of the French countryside to every table.
            </p>
            <p className="about__text">
              Three decades later, we still rise before dawn, knead by hand, and use
              only butter from Normandy, flour from heritage wheat fields, and seasonal
              fruits from farms within fifty miles of our ovens.
            </p>
            <a href="#menu" className="btn btn--gold">
              Explore Our Menu
            </a>
          </motion.div>

          <motion.div
            className="about__visual"
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="about__visual-inner">
              <div className="about__visual-icon">🌾</div>
              <div className="about__visual-year">1987</div>
              <div className="about__visual-text">
                Three decades of passion, flour, and butter
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const specialties = [
  {
    emoji: '🥐',
    tag: 'Viennoiserie',
    title: 'Croissant au Beurre',
    desc: 'Laminated 27 times with Normandy butter, golden and shatteringly flaky.',
    price: '€3.80',
  },
  {
    emoji: '🍰',
    tag: 'Gâteau',
    title: 'Tarte au Citron',
    desc: 'Tangy lemon curd in a buttery sablé shell, torched to a perfect finish.',
    price: '€6.50',
  },
  {
    emoji: '🧁',
    tag: 'Pâtisserie',
    title: 'Paris-Brest',
    desc: 'Praline mousseline cream piped into choux, crowned with caramelized almonds.',
    price: '€7.20',
  },
]

function Specialties() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="specialties" ref={ref}>
      <div className="section__inner">
        <motion.div
          className="section__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section__label">Nos Spécialités</div>
          <h2 className="section__title">Signature Creations</h2>
          <div className="divider" />
          <p className="section__subtitle">
            Each piece is a labor of love — shaped by hand, baked to perfection,
            and finished with meticulous care.
          </p>
        </motion.div>

        <motion.div
          className="sig__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {specialties.map((item, i) => (
            <motion.div
              key={item.title}
              className="sig__card"
              variants={fadeUp}
              custom={i}
            >
              <div className="sig__card-img">{item.emoji}</div>
              <div className="sig__card-body">
                <div className="sig__card-tag">{item.tag}</div>
                <h3 className="sig__card-title">{item.title}</h3>
                <p className="sig__card-desc">{item.desc}</p>
                <div className="sig__card-price">{item.price}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const menuData = [
  {
    icon: '🥐',
    name: 'Viennoiseries',
    items: [
      { name: 'Croissant au Beurre', desc: 'Classic butter croissant', price: '€3.80' },
      { name: 'Pain au Chocolat', desc: 'Dark chocolate filled', price: '€4.20' },
      { name: 'Brioche Feuilletée', desc: 'Flaky brioche with vanilla', price: '€4.50' },
      { name: 'Danish aux Abricots', desc: 'Apricot and frangipane', price: '€4.80' },
      { name: 'Chausson aux Pommes', desc: 'Apple turnover, puff pastry', price: '€3.90' },
    ],
  },
  {
    icon: '🍞',
    name: 'Pains & Tartines',
    items: [
      { name: 'Baguette Tradition', desc: 'Stone-baked, 65cm', price: '€2.80' },
      { name: 'Pain de Campagne', desc: 'Rustic country loaf', price: '€5.50' },
      { name: 'Focacia aux Herbes', desc: 'Rosemary, thyme, olive oil', price: '€4.20' },
      { name: 'Tartine Avocat', desc: 'Sourdough, avocado, poached egg', price: '€9.50' },
      { name: 'Tartine Saumon', desc: 'Smoked salmon, crème fraîche', price: '€11.00' },
    ],
  },
  {
    icon: '🎂',
    name: 'Gâteaux & Tarts',
    items: [
      { name: 'Tarte au Citron', desc: 'Lemon curd, Italian meringue', price: '€6.50' },
      { name: 'Paris-Brest', desc: 'Praline mousseline, choux', price: '€7.20' },
      { name: 'Opéra', desc: 'Coffee, chocolate, almond', price: '€8.00' },
      { name: 'Millefeuille', desc: 'Vanilla, caramelized puff', price: '€7.50' },
      { name: 'Forêt Noire', desc: 'Dark chocolate, cherry, cream', price: '€7.80' },
    ],
  },
  {
    icon: '☕',
    name: 'Boissons',
    items: [
      { name: 'Espresso', desc: 'Single or double', price: '€2.50' },
      { name: 'Café Crème', desc: 'With steamed milk', price: '€3.80' },
      { name: 'Chocolat Chaud', desc: 'Dark chocolate, whipped cream', price: '€4.50' },
      { name: 'Thé à la Fleur', desc: 'Seasonal flower infusion', price: '€4.00' },
      { name: 'Jus de Pression', desc: 'Freshly squeezed orange', price: '€5.00' },
    ],
  },
]

function Menu() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="menu" ref={ref}>
      <div className="section__inner">
        <motion.div
          className="section__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section__label">La Carte</div>
          <h2 className="section__title">Our Menu</h2>
          <div className="divider" />
          <p className="section__subtitle">
            From dawn-baked croissants to evening gâteaux — something extraordinary
            for every moment of your day.
          </p>
        </motion.div>

        <motion.div
          className="menu__categories"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {menuData.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="menu__category"
              variants={fadeUp}
              custom={i}
            >
              <div className="menu__cat-header">
                <span className="menu__cat-icon">{cat.icon}</span>
                <h3 className="menu__cat-name">{cat.name}</h3>
              </div>
              <div className="menu__items">
                {cat.items.map((item) => (
                  <div key={item.name} className="menu__item">
                    <div className="menu__item-left">
                      <div className="menu__item-name">{item.name}</div>
                      <div className="menu__item-desc">{item.desc}</div>
                    </div>
                    <div className="menu__item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const hours = [
  { day: 'Lundi', time: 'Fermé', closed: true },
  { day: 'Mardi – Vendredi', time: '7h00 – 19h30' },
  { day: 'Samedi', time: '7h00 – 18h00' },
  { day: 'Dimanche', time: '8h00 – 13h00' },
]

function Location() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="location" ref={ref}>
      <div className="section__inner">
        <motion.div
          className="section__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section__label">Nous Trouver</div>
          <h2 className="section__title">Visit Us</h2>
          <div className="divider" />
        </motion.div>

        <div className="location__grid">
          <motion.div
            className="location__map"
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="location__map-inner">
              <div className="location__map-pin">📍</div>
              <div className="location__map-address">
                23 Rue de Montmartre, 75001 Paris
              </div>
              <div className="location__map-text">
                In the heart of the 1st arrondissement
              </div>
            </div>
          </motion.div>

          <motion.div
            className="location__info"
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="location__card">
              <h3 className="location__card-title">🕐 Horaires</h3>
              <div className="hours__table">
                {hours.map((h) => (
                  <div key={h.day} className="hours__row">
                    <span className="hours__day">{h.day}</span>
                    <span className={`hours__time ${h.closed ? 'hours__time--closed' : ''}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="location__card">
              <h3 className="location__card-title">📞 Contact</h3>
              <div className="contact__details">
                <div className="contact__detail">
                  <span className="contact__detail-icon">📍</span>
                  <div>
                    <div className="contact__detail-label">Adresse</div>
                    <div className="contact__detail-value">
                      23 Rue de Montmartre<br />
                      75001 Paris, France
                    </div>
                  </div>
                </div>
                <div className="contact__detail">
                  <span className="contact__detail-icon">📞</span>
                  <div>
                    <div className="contact__detail-label">Téléphone</div>
                    <div className="contact__detail-value">+33 1 42 36 58 90</div>
                  </div>
                </div>
                <div className="contact__detail">
                  <span className="contact__detail-icon">✉️</span>
                  <div>
                    <div className="contact__detail-label">Email</div>
                    <div className="contact__detail-value">bonjour@patisserie-doree.fr</div>
                  </div>
                </div>
                <div className="contact__detail">
                  <span className="contact__detail-icon">🚇</span>
                  <div>
                    <div className="contact__detail-label">Métro</div>
                    <div className="contact__detail-value">
                      Les Halles (Line 4) • 2 min walk
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [ref, inView] = useInView()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="section__inner">
        <motion.div
          className="section__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section__label">Contact</div>
          <h2 className="section__title">Get in Touch</h2>
          <div className="divider" />
          <p className="section__subtitle">
            For special orders, event catering, or simply to say bonjour —
            we'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="contact__form-section"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          <h3 className="contact__form-title">Send Us a Message</h3>
          <p className="contact__form-subtitle">
            We typically respond within 24 hours.
          </p>

          <form className="form__grid" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" htmlFor="name">Your Name</label>
              <input
                className="form__input"
                type="text"
                id="name"
                placeholder="Jean-Pierre Moreau"
                required
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="email">Email Address</label>
              <input
                className="form__input"
                type="email"
                id="email"
                placeholder="jean@example.com"
                required
              />
            </div>
            <div className="form__group form__group--full">
              <label className="form__label" htmlFor="subject">Subject</label>
              <input
                className="form__input"
                type="text"
                id="subject"
                placeholder="Special order, catering inquiry..."
              />
            </div>
            <div className="form__group form__group--full">
              <label className="form__label" htmlFor="message">Message</label>
              <textarea
                className="form__textarea"
                id="message"
                placeholder="Tell us about your request..."
                required
              />
            </div>
            <div className="form__submit form__group--full">
              <button type="submit" className="btn btn--primary">
                {submitted ? '✓ Merci !' : 'Send Message'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div>
            <div className="footer__logo">
              La Pâtisserie <span>Dorée</span>
            </div>
            <p className="footer__brand-desc">
              Artisan French bakery crafting handmade pastries, breads,
              and confections with love since 1987.
            </p>
          </div>

          <div>
            <h4 className="footer__col-title">Navigation</h4>
            <div className="footer__links">
              <a href="#about" className="footer__link">Notre Histoire</a>
              <a href="#specialties" className="footer__link">Spécialités</a>
              <a href="#menu" className="footer__link">La Carte</a>
              <a href="#location" className="footer__link">Nous Trouver</a>
              <a href="#contact" className="footer__link">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Hours</h4>
            <div className="footer__links">
              <span className="footer__link">Tue – Fri: 7h – 19h30</span>
              <span className="footer__link">Saturday: 7h – 18h</span>
              <span className="footer__link">Sunday: 8h – 13h</span>
              <span className="footer__link">Monday: Closed</span>
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Contact</h4>
            <div className="footer__links">
              <span className="footer__link">+33 1 42 36 58 90</span>
              <span className="footer__link">bonjour@patisserie-doree.fr</span>
              <span className="footer__link">23 Rue de Montmartre</span>
              <span className="footer__link">75001 Paris, France</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 La Pâtisserie Dorée. All rights reserved.</span>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Instagram">📷</a>
            <a href="#" className="footer__social" aria-label="Facebook">📘</a>
            <a href="#" className="footer__social" aria-label="TikTok">🎵</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <PixiBackground />
      <Nav />
      <Hero />
      <About />
      <Specialties />
      <Menu />
      <Location />
      <Contact />
      <Footer />
    </>
  )
}

export default App
