import { motion } from 'framer-motion';

const members = [
  {
    name: 'Dr. Priya Patel',
    role: 'Lead Veterinarian',
    avatar: '👩‍⚕️',
    bio: '15+ years in small animal medicine. Specializes in surgery and preventive care.',
  },
  {
    name: 'Dr. Marcus Chen',
    role: 'Associate Veterinarian',
    avatar: '👨‍⚕️',
    bio: 'Passionate about dental care and nutrition. Certified in veterinary acupuncture.',
  },
  {
    name: 'Sophie Laurent',
    role: 'Master Groomer',
    avatar: '🧑‍🦰',
    bio: '10 years of professional grooming. Expert in breed-specific cuts and anxious pets.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const memberVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

export default function Team() {
  return (
    <section id="team" className="team section">
      <div className="section__inner">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">Meet Our Team</h2>
          <p className="section__subtitle">
            Passionate professionals dedicated to your pet&apos;s well-being
          </p>
        </motion.div>

        <motion.div
          className="team__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {members.map((m) => (
            <motion.div
              key={m.name}
              className="team-card"
              variants={memberVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="team-card__avatar">
                <span>{m.avatar}</span>
              </div>
              <h3 className="team-card__name">{m.name}</h3>
              <span className="team-card__role">{m.role}</span>
              <p className="team-card__bio">{m.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
