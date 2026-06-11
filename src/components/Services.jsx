import { motion } from 'framer-motion';

const services = [
  {
    icon: '🏥',
    title: 'Veterinary Care',
    desc: 'From routine checkups to advanced diagnostics and surgery.',
    features: [
      'Wellness exams & vaccines',
      'Dental care & surgery',
      'In-house lab & digital x-ray',
    ],
    color: 'oklch(42% 0.1 220)',
  },
  {
    icon: '🏠',
    title: 'Luxury Boarding',
    desc: 'Climate-controlled suites with round-the-clock supervision.',
    features: [
      'Private suites & webcams',
      'Daily walks & playtime',
      '24/7 on-site staff',
    ],
    color: 'oklch(55% 0.06 180)',
  },
  {
    icon: '✂️',
    title: 'Professional Grooming',
    desc: 'Spa-quality grooming — from bath to breed-specific cuts.',
    features: [
      'Full groom & de-shedding',
      'Nail trim & ear cleaning',
      'Breed-specific styling',
    ],
    color: 'oklch(68% 0.18 78)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Services() {
  return (
    <section id="services" className="services section">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">Our Services</h2>
          <p className="section__subtitle">
            Everything your pet needs, all in one place
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div
                className="service-card__icon"
                style={{ background: s.color + '12', color: s.color }}
              >
                {s.icon}
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <ul className="service-card__features">
                {s.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#contact" className="service-card__link">
                Learn More →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
