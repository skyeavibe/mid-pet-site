import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'

const stats = [
  { value: 125, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '', label: 'Years in Business' },
  { value: 50, suffix: '+', label: 'Industry Awards' },
]

function StatItem({ value, suffix, label }) {
  const ref = useRef(null)
  const [displayValue, setDisplayValue] = useState('0')
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const count = useTransform(scrollYProgress, [0, 1], [0, value], {
    clamp: true,
  })

  useMotionValueEvent(count, 'change', (latest) => {
    setDisplayValue(Math.round(latest).toLocaleString())
  })

  return (
    <motion.div
      ref={ref}
      className="stat"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="stat__value">{displayValue}{suffix}</span>
      <span className="stat__label">{label}</span>
    </motion.div>
  )
}

const projects = [
  {
    title: 'Aurora Tower',
    desc: '42-story mixed-use skyscraper',
    tag: 'Commercial',
  },
  {
    title: 'Riverside Residences',
    desc: 'Luxury waterfront apartment complex',
    tag: 'Residential',
  },
  {
    title: 'Nova Tech Campus',
    desc: 'State-of-the-art tech headquarters',
    tag: 'Industrial',
  },
]

export function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section__label">Our Track Record</p>
          <h2 className="section__title">By the Numbers</h2>
          <p className="section__subtitle">
            Decades of experience delivering world-class construction projects.
          </p>
        </motion.div>

        <div className="stats__grid">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>

        <motion.div
          className="projects__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="project-card"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              <div className="project-card__image">
                <div className="project-card__tag">{project.tag}</div>
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
