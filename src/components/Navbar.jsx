import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--solid' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span>🐾</span>
          <span>Paws &amp; Claws</span>
        </a>

        <div className="navbar__links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="navbar__link">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="navbar__cta">
            Book Now
          </a>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="navbar__mobile-cta"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
