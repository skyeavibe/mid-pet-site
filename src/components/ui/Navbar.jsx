import { motion, useScroll, useTransform } from 'framer-motion'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const bgColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(7,7,8,0)', 'rgba(7,7,8,0.85)'],
  )
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.05)'],
  )

  return (
    <motion.nav
      style={{
        backgroundColor: bgColor,
        borderBottomColor: borderOpacity,
      }}
      className="navbar"
    >
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-icon">△</span>
          <span>Midgard</span>
        </a>

        <div className="navbar__links">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--primary navbar__cta">
            Get a Quote
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
