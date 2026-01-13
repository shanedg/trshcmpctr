import { RefObject, useEffect, useRef } from 'react';

import { useAnimationFrameManager } from './use-animation-frame-manager';

const defaultResolutionScale = 45;

const defaultHeight = defaultResolutionScale * 9;
const defaultWidth = defaultResolutionScale * 16;

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

/**
 * Draw a square at a point on the screen
 * @param ctx Canvas 2D rendering context
 * @param point Center point of the square
 * @param size Size in pixels of the square
 */
const drawPoint = (ctx: CanvasRenderingContext2D, point: Point2D, size: number) => {
  if (size <= 0) {
    throw new Error(`Problem drawing point with size=${String(size)}`);
  }
  ctx.fillStyle = 'lime';
  ctx.fillRect(point.x - size/2, point.y - size/2, size, size);
};

/**
 * Transform projection coordinates for canvas
 * @param point Projection point coordinates
 * @returns Canvas point coordinates
 */
const convertPoint = (point: Point2D) => {
  return {
    x: (point.x + 1)/2 * defaultWidth,
    y: (1 - (point.y + 1)/2) * defaultHeight,
  };
};

/**
 * Project a 3D point onto a 2D screen
 * @param point Point in 3D space
 * @returns Point in 2D space
 */
const projectPoint = (point: Point3D): Point2D | null => {
  if (point.z > 0) {
    return {
      x: point.x/point.z,
      y: point.y/point.z,
    };
  }
  return null;
};

const drawBackground = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#404040';
  ctx.beginPath();
  ctx.fillRect(0, 0, defaultWidth, defaultHeight);
  ctx.closePath();
};

const drawCube = (ctx: CanvasRenderingContext2D, playerPosition: Point3D) => {
  const cubePoints = [
    // Far, top left
    { ...playerPosition, x: playerPosition.x - 1, y: playerPosition.y + 1, z: playerPosition.z + 1 },
    // Far, top right
    { ...playerPosition, x: playerPosition.x + 1, y: playerPosition.y + 1, z: playerPosition.z + 1 },
    // Far, bottom right
    { ...playerPosition, x: playerPosition.x + 1, y: playerPosition.y - 1, z: playerPosition.z + 1 },
    // Far, bottom left
    { ...playerPosition, x: playerPosition.x - 1, y: playerPosition.y - 1, z: playerPosition.z + 1 },
    // Near, top left
    { ...playerPosition, x: playerPosition.x - 1, y: playerPosition.y + 1, z: playerPosition.z - 1 },
    // Near, top right
    { ...playerPosition, x: playerPosition.x + 1, y: playerPosition.y + 1, z: playerPosition.z - 1 },
    // Near, bottom right
    { ...playerPosition, x: playerPosition.x + 1, y: playerPosition.y - 1, z: playerPosition.z - 1 },
    // Near, bottom left
    { ...playerPosition, x: playerPosition.x - 1, y: playerPosition.y - 1, z: playerPosition.z - 1 },
  ];

  const cubeEdges = [
    // Far face
    [0, 1, 2, 3],
    // Near face
    [4, 5, 6, 7],
    // Connect far and near
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  cubePoints
    .map(p => projectPoint(p))
    .filter(p => p !== null)
    .map(p => convertPoint(p))
    .forEach(p => {
      drawPoint(ctx, p, 5);
    });

  cubeEdges
    .map(f => {
      f.forEach(i => {
        const p1In3D = cubePoints[i];
        const p2In3D = cubePoints[f[(i + 1) % f.length]];
        const p1Projected = projectPoint(p1In3D);
        const p2Projected = projectPoint(p2In3D);
        if (p1Projected === null || p2Projected === null) {
          return;
        }
        const p1Canvas = convertPoint(p1Projected);
        const p2Canvas = convertPoint(p2Projected);
        ctx.beginPath();
        ctx.strokeStyle = 'lime';
        ctx.moveTo(p1Canvas.x, p1Canvas.y);
        ctx.lineTo(p2Canvas.x, p2Canvas.y);
        ctx.stroke();
        ctx.closePath();
      });
    });
};

interface CanvasSceneProps {
  height?: number;
  playerPosition: RefObject<Point3D>;
  width?: number;
}

export const CanvasScene = ({
  height = defaultHeight,
  playerPosition,
  width = defaultWidth,
}:  CanvasSceneProps) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const { addTask, removeTask, start, stop } = useAnimationFrameManager({ targetFps: 60 });

  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    ctx.current = canvas.current.getContext('2d');

    const renderTask = () => {
      if (!ctx.current) {
        throw new Error('Missing canvas rendering context');
      }
      ctx.current.clearRect(0, 0, defaultWidth, defaultHeight);
      drawBackground(ctx.current);
      drawCube(ctx.current, playerPosition.current);
    };

    addTask(renderTask);
    start();

    return () => {
      stop();
      removeTask(renderTask);
    };
  }, [addTask, playerPosition, removeTask, start, stop]);

  return (
    <canvas
      height={height}
      id="canvas"
      ref={canvas}
      width={width}
    />
  );
};
