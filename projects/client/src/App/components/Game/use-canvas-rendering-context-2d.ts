import type { RefObject } from 'react';

interface UseCanvas2DRenderingContextProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export const useCanvasRenderingContext2D = ({ canvasRef }: UseCanvas2DRenderingContextProps) => {
  if (!canvasRef.current) {
    return null;
  }
  return canvasRef.current.getContext('2d');
};
