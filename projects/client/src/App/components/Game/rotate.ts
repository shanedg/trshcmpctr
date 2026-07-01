import { type Point3D } from './draw-point';

export const rotateXY = ({ x, y, z }: Point3D, angleRadians: number) => {
  const cosine = Math.cos(angleRadians);
  const sine = Math.sin(angleRadians);
  return {
    x: x * cosine - y * sine,
    y: x * sine + y * cosine,
    z,
  };
};

export const rotateXZ = ({ x, y, z }: Point3D, angleRadians: number) => {
  const cosine = Math.cos(angleRadians);
  const sine = Math.sin(angleRadians);
  return {
    x: x * cosine - z * sine,
    y,
    z: x * sine + z * cosine,
  };
};

export const rotateYZ = ({ x, y, z }: Point3D, angleRadians: number) => {
  const cosine = Math.cos(angleRadians);
  const sine = Math.sin(angleRadians);
  return {
    x,
    y: y * cosine - z * sine,
    z: y * sine + z * cosine,
  };
};
