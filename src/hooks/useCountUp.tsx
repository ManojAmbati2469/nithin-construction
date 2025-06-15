
import { useEffect, useState, useRef } from 'react';

export const useCountUp = (end: number, duration: number = 2000, isVisible: boolean = false) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      countRef.current = 0;
      startTimeRef.current = null;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = (timestamp - startTimeRef.current) / duration;
      
      if (progress < 1) {
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        countRef.current = Math.floor(end * easeOutQuart);
        setCount(countRef.current);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration, isVisible]);

  return count;
};
