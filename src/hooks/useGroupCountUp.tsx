
import { useEffect, useRef, useState, useCallback } from 'react';

interface GroupCountUpOptions {
  ends: number[];
  duration?: number; // ms
  isVisible: boolean;
}

type ResetFn = () => void;

/**
 * Synchronized multi-counter hook.
 * Each value animates from 0 to ends[i], all starting and ending simultaneously.
 * Returns [values: number[], reset: ResetFn].
 */
export function useGroupCountUp({
  ends,
  duration = 2000,
  isVisible,
}: GroupCountUpOptions): [number[], ResetFn] {
  const [values, setValues] = useState(() => ends.map(() => 0));
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  const reset = useCallback(() => {
    setValues(ends.map(() => 0));
    startTimeRef.current = null;
    setRestartKey((k) => k + 1);
  }, [ends]);

  useEffect(() => {
    if (!isVisible) {
      setValues(ends.map(() => 0));
      startTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    let frame = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const progress = Math.min(1, (now - startTimeRef.current) / duration);
      // Uniform easing for all - easeOutQuart.
      const ease = 1 - Math.pow(1 - progress, 4);

      setValues(ends.map((end) => Math.round(end * ease)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setValues(ends);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ends, duration, isVisible, restartKey]);

  return [values, reset];
}
