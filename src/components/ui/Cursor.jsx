import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 })

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleLeave = () => {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [mouseX, mouseY, visible])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <motion.div
      className="cursor"
      style={{
        translateX: springX,
        translateY: springY,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden
    >
      <div className="cursor__dot" />
    </motion.div>
  )
}
