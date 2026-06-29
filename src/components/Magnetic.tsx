import { useRef, useState, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect coarse pointers (touch devices) where hover/magnetic makes no sense
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Apply 30% pull factor
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    if (isMobile) return;
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  
  // If it's a mobile device (touch screen), bypass framer-motion tracking 
  // and just render a static div to save massive amounts of paint/layout overhead.
  if (isMobile) {
    return <div style={{ position: 'relative', display: 'inline-flex' }}>{children}</div>;
  }

  return (
    <motion.div
      className="will-change-transform" // Hardware acceleration
      style={{ position: 'relative', display: 'inline-flex' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
