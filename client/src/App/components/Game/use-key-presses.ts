import { useCallback, useEffect, useState } from 'react';

interface UseKeyPressesProps {
  /**
   * Keyboard keys the component should respond to,
   * grouped into rows, i.e. keyRows[row][key]
   */
  keyRows: string[][];
  /**
   * FIXME:
   */
  onKeyDown: (keyName: string) => void;
  /**
   * FIXME:
   */
  onKeyUp: (keyName: string) => void;
}

/**
 * Hook for tracking keyboard key presses
 */
export const useKeyPresses = ({ keyRows, onKeyDown, onKeyUp }: UseKeyPressesProps) => {
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
    onKeyDown(e.key);
  }, [keyRows, onKeyDown]);

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
    onKeyUp(e.key);
  }, [keyRows, onKeyUp]);

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
