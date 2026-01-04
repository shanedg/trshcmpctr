import { useCallback, useEffect, useRef, useState } from 'react';

interface UseGameLoop {
  /**
   * Work to perform on every tick
   */
  onTick: () => void;
  /**
   * Starting tick
   */
  startTime: number;
  /**
   * Length in ms of every tick
   */
  tickDuration: number;
}

export const useGameLoop = ({ onTick, startTime, tickDuration }: UseGameLoop) => {
  const loop = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(startTime);

  const togglePaused = useCallback(() => {
    setIsPaused(value => !value);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      loop.current = setInterval(() => {
        onTick();
        setTime(previousTime => previousTime + 1);
      }, tickDuration);
    }
    return () => {
      clearInterval(loop.current ?? undefined);
    };
  }, [isPaused, onTick, tickDuration]);

  return {
    isPaused,
    time,
    togglePaused,
  };
};
