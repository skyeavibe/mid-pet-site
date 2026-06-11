import { motion } from 'framer-motion'

const services = [
  {
    icon: '◆',
    title: 'Architecture',
    description:
      'Innovative design solutions that blend aesthetics with functionality, creating spaces that inspire.',
  },
  {
    icon: '▲',
    title: 'Construction',
    description:
      'Full-service construction with unmatched quality, safety standards, and on-time delivery.',
  },
  {
    icon: '✦',
    title: 'Project Management',
    description:
      'End-to-end project oversight ensuring every milestone is met on budget and to spec.',
  },
  {
    icon: '■',
    title: 'Renovation',
    description:
      'Transform existing structures into modern masterpieces with our expert renovation team.',
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function Services() {
  return (
    <section id="services" className="section services">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section__label">What We Do</p>
          <h2 className="section__title">Our Services</h2>
          <p className="section__subtitle">
            From concept to completion, we deliver excellence across every phase of construction.
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="service-card"
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            >
              <span className="service-card__icon">{service.icon}</span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
