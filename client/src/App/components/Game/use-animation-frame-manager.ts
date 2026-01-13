import { useRef } from 'react';

interface UseAnimationManager {
  /**
   * Target rate per second to run animation frame tasks.
   * A higher target than the device is capable of has no effect.
   * Supports running different (higher) framerate devices at (roughly) the same speed (slower),
   * e.g. run 120 fps screen frames 1/2 as often as 60 fps screens.
   */
  targetFps: number;
}

/**
 * Hook for managing animation frame tasks
 */
export const useAnimationFrameManager = ({ targetFps }: UseAnimationManager) => {
  const animationTasks = useRef(new Set<FrameRequestCallback>());
  const lastFrameTime = useRef<DOMHighResTimeStamp>(0);
  const pendingFrame = useRef<number | null>(null);

  const addTask = (task: FrameRequestCallback) => {
    animationTasks.current.add(task);
  };

  /**
   * Called per-frame to run any added tasks.
   * Skips animation frames to achieve the target fps.
   * Schedules itself for the next frame once all tasks are complete.
   * @param timestamp The end time of the previous frame render
   * in milliseconds since 'time origin':
   * in this context, navigation start
   * or more simply, document load
   */
  const animate = (timestamp: DOMHighResTimeStamp) => {
    const elapsed = timestamp - lastFrameTime.current;
    // Smooth fps with a reduced target when comparing elapsed time
    // to avoid slightly fast frames incurring full frame skips.
    const nearFps = 1000 / targetFps * 0.7;
    if (elapsed > nearFps) {
      animationTasks.current.forEach(task => {
        task(timestamp);
      });
      lastFrameTime.current = timestamp;
    }
    pendingFrame.current = requestAnimationFrame(animate);
  };

  const removeTask = (task: FrameRequestCallback) => {
    animationTasks.current.delete(task);
  };

  const start = () => {
    pendingFrame.current = requestAnimationFrame(animate);
  };

  const stop = () => {
    if (pendingFrame.current) {
      cancelAnimationFrame(pendingFrame.current);
      pendingFrame.current = null;
    }
  };

  return {
    /**
     * Add a task to run on each animation frame
     */
    addTask,
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
