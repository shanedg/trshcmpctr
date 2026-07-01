import { useEffect, useRef } from 'react';

import { Flex } from '@trshcmpctr/components';

import { getCanvasRenderingContext2D } from './get-canvas-rendering-context-2d';
import { useAnimationFrameManager } from './use-animation-frame-manager';
import { useDrawScene } from './use-draw-scene';
import { useKeyPresses } from './use-key-presses';
import { useUpdatePosition } from './use-update-position';

const keyRows = [
  ['q', 'w', 'e', 'r'],
  ['a', 's', 'd', 'f'],
  ['z', 'x', 'c', 'v'],
  [' '],
];

const convertDegreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const initialCamera = {
  angleXY: convertDegreesToRadians(0),
  angleXZ: convertDegreesToRadians(0),
  angleYZ: convertDegreesToRadians(0),
  x: 0,
  y: 0,
  z: 5,
};

export const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = '#404040';
  ctx.beginPath();
  ctx.fillRect(0, 0, width, height);
  ctx.closePath();
};

interface CanvasSquareSceneProps {
  height: number;
  isDebug?: boolean;
  width: number;
}

export const CanvasSquareScene = ({
  height,
  isDebug = true,
  width,
}:  CanvasSquareSceneProps) => {
  const cameraRef = useRef({ ...initialCamera });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const timeFrameRequestedMillisecondsRef = useRef<DOMHighResTimeStamp>(0);

  const frameManager = useAnimationFrameManager();
  const { keyPressesRef } = useKeyPresses({ keyRows });
  const { updatePosition } = useUpdatePosition({
    keyPressesRef,
    positionRef: cameraRef,
  });
  const { drawSceneFrame, drawSceneObjects } = useDrawScene({
    cameraRef,
    canvasStart: { x: (width - height) / 2, y: 0 },
    canvasEnd: { x: width - (width - height) / 2, y: height },
    ctxRef,
  });

  useEffect(() => {
    const frameTask: FrameRequestCallback = (timeLastFrameEndMilliseconds: DOMHighResTimeStamp) => {
      if (!canvasRef.current) {
        return;
      }
      ctxRef.current = getCanvasRenderingContext2D({ canvasRef });
      const ctx = ctxRef.current;
      if (!ctx) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- FIXME:
      const timeSinceLastFrameEndMilliseconds = timeLastFrameEndMilliseconds - timeFrameRequestedMillisecondsRef.current;

      updatePosition();
      ctx.clearRect(0, 0, width, height);
      drawBackground(ctx, width, height);

      const sidePanelWidth = (width - height) / 2;

      ctx.fillStyle = '#4040ff';
      ctx.beginPath();
      ctx.fillRect(0, 0, sidePanelWidth, height);
      ctx.closePath();

      ctx.fillStyle = '#4040ff';
      ctx.beginPath();
      ctx.fillRect(width - sidePanelWidth, 0, sidePanelWidth, height);
      ctx.closePath();

      // drawCube({ ctx, cubeOrigin: cameraRef.current, height, width: height });
      // drawCube({ ctx, cubeOrigin: transformX(cameraRef.current, 4), height, width: height });

      // const sceneCanvasStart = { x: (width - height) / 2, y: 0 };
      // const sceneCanvasEnd = { x: width - (width - height) / 2, y: height };
      // drawSceneObjectsFromPerspective({
      //   camera: cameraRef.current,
      //   canvasEnd: sceneCanvasEnd,
      //   canvasStart: sceneCanvasStart,
      //   ctx,
      // });

      drawSceneFrame({ frameInset: 10 });
      drawSceneObjects([
        {
          origin: cameraRef.current,
          rotation: {
            angleXY: 0,
            angleXZ: 0,
            angleYZ: 0,
          },
          edges: [
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
        }
      ]);

      if (isDebug) {
        const actualFps = frameManager.framesPerSecondRef.current?.toFixed();
        ctx.fillStyle = 'lime';
        ctx.fillText(`fps: ${actualFps?.toString() ?? '--'}`, width - 40, 12);
      }
      timeFrameRequestedMillisecondsRef.current = timeLastFrameEndMilliseconds;
    };

    frameManager.addTask(frameTask);
    frameManager.start();

    return () => {
      stop();
      frameManager.removeTask(frameTask);
    };
  }, [drawSceneFrame, drawSceneObjects, frameManager, height, isDebug, updatePosition, width]);

  return (
    <Flex
      flexDirection="column"
      gap="20px"
      justifyContent="stretch"
      style={{
        height: '100%',
      }}
    >
      <canvas
        height={height}
        id="canvas-scene"
        ref={canvasRef}
        width={width}
      />
    </Flex>
  );
};
