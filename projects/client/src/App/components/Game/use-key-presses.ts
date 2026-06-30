import { useEffect, useRef } from 'react';

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
  const keyPressesRef = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    /**
     * Called whenever a keyboard key is pressed down
     */
    const keydownHandler = (e: KeyboardEvent) => {
      if (!keyRows.flat().includes(e.key)) {
        return;
      }
      keyPressesRef.current.set(e.key, true);
    };

    /**
     * Called whenever a keyboard key is released
     */
    const keyupHandler = (e: KeyboardEvent) => {
      if (!keyRows.flat().includes(e.key)) {
        return;
      }
      keyPressesRef.current.set(e.key, false);
    };

    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('keyup', keyupHandler);
    };
  }, [keyRows]);

  return {
    /**
     * Map of keys to pressed state
     */
    keyPressesRef,
  };
};
