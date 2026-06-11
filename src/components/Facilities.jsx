import { motion } from 'framer-motion';

const gallery = [
  { icon: '🏥', label: 'Reception' },
  { icon: '🛏️', label: 'Boarding Suites' },
  { icon: '✂️', label: 'Grooming Salon' },
  { icon: '🌳', label: 'Outdoor Area' },
];

const amenities = [
  'Climate-Controlled Suites',
  '24/7 Video Monitoring',
  'On-Site Walking Trails',
  'Sanitized Play Spaces',
  'In-House Pharmacy',
  'Emergency Ready',
];

export default function Facilities() {
  return (
    <section id="facilities" className="facilities section">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">Our Facilities</h2>
          <p className="section__subtitle">
            A peek inside our state-of-the-art hospital
          </p>
        </motion.div>

        <div className="facilities__gallery">
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              className="facilities__img"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="facilities__img-content">{item.icon}</div>
              <span className="facilities__img-label">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="facilities__grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          {amenities.map((a, i) => (
            <motion.div
              key={a}
              className="facilities__item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {a}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
