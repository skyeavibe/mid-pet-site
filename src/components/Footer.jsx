import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer__container">
        <div>
          <span className="footer__logo">🐾 Paws &amp; Claws Hospital</span>
          <p className="footer__tagline">
            Premium veterinary care, boarding &amp; grooming in San Francisco since 2010.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__heading">Navigation</div>
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="#facilities">Facilities</a>
          <a href="#testimonials">Testimonials</a>
        </div>

        <div className="footer__links">
          <div className="footer__heading">Services</div>
          <a href="#services">Veterinary Care</a>
          <a href="#services">Boarding</a>
          <a href="#services">Grooming</a>
          <a href="#contact">Emergency</a>
        </div>

        <div>
          <div className="footer__heading">Follow Us</div>
          <div className="footer__social">
            <a href="#" aria-label="Facebook">
              <motion.span whileHover={{ y: -2 }}>📘</motion.span>
            </a>
            <a href="#" aria-label="Instagram">
              <motion.span whileHover={{ y: -2 }}>📸</motion.span>
            </a>
            <a href="#" aria-label="Twitter/X">
              <motion.span whileHover={{ y: -2 }}>🐦</motion.span>
            </a>
            <a href="#" aria-label="YouTube">
              <motion.span whileHover={{ y: -2 }}>▶️</motion.span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Paws &amp; Claws Pet Hospital. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}
