import { useRef } from 'react';

/**
 * Hook for managing animation frame tasks
 */
export const useAnimationFrameManager = () => {
  const framesPerSecondRef = useRef<number | null>(null);
  const frameTasksRef = useRef(new Set<FrameRequestCallback>());
  const timeFrameRequestedMillisecondsRef = useRef<DOMHighResTimeStamp>(0);
  const pendingFrameRef = useRef<number | null>(null);

  const addTask = (task: FrameRequestCallback) => {
    frameTasksRef.current.add(task);
  };

  /**
   * Called per-frame to run any added tasks.
   * Schedules itself for the next frame once all tasks are complete.
   * @param timeLastFrameEndMilliseconds The end time of the previous frame render
   * in milliseconds since 'time origin':
   * in this context, navigation start
   * or more simply, document load
   */
  const onAnimationFrame = (timeLastFrameEndMilliseconds: DOMHighResTimeStamp) => {
    const timeSinceLastFrameEndMilliseconds = timeLastFrameEndMilliseconds - timeFrameRequestedMillisecondsRef.current;
    framesPerSecondRef.current = 1000 / timeSinceLastFrameEndMilliseconds;
    frameTasksRef.current.forEach(task => {
      task(timeLastFrameEndMilliseconds);
    });
    timeFrameRequestedMillisecondsRef.current = timeLastFrameEndMilliseconds;
    pendingFrameRef.current = requestAnimationFrame(onAnimationFrame);
  };

  const removeTask = (task: FrameRequestCallback) => {
    frameTasksRef.current.delete(task);
  };

  const start = () => {
    pendingFrameRef.current = requestAnimationFrame(onAnimationFrame);
  };

  const stop = () => {
    if (pendingFrameRef.current) {
      cancelAnimationFrame(pendingFrameRef.current);
      pendingFrameRef.current = null;
    }
  };

  return {
    /**
     * Add a task to run on each animation frame
     */
    addTask,
    /**
     * Effective frames per second (FPS)
     */
    framesPerSecondRef,
    /**
     * Remove a previously added task
     */
    removeTask,
    /**
     * Start running added tasks
     */
    start,
    /**
     * Stop running added tasks
     */
    stop,
  };
};
