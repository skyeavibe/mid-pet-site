import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Midgard transformed our vision into reality. Their attention to detail and project management was exceptional.',
    name: 'Sarah Chen',
    role: 'CEO, Nova Technologies',
  },
  {
    quote:
      'The team delivered our mixed-use development on time and under budget. Unmatched professionalism.',
    name: 'James Rodriguez',
    role: 'Director, Harbor Development',
  },
  {
    quote:
      'Working with Midgard was seamless. Their architectural team brought creative solutions to every challenge.',
    name: 'Emily Park',
    role: 'Partner, Skyline Properties',
  },
  {
    quote:
      'From groundbreaking to ribbon-cutting, Midgard exceeded every expectation. Our new headquarters is stunning.',
    name: 'Michael Torres',
    role: 'COO, Atlas Corp',
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section__label">Client Feedback</p>
          <h2 className="section__title">Testimonials</h2>
          <p className="section__subtitle">
            Hear from the partners and clients who trust us with their most
            important projects.
          </p>
        </motion.div>

        <motion.div
          className="testimonials__grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="testimonial-card"
              variants={cardVariant}
            >
              <div className="testimonial-card__stars">
                {'★'.repeat(5)}
              </div>
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-card__author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
