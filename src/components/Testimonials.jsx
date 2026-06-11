import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    name: 'Sarah M.',
    pet: 'Max (Golden Retriever)',
    avatar: '🐕',
    text: 'Paws & Claws took such amazing care of Max during his boarding stay. The webcam updates gave us such peace of mind while we were on vacation.',
    rating: 5,
  },
  {
    name: 'James T.',
    pet: 'Luna (Maine Coon)',
    avatar: '🐱',
    text: 'The grooming team is incredible. Luna has never looked better. The de-shedding treatment made a world of difference. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Emily R.',
    pet: 'Cooper (Beagle)',
    avatar: '🐶',
    text: 'The emergency team was fast, professional, and so compassionate. We are forever grateful. This place is a true gem in our community.',
    rating: 5,
  },
  {
    name: 'Michael K.',
    pet: 'Bella (French Bulldog)',
    avatar: '🐾',
    text: 'The staff remembers her every time and treats her like family. The boarding suites are spotless and spacious. We wouldn\'t go anywhere else.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurr((p) => (p + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const r = reviews[curr];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">What Pet Parents Say</h2>
          <p className="section__subtitle">Real reviews from real families</p>
        </motion.div>

        <div className="testimonials__carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={curr}
              className="testimonial-card"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="testimonial-card__stars">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-card__text">&ldquo;{r.text}&rdquo;</p>
              <div className="testimonial-card__author">
                <span className="testimonial-card__avatar">{r.avatar}</span>
                <div className="testimonial-card__info">
                  <strong>{r.name}</strong>
                  <span className="testimonial-card__pet">{r.pet}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonials__dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === curr ? 'is-active' : ''}`}
                onClick={() => setCurr(i)}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
