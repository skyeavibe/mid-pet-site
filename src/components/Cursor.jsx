import { useEffect, useRef, useCallback } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });

  const animate = useCallback(() => {
    const dx = mouseRef.current.x - cursorPos.current.x;
    const dy = mouseRef.current.y - cursorPos.current.y;

    cursorPos.current.x += dx * 0.12;
    cursorPos.current.y += dy * 0.12;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPos.current.x - 16}px, ${cursorPos.current.y - 16}px)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px)`;
    }

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (prefersReduced || hasTouch) return;

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onHover = (e) => {
      const t = e.target.closest('a, button, .btn, [data-cursor]');
      if (cursorRef.current) {
        cursorRef.current.classList.toggle('cursor--hover', !!t);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onHover);

    const id = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHover);
      cancelAnimationFrame(id);
    };
  }, [animate]);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor__dot" ref={dotRef} />
    </>
  );
}
