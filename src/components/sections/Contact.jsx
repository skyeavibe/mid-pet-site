import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section__label">Get in Touch</p>
          <h2 className="section__title">Let&rsquo;s Build Together</h2>
          <p className="section__subtitle">
            Ready to start your next project? Reach out and our team will respond
            within 24 hours.
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="contact__info-item">
              <span className="contact__info-icon">📍</span>
              <div>
                <h4>Office</h4>
                <p>200 Construction Ave, Austin, TX 78701</p>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>info@midgard.build</p>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon">🕐</span>
              <div>
                <h4>Hours</h4>
                <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="contact__form-row">
              <div className="contact__form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="contact__form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="contact__form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us about your project..."
                required
              />
            </div>
            <button type="submit" className="btn btn--primary contact__submit">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
