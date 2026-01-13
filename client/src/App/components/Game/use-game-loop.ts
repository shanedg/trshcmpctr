import { useCallback, useEffect, useRef, useState } from 'react';

interface UseGameLoop {
  /**
   * Work to perform on every tick
   */
  onTick: () => void;
}

export const useGameLoop = ({ onTick }: UseGameLoop) => {
  const loop = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const togglePaused = useCallback(() => {
    setIsPaused(value => !value);
  }, []);

  useEffect(() => {
    const onFrame = () => {
      onTick();
      loop.current = requestAnimationFrame(onFrame);
    };

    if (!isPaused) {
      loop.current = requestAnimationFrame(onFrame);
    }
    return () => {
      if (loop.current) {
        cancelAnimationFrame(loop.current);
      }
    };
  }, [isPaused, onTick]);

  return {
    isPaused,
    togglePaused,
  };
};
