import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <motion.div
            className="footer__col"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="footer__heading">
              <span className="navbar__logo-icon">△</span> Midgard
            </h3>
            <p className="footer__text">
              Building the future with precision, strength, and integrity since 2010.
            </p>
          </motion.div>

          <motion.div
            className="footer__col"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="footer__heading">Services</h4>
            <ul className="footer__list">
              <li><a href="#">Architecture</a></li>
              <li><a href="#">Construction</a></li>
              <li><a href="#">Project Management</a></li>
              <li><a href="#">Renovation</a></li>
            </ul>
          </motion.div>

          <motion.div
            className="footer__col"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </motion.div>

          <motion.div
            className="footer__col"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__list">
              <li>info@midgard.build</li>
              <li>+1 (555) 123-4567</li>
              <li>200 Construction Ave,<br />Austin, TX 78701</li>
            </ul>
          </motion.div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Midgard Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
