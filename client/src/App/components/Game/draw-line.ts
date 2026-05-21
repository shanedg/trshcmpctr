import {
  convertProjectionToCanvas,
  // Point2D,
  project3DPointOnto2DScreen,
  type Point3D,
} from './draw-point';

/**
 * FIXME:
 */
const getProjectedLinePoints = (p1: Point3D, p2: Point3D) => {
  const p1Projected = project3DPointOnto2DScreen(p1);
  const p2Projected = project3DPointOnto2DScreen(p2);
  return [p1Projected, p2Projected];
};

interface DrawLineProps {
  ctx: CanvasRenderingContext2D;
  height: number;
  p1: Point3D;
  p2: Point3D;
  width: number;
}

/**
 * FIXME:
 */
export const drawLine = ({
  ctx,
  height,
  p1,
  p2,
  width,
}: DrawLineProps) => {
  const [p1Projected, p2Projected] = getProjectedLinePoints(p1, p2);
  if (p1Projected === null || p2Projected === null) {
    return;
  }
  const p1Canvas = convertProjectionToCanvas(p1Projected, width, height);
  const p2Canvas = convertProjectionToCanvas(p2Projected, width, height);

  ctx.beginPath();
  ctx.strokeStyle = 'lime';

  // ctx.moveTo(p1Canvas.x, p1Canvas.y);
  // ctx.lineTo(p2Canvas.x, p2Canvas.y);
  ctx.moveTo(p1Canvas.x + 100, p1Canvas.y);
  ctx.lineTo(p2Canvas.x + 100, p2Canvas.y);

  ctx.stroke();
  ctx.closePath();
};
