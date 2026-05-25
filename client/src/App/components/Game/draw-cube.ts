import { drawLine } from './draw-line';
import {
  convertProjectionToCanvas,
  drawPoint,
  project3DPointOnto2DScreen,
  type Point3D,
} from './draw-point';
import { rotateXY, rotateXZ, rotateYZ } from './rotate';

const offsetPoint = (point: Point3D, offset: Point3D) => ({
  x: point.x + offset.x,
  y: point.y + offset.y,
  z: point.z + offset.z,
});

interface Rotation {
  angleXY: number;
  angleXZ: number;
  angleYZ: number;
}

interface DrawCubeProps {
  ctx: CanvasRenderingContext2D;
  cubeOrigin: Point3D & Rotation;
  height: number;
  width: number;
}

export const drawCube = ({
  ctx,
  cubeOrigin: {
    angleXY,
    angleXZ,
    angleYZ,
    x,
    y,
    z,
  },
  height,
  width,
}: DrawCubeProps) => {
  const cubePoints = [
    // Far, top left
    {
      x: 0,
      y: 1,
      z: 1
    },
    // Far, top right
    {
      x: 1,
      y: 1,
      z: 1
    },
    // Far, bottom right
    {
      x: 1,
      y: 0,
      z: 1
    },
    // Far, bottom left
    {
      x: 0,
      y: 0,
      z: 1
    },
    // Near, top left
    {
      x: 0,
      y: 1,
      z: 0
    },
    // Near, top right
    {
      x: 1,
      y: 1,
      z: 0
    },
    // Near, bottom right
    {
      x: 1,
      y: 0,
      z: 0
    },
    // Near, bottom left
    {
      x: 0,
      y: 0,
      z: 0
    },
  ]
    .map(point => rotateXY(point, angleXY))
    .map(point => rotateXZ(point, angleXZ))
    .map(point => rotateYZ(point, angleYZ))
    .map(point => offsetPoint(point, { x, y, z }));

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
    .forEach(p => {
      drawPoint(ctx, p, width, height);
    });

  cubeEdges
    .map(f => {
      f.forEach(i => {
        const p1In3D = cubePoints[i];
        const p2In3D = cubePoints[f[(i + 1) % f.length]];
        drawLine({
          ctx,
          height,
          p1: p1In3D,
          p2: p2In3D,
          width: width,
        });
      });
    });

  const textProjection = project3DPointOnto2DScreen({ x, y, z });
  if (textProjection) {
    const textCanvas = convertProjectionToCanvas(textProjection, width, height);
    ctx.fillText(`${x.toString()}, ${y.toString()}, ${z.toString()}`, textCanvas.x, textCanvas.y);
  }
};
