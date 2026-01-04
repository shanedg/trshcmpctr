import { useCallback, useEffect, useState } from 'react';

interface UseKeyPressesProps {
  /**
   * Keyboard keys the component should respond to,
   * grouped into rows, i.e. keyRows[row][key]
   */
  keyRows: string[][];
}

/**
 * Hook for tracking keyboard key presses
 */
export const useKeyPresses = ({ keyRows }: UseKeyPressesProps) => {
  const [keyPresses, setKeyPresses] = useState<Map<string, boolean>>(new Map());

  /**
   * Called whenever a keyboard key is pressed down
   */
  const keydownHandler = useCallback((e: KeyboardEvent) => {
    if (!keyRows.flat().includes(e.key)) {
      return;
    }
    setKeyPresses(previous => {
      const next = new Map(previous);
      next.set(e.key, true);
      return next;
    });
  }, [keyRows]);

  /**
   * Called whenever a keyboard key is released
   */
  const keyupHandler = useCallback((e: KeyboardEvent) => {
    if (!keyRows.flat().includes(e.key)) {
      return;
    }
    setKeyPresses(previous => {
      const next = new Map(previous);
      next.set(e.key, false);
      return next;
    });
  }, [keyRows]);

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('keyup', keyupHandler);
    };
  }, [keydownHandler, keyupHandler]);

  return {
    /**
     * Map of keys to pressed state
     */
    keyPresses,
  };
};
