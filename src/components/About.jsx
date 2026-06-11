import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function StatCard({ end, suffix, label, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className="about__stat-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <span ref={ref} className="about__stat-num">
        {isInView ? end : 0}
        {suffix}
      </span>
      <span className="about__stat-label">{label}</span>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="section__inner">
        <div className="about__grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section__title" style={{ textAlign: 'left' }}>
              Welcome to Paws &amp; Claws
            </h2>
            <p>
              We&apos;re a full-service pet hospital offering top-tier veterinary
              medicine, cozy boarding suites, and spa-quality grooming. Every pet
              who walks through our doors is treated with the same love and care we
              give our own.
            </p>
            <p>
              Our team of experienced veterinarians, trained groomers, and
              passionate pet lovers work together to keep your furry family
              members happy, healthy, and looking their best.
            </p>
            <a href="#contact" className="btn btn--primary" data-cursor>
              Meet Our Team
            </a>
          </motion.div>

          <div className="about__stats">
            <StatCard end={10} suffix="K+" label="Pets Treated" delay={0.2} />
            <StatCard end={15} suffix="+" label="Years" delay={0.3} />
            <StatCard end={99} suffix="%" label="Satisfied" delay={0.4} />
            <StatCard end={24} suffix="/7" label="Care" delay={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
