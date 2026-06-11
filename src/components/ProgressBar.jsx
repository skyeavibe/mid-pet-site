import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setShow(v > 0.02 && v < 0.98);
    });
    return () => unsub();
  }, [scrollYProgress]);

  if (!show) return null;

  return (
    <div className="progress-bar">
      <motion.div className="progress-bar__fill" style={{ scaleX }} />
    </div>
  );
}
