import { useState, useEffect } from 'react';

/**
 * Animated number counter with easing and reduced motion support.
 * @param {number} target - The target integer or float
 * @param {number} [duration=1500] - Duration in ms
 * @param {boolean} [shouldStart=false] - Whether the count-up has been triggered (e.g. in view)
 * @param {boolean} [reducedMotion=false] - If true, immediately shows target value without animation
 * @returns {number}
 */
export function useCountUp(target, duration = 1500, shouldStart = false, reducedMotion = false) {
  const [count, setCount] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!shouldStart) return;

    if (reducedMotion) {
      setCount(target);
      return;
    }

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease-out cubic: 1 - pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration, shouldStart, reducedMotion]);

  return count;
}
