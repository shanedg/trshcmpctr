import { drawLine } from './draw-line';
import { project3DPointOnto2DScreen, type Point2D, type Point3D } from './draw-point';

import type { RefObject } from 'react';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- FIXME:
    const camera = cameraRef.current;
    if (!ctx) { return; }
    sceneObjects.forEach(sceneObject => {
      sceneObject.edges.forEach((edge, _edgeIndex, edges) => {
        const p1 = edge;
        const projectedP1 = project3DPointOnto2DScreen(p1);
        if (!projectedP1) { return; };
        const p2 = edges[(_edgeIndex + 1) % edges.length];
        const projectedP2 = project3DPointOnto2DScreen(p2);
        if (!projectedP2) { return; };
        // FIXME: check if both p1 and p2 are on or near positive camera 2d plane
        // ctx.strokeStyle = 'lime';
        // ctx.beginPath();
        // FIXME: move to p1
        // FIXME: line to p2
        // FIXME: stroke
        // ctx.closePath();
        drawLine({
          ctx,
          height: 100,
          // p1: projectedP1,
          // p2: projectedP2,
          p1,
          p2,
          width: 100,
        });
      });
    });
  };

  return {
    drawSceneFrame,
    drawSceneObjects,
  };
};
