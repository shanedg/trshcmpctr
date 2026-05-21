import { type RefObject } from 'react';

import { type Point3D } from './draw-point';

type RotationalMotion = 'clockwise' | 'counterclockwise' | 'neutral';

interface PointWithRotation {
  angleXY: number;
  angleXZ: number;
  angleYZ: number;
}

interface UseUpdatePosition {
  keyPressesRef: RefObject<Map<string, boolean>>;
  positionRef: RefObject<PointWithRotation & Point3D>;
  xVelocity?: number;
  rotationDegreeChange?: number;
  yVelocity?: number;
  zVelocity?: number;
}

export const useUpdatePosition = ({
  keyPressesRef,
  positionRef,
  xVelocity = 0.25,
  rotationDegreeChange = 1/16,
  yVelocity = 0.25,
  zVelocity = 0.25,
}: UseUpdatePosition) => {
  const keyPresses = keyPressesRef.current;

  const getXMotion = () => {
    // const a = keyPresses.get('a');
    // const d = keyPresses.get('d');
    // if (a && d) {
    //   return 'neutral';
    // }
    // if (a) {
    //   return 'left';
    // }
    // if (d) {
    //   return 'right';
    // }
    return 'neutral';
  };

  const getYMotion = () => {
    const e = keyPresses.get('e');
    const c = keyPresses.get('c');
    if (e && c) {
      return 'neutral';
    }
    if (e) {
      return 'up';
    }
    if (c) {
      return 'down';
    }
    return 'neutral';
  };

  const getZMotion = () => {
    const w = keyPresses.get('w');
    const s = keyPresses.get('s');
    if (w && s) {
      return 'neutral';
    }
    if (w) {
      return 'forward';
    }
    if (s) {
      return 'backward';
    }
    return 'neutral';
  };

  const getMotion = () => {
    return {
      x: getXMotion(),
      xyRotation: getXYRotationMotion(),
      xzRotation: getXZRotationMotion(),
      yzRotation: getYZRotationMotion(),
      y: getYMotion(),
      z: getZMotion(),
    };
  };

  const getXYRotationMotion = (): RotationalMotion => {
    // const a = keyPresses.get('a');
    // const d = keyPresses.get('d');
    // if (a && d) {
    //   return 'neutral';
    // }
    // if (a) {
    //   return 'clockwise';
    // }
    // if (d) {
    //   return 'counterclockwise';
    // }
    return 'neutral';
  };

  const getXZRotationMotion = (): RotationalMotion => {
    // const a = keyPresses.get('a');
    // const d = keyPresses.get('d');
    // if (a && d) {
    //   return 'neutral';
    // }
    // if (a) {
    //   return 'clockwise';
    // }
    // if (d) {
    //   return 'counterclockwise';
    // }
    return 'neutral';
  };

  const getYZRotationMotion = (): RotationalMotion => {
    const a = keyPresses.get('a');
    const d = keyPresses.get('d');
    if (a && d) {
      return 'neutral';
    }
    if (a) {
      return 'clockwise';
    }
    if (d) {
      return 'counterclockwise';
    }
    return 'neutral';
  };

  const updatePosition = () => {
    const {
      x: xMotion,
      xyRotation,
      xzRotation,
      yzRotation,
      y: yMotion,
      z: zMotion,
    } = getMotion();
    const position = positionRef.current;
    if (xMotion === 'left') {
      position.x -= xVelocity;
    }
    if (xMotion === 'right') {
      position.x += xVelocity;
    }
    if (yMotion === 'up') {
      position.y += yVelocity;
    }
    if (yMotion === 'down') {
      position.y -= yVelocity;
    }
    if (zMotion === 'forward') {
      position.z += zVelocity;
    }
    if (zMotion === 'backward') {
      position.z -= zVelocity;
    }
    if (xyRotation === 'clockwise') {
      position.angleXY += rotationDegreeChange;
    }
    if (xyRotation === 'counterclockwise') {
      position.angleXY -= rotationDegreeChange;
    }
    if (xzRotation === 'clockwise') {
      position.angleXZ += rotationDegreeChange;
    }
    if (xzRotation === 'counterclockwise') {
      position.angleXZ -= rotationDegreeChange;
    }
    if (yzRotation === 'clockwise') {
      position.angleYZ += rotationDegreeChange;
    }
    if (yzRotation === 'counterclockwise') {
      position.angleYZ -= rotationDegreeChange;
    }
  };

  return {
    /**
     * Mutate position based on keys pressed in the current frame
     */
    updatePosition,
  };
};
