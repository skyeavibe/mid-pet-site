import { motion } from 'framer-motion';

const paws = [
  { top: '10%', left: '5%', size: 40 },
  { top: '20%', right: '8%', size: 52 },
  { top: '55%', left: '3%', size: 34 },
  { top: '65%', right: '5%', size: 44 },
];

const floatPaw = {
  animate: (i) => ({
    y: [0, -18, 0],
    rotate: [0, 8, 0],
    opacity: [0.06, 0.15, 0.06],
    transition: {
      duration: 4 + i * 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.5,
    },
  }),
};

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" />

      {paws.map((p, i) => (
        <motion.div
          key={i}
          className="hero__paw"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            fontSize: p.size,
          }}
          custom={i}
          variants={floatPaw}
          animate="animate"
        >
          🐾
        </motion.div>
      ))}

      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero__badge">
            <span className="hero__badge-dot" />
            Premium Pet Care Since 2010
          </span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Where Your
          <br />
          <span className="hero__highlight">Pets Are Family</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Veterinary medicine, luxury boarding, and spa-quality grooming — all under one roof.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <a href="#contact" className="btn btn--primary" data-cursor>
            Book an Appointment
          </a>
          <a href="#services" className="btn btn--outline" data-cursor>
            Explore Services
          </a>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="hero__stat">
            <span className="hero__stat-num">10K+</span>
            <span className="hero__stat-label">Happy Pets</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">15+</span>
            <span className="hero__stat-label">Years</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">4.9</span>
            <span className="hero__stat-label">Rating</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
