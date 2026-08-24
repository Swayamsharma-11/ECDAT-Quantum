import { useEffect, useRef, useState } from "react";

/** Animated counter used by dashboard KPI cards. */
export function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return Math.round(value);
}
