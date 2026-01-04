import { VoxCamera, VoxScene } from '@layoutit/voxcss/react';
import { useMemo } from 'react';

import { Flex } from '@trshcmpctr/components';

import { Nav } from '../Nav';
import { GameContextProvider } from './game-context';
import { KeyPad } from './KeyPad';
import { PlayPause } from './PlayPause';
import { useGameLoop } from './use-game-loop';
import { useKeyPresses } from './use-key-presses';

const Time = ({ time }: { time: number }) => {
  return (
    <p>t: {time}</p>
  );
};

/**
 * TODO: map event key value to alt display label
 */
const keyboardControls = [
  ['q', 'w', 'e'],
  ['a', 's', 'd'],
  [' '],
];

const onTick = () => { /* empty */ };

export const Game = () => {
  const {
    isPaused,
    time,
    togglePaused,
  } = useGameLoop({
    onTick,
    startTime: 0,
    tickDuration: 50,
  });
  const { keyPresses } = useKeyPresses({ keyRows: keyboardControls });

  const value = useMemo(() => ({
    isPaused,
    keyPresses,
    time,
  }), [isPaused, keyPresses, time]);

  const voxels = [
    { shape: 'spike', x: 7, y: 7, z: 0, rot: 90 },
    { shape: 'ramp', x: 6, y: 7, z: 0 },
    { shape: 'ramp', x: 5, y: 7, z: 0 },
    { shape: 'spike', x: 4, y: 7, z: 0 },
    { shape: 'ramp', x: 7, y: 6, z: 0, rot: 90 },
    { shape: 'cube', x: 6, y: 6, z: 0 },
    { shape: 'cube', x: 5, y: 6, z: 0 },
    { shape: 'ramp', x: 4, y: 6, z: 0, rot: 270 },
    { shape: 'ramp', x: 7, y: 5, z: 0, rot: 90 },
    { shape: 'cube', x: 6, y: 5, z: 0 },
    { shape: 'cube', x: 5, y: 5, z: 0 },
    { shape: 'spike', x: 2, y: 5, z: 0 },
    { shape: 'ramp', x: 7, y: 4, z: 0, rot: 90 },
    { shape: 'cube', x: 6, y: 4, z: 0 },
    { shape: 'cube', x: 5, y: 4, z: 0 },
    { shape: 'cube', x: 4, y: 4, z: 0 },
    { shape: 'cube', x: 3, y: 4, z: 0 },
    { shape: 'ramp', x: 3, y: 5, z: 0 },
    { shape: 'ramp', x: 7, y: 3, z: 0, rot: 90 },
    { shape: 'cube', x: 6, y: 3, z: 0 },
    { shape: 'cube', x: 5, y: 3, z: 0 },
    { shape: 'cube', x: 4, y: 3, z: 0 },
    { shape: 'cube', x: 3, y: 3, z: 0 },
    { shape: 'ramp', x: 2, y: 3, z: 0, rot: 270 },
    { shape: 'spike', x: 7, y: 2, z: 0, rot: 180 },
    { shape: 'ramp', x: 6, y: 2, z: 0, rot: 180 },
    { shape: 'ramp', x: 5, y: 2, z: 0, rot: 180 },
    { shape: 'ramp', x: 4, y: 2, z: 0, rot: 180 },
    { shape: 'ramp', x: 3, y: 2, z: 0, rot: 180 },
    { shape: 'spike', x: 2, y: 2, z: 0, rot: 270 },
    { shape: 'ramp', x: 2, y: 4, z: 0, rot: 270 },
    { shape: 'wedge', x: 4, y: 5, z: 0 },
    { shape: 'ramp', x: 4, y: 4, z: 1 },
    { shape: 'spike', x: 3, y: 4, z: 1 },
    { shape: 'ramp', x: 4, y: 3, z: 1, rot: 180 },
    { shape: 'spike', x: 3, y: 3, z: 1, rot: 270 },
    { shape: 'spike', x: 5, y: 3, z: 1, rot: 180 },
    { shape: 'spike', x: 5, y: 4, z: 1, rot: 90 },
  ];

  return (
    <>
      <Nav />
      <article
        style={{
          flexGrow: 1,
        }}
      >
        <Flex
          flexDirection="column"
          style={{
            height: '100%',
          }}
        >
          <h2>game</h2>
          <section
            style={{
              flexGrow: 1,
            }}
          >
            <GameContextProvider value={value}>
              <Flex
                flexDirection="column"
                gap="20px"
                justifyContent="stretch"
                style={{
                  height: '100%',
                }}
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Time time={time} />
                  <PlayPause
                    isPaused={isPaused}
                    togglePaused={togglePaused}
                  />
                </Flex>
                <KeyPad keyRows={keyboardControls} />
                <VoxCamera
                  interactive={true}
                >
                  <VoxScene
                    showFloor={true}
                    showWalls={true}
                    voxels={voxels}
                  />
                </VoxCamera>
              </Flex>
            </GameContextProvider>
          </section>
        </Flex>
      </article>
    </>
  );
};
