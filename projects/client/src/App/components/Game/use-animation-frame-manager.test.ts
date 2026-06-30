import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { useAnimationFrameManager } from './use-animation-frame-manager';

describe('useAnimationFrameManager', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('runs added tasks', () => {
    const { result } = renderHook(useAnimationFrameManager, {
      initialProps: {
        targetFps: 60,
      },
    });
    const task1 = jest.fn();
    const task2 = jest.fn();
    result.current.addTask(task1);
    result.current.start();
    jest.advanceTimersToNextFrame();
    expect(task1).toHaveBeenCalledTimes(1);
    result.current.addTask(task2);
    jest.advanceTimersToNextFrame();
    expect(task1).toHaveBeenCalledTimes(2);
    expect(task2).toHaveBeenCalledTimes(1);
  });

  it('stops running added tasks', () => {
    const { result } = renderHook(useAnimationFrameManager, {
      initialProps: {
        targetFps: 60,
      },
    });
    const task = jest.fn();
    result.current.addTask(task);
    result.current.start();
    jest.advanceTimersToNextFrame();
    jest.advanceTimersToNextFrame();
    expect(task).toHaveBeenCalledTimes(2);
    result.current.stop();
    jest.advanceTimersToNextFrame();
    jest.advanceTimersToNextFrame();
    jest.advanceTimersToNextFrame();
    expect(task).toHaveBeenCalledTimes(2);
  });

  it('removes added tasks', () => {
    const { result } = renderHook(useAnimationFrameManager, {
      initialProps: {
        targetFps: 60,
      },
    });
    const task = jest.fn();
    result.current.addTask(task);
    result.current.start();
    jest.advanceTimersToNextFrame();
    expect(task).toHaveBeenCalledTimes(1);
    result.current.removeTask(task);
    jest.advanceTimersToNextFrame();
    expect(task).toHaveBeenCalledTimes(1);
  });
});
