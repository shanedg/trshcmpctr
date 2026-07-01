import { Point3D, type Point2D } from './draw-point';

interface Rotation {
  angleXY: number;
  angleXZ: number;
  angleYZ: number;
}

type Camera = Point3D & Rotation;

interface DrawSceneObjectsFromPerspective {
  camera: Camera;
  canvasEnd: Point2D;
  canvasStart: Point2D;
  ctx: CanvasRenderingContext2D;
}

export const drawSceneObjectsFromPerspective = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- FIXME:
  camera,
  canvasEnd,
  canvasStart,
  ctx,
}: DrawSceneObjectsFromPerspective) => {
  const frameInset = 1;

  ctx.strokeStyle = '#f040ff';
  ctx.beginPath();
  ctx.moveTo(canvasStart.x + frameInset, canvasStart.y + frameInset);
  ctx.lineTo(canvasEnd.x - frameInset, canvasStart.y + frameInset);
  ctx.lineTo(canvasEnd.x - frameInset, canvasEnd.y - frameInset);
  ctx.lineTo(canvasStart.x + frameInset, canvasEnd.y - frameInset);
  ctx.lineTo(canvasStart.x + frameInset, canvasStart.y + frameInset);
  ctx.stroke();
  ctx.closePath();

  // FIXME:
  // FIXME:
  // FIXME:
};
