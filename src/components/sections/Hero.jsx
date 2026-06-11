import { useRef } from 'react'
import { SceneCanvas } from '../canvas/SceneCanvas'
import { useScrollTimeline } from '../../animations/useScrollTimeline'
import { motion } from 'framer-motion'

export function Hero() {
  const scrollProgress = useScrollTimeline()
  const sectionRef = useRef(null)

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <SceneCanvas scrollProgress={scrollProgress} />

      <div className="hero__overlay">
        <div className="hero__content">
          <motion.p
            className="hero__label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Since 2010
          </motion.p>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Build the
            <br />
            <span className="hero__title-accent">Future</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Award-winning construction and architecture — crafting
            landmarks that stand the test of time.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#services" className="btn btn--primary">
              Explore Our Work
            </a>
            <a href="#contact" className="btn btn--outline">
              Get in Touch
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span>Scroll to explore</span>
          <div className="hero__scroll-line" />
        </motion.div>
      </div>
    </section>
  )
}
