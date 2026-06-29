import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const playBloop = () => {
  // Prevent SSR crash where window AudioContext is undefined
  if (typeof window === 'undefined') return;
  
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  } catch(e) {}
}

export function MagicCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on desktop devices to save performance and avoid touch conflicts
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    setIsMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, input, [role="button"], .group'));
    };
    
    const touchSfx = (e: MouseEvent) => { 
        const target = e.target as HTMLElement;
        if(!!target.closest('a, button, input')) playBloop();
    }
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', touchSfx);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', touchSfx);
    }
  }, [cursorX, cursorY]);

  // Don't render anything in SSR or on mobile devices
  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 bg-pink-500 rounded-full pointer-events-none z-[99999] mix-blend-difference hidden lg:block shadow-xl shadow-pink-500/50 will-change-transform"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        x: isHovering ? '-50%' : '-50%',
        y: isHovering ? '-50%' : '-50%',
        backgroundColor: isHovering ? '#fff' : '#ec4899',
        scale: isHovering ? 1.2 : 1
      }}
    />
  );
}
