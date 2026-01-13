import { renderHook } from '@testing-library/react';

import { useGameLoop } from './use-game-loop';

describe('useGameLoop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('starts un-paused', () => {
    const initialProps = {
      onTick: jest.fn(),
    };
    const { result } = renderHook(useGameLoop, { initialProps });
    jest.advanceTimersToNextFrame();
    expect(result.current.isPaused).toEqual(false);
  });

  it('when unpaused, runs tick callback', () => {
    const initialProps = {
      onTick: jest.fn(),
    };
    renderHook(useGameLoop, { initialProps });
    jest.advanceTimersToNextFrame();
    expect(initialProps.onTick).toHaveBeenCalledTimes(1);
  });
});
