import { RefObject } from 'react';

interface GetCanvasRenderingContext2DProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export const getCanvasRenderingContext2D = ({ canvasRef }: GetCanvasRenderingContext2DProps) => {
  if (!canvasRef.current) {
    return null;
  }
  return canvasRef.current.getContext('2d');
};
