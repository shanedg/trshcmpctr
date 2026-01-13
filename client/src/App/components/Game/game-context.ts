import { createContext, useContext } from 'react';

import { useKeyPresses } from './use-key-presses';

interface AvailableGameContext extends ReturnType<typeof useKeyPresses> {
  isPaused: boolean;
  // time: number;
}

const GameContext = createContext<AvailableGameContext | null>(null);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('Missing GameContext');
  }
  return context;
};

export const GameContextProvider = GameContext.Provider;
