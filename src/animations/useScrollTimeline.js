import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollTimeline() {
  const progress = useRef(0)
  const tl = useRef(null)

  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=300%',
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.current = self.progress
        },
      },
    })

    tl.current.to({}, { duration: 1 })

    return () => {
      if (tl.current) tl.current.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return progress
}
