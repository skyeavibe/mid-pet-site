import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="contact section">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">Get In Touch</h2>
          <p className="section__subtitle">
            Schedule an appointment or ask us anything
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.form
            className="contact__form"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <motion.div
                className="contact__success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <span style={{ fontSize: 40 }}>🎉</span>
                <h3>Thank You!</h3>
                <p>We&apos;ll get back to you within 24 hours.</p>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <>
                <div className="contact__field">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" placeholder="Your name" required />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="contact__field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" placeholder="(555) 000-0000" />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows={4} placeholder="How can we help?" required />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Message →
                </motion.button>
              </>
            )}
          </motion.form>

          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="contact__info-card">
              <h3>📍 Visit Us</h3>
              <p>123 Pet Avenue, Suite 100<br />San Francisco, CA 94102</p>
            </div>
            <div className="contact__info-card">
              <h3>📞 Call Us</h3>
              <p>(555) 123-4567</p>
            </div>
            <div className="contact__info-card">
              <h3>✉️ Email</h3>
              <p>hello@pawsandclaws.com</p>
            </div>
            <div className="contact__info-card">
              <h3>🕐 Hours</h3>
              <p>Mon–Fri · 8am–7pm<br />Sat · 9am–5pm<br />Sun · 10am–3pm</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
