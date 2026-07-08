export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D extends Point2D {
  z: number;
}

/**
 * Transform projection coordinates for canvas
 * @param point Projection point coordinates
 * @param width Screen width
 * @param height Screen height
 * @returns Canvas point coordinates
 */
export const convertProjectionToCanvas = (point: Point2D, width: number, height: number) => {
  return {
    x: (point.x + 1)/2 * width,
    y: (1 - (point.y + 1)/2) * height,
  };
};

/**
 * Draw a square at a point on the screen
 * @param ctx Canvas 2D rendering context
 * @param point Center point of the square in canvas coordinates
 * @param size Size in pixels of the square
 */
const drawCanvasPoint = (ctx: CanvasRenderingContext2D, point: Point2D, size: number) => {
  if (size <= 0) {
    throw new Error(`Problem drawing point with size=${String(size)}`);
  }
  ctx.fillStyle = 'lime';
  ctx.fillRect(point.x - size/2, point.y - size/2, size, size);
};

export const drawPoint = (ctx: CanvasRenderingContext2D, point: Point3D, width: number, height: number) => {
  const projectedPoint = project3DPointOnto2DScreen(point);
  if (!projectedPoint) {
    return;
  }
  const canvasPoint = convertProjectionToCanvas(projectedPoint, width, height);
  drawCanvasPoint(ctx, canvasPoint, 1);
};

/**
 * Project a 3D point onto a 2D screen
 * @param point Point in 3D space
 * @returns Point in 2D space
 */
export const project3DPointOnto2DScreen = (point: Point3D): Point2D | null => {
  if (point.z > 0) {
    return {
      x: point.x/point.z,
      y: point.y/point.z,
    };
  }
  return null;
};
