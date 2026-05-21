import type { RefObject } from 'react';

import type { Point2D, Point3D } from './draw-point';

interface Rotation {
  angleXY: number;
  angleXZ: number;
  angleYZ: number;
}

type Camera = Point3D & Rotation;

interface UseDrawScene {
  cameraRef: RefObject<Camera>;
  canvasEnd: Point2D;
  canvasStart: Point2D;
  ctxRef: RefObject<CanvasRenderingContext2D | null>;
}

export const useDrawScene = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- FIXME:
  cameraRef,
  canvasEnd,
  canvasStart,
  ctxRef,
}: UseDrawScene) => {
  const drawSceneFrame = ({ frameInset }: { frameInset: number; }) => {
    const ctx = ctxRef.current;
    if (!ctx) { return; }
    ctx.strokeStyle = '#f040ff';
    ctx.beginPath();
    ctx.moveTo(canvasStart.x + frameInset, canvasStart.y + frameInset);
    ctx.lineTo(canvasEnd.x - frameInset, canvasStart.y + frameInset);
    ctx.lineTo(canvasEnd.x - frameInset, canvasEnd.y - frameInset);
    ctx.lineTo(canvasStart.x + frameInset, canvasEnd.y - frameInset);
    ctx.lineTo(canvasStart.x + frameInset, canvasStart.y + frameInset);
    ctx.stroke();
    ctx.closePath();
  };

  interface SceneObject3D {
    origin: Point3D;
    rotation: Rotation;
    edges: Point3D[];
  }

  const drawSceneObjects = (sceneObjects: SceneObject3D[]) => {
    const ctx = ctxRef.current;
    if (!ctx) { return; }
    sceneObjects.forEach(o => {
      o.edges.forEach((e, _i, edges) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- FIXME: project edge p1 from 3d to 2d
        const p1 = e;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- FIXME: project edge p2 from 3d to 2d
        const p2 = edges[(_i + 1) % edges.length];
        // FIXME: check if both p1 and p2 are on or near positive camera 2d plane
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        // FIXME: move to p1
        // FIXME: line to p2
        // FIXME: stroke
        ctx.closePath();
      });
    });
  };

  return {
    drawSceneFrame,
    drawSceneObjects,
  };
};
