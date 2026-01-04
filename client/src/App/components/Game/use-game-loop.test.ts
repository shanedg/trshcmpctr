import { renderHook } from '@testing-library/react';

import { useGameLoop } from './use-game-loop';

describe('useGameLoop', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('starts paused', async () => {
    const initialProps = {
      onTick: jest.fn(),
      startTime: 0,
      tickDuration: 50,
    };
    const { rerender, result } = renderHook(useGameLoop, { initialProps });
    await jest.advanceTimersByTimeAsync(150);
    rerender(initialProps);
    expect(result.current.isPaused).toEqual(true);
    expect(result.current.time).toEqual(0);
    expect(initialProps.onTick).toHaveBeenCalledTimes(0);
  });

  it('when unpaused, advances ticks after tick duration and runs tick callback', async () => {
    const initialProps = {
      onTick: jest.fn(),
      startTime: 0,
      tickDuration: 50,
    };
    const { rerender, result } = renderHook(useGameLoop, { initialProps });
    result.current.togglePaused();
    rerender(initialProps);
    expect(result.current.isPaused).toEqual(false);
    await jest.advanceTimersByTimeAsync(initialProps.tickDuration);
    expect(initialProps.onTick).toHaveBeenCalledTimes(1);
    rerender(initialProps);
    expect(result.current.time).toEqual(1);
  });

  it('advances multiple ticks when unpaused for multiple ticks', async () => {
    const initialProps = {
      onTick: jest.fn(),
      startTime: 0,
      tickDuration: 50,
    };
    const { rerender, result } = renderHook(useGameLoop, { initialProps });
    result.current.togglePaused();
    rerender(initialProps);
    await jest.advanceTimersByTimeAsync(initialProps.tickDuration * 5);
    expect(initialProps.onTick).toHaveBeenCalledTimes(5);
    rerender(initialProps);
    expect(result.current.time).toEqual(5);
  });

  it('does not run next scheduled tick callback if paused before tick completes', async () => {
    const initialProps = {
      onTick: jest.fn(),
      startTime: 0,
      tickDuration: 50,
    };
    const { rerender, result } = renderHook(useGameLoop, { initialProps });
    result.current.togglePaused();
    rerender(initialProps);
    // Advance time 1ms less than 5 ticks
    await jest.advanceTimersByTimeAsync((initialProps.tickDuration * 5) - 1);
    expect(initialProps.onTick).toHaveBeenCalledTimes(4);
    rerender(initialProps);
    expect(result.current.time).toEqual(4);
    result.current.togglePaused();
    rerender(initialProps);
    await jest.advanceTimersByTimeAsync(initialProps.tickDuration);
    expect(result.current.isPaused).toEqual(true);
    expect(initialProps.onTick).toHaveBeenCalledTimes(4);
    expect(result.current.time).toEqual(4);
  });
});
