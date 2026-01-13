import { useMemo, useRef } from 'react';

import { Flex } from '@trshcmpctr/components';

import { Nav } from '../Nav';
import { CanvasScene } from './CanvasScene';
import { GameContextProvider } from './game-context';
import { KeyPad } from './KeyPad';
import { PlayPause } from './PlayPause';
import { useGameLoop } from './use-game-loop';
import { useKeyPresses } from './use-key-presses';

/**
 * TODO: map event key value to alt display label
 */
const keyboardControls = [
  ['q', 'w', 'e'],
  ['a', 's', 'd'],
  [' '],
];

const initialPlayerPosition = {
  x: 0,
  y: 0,
  z: 2,
};

export const Game = () => {
  const playerPosition = useRef({
    ...initialPlayerPosition,
  });

  const tickPlayerState = useRef<{
    xMotion: 'left' | 'right' | 'neutral';
    yMotion: 'forward' | 'backward' | 'neutral';
  }>({
    xMotion: 'neutral',
    yMotion: 'neutral',
  });

  const onKeyDown = (keyName: string) => {
    if (keyName === 'w') {
      if (tickPlayerState.current.yMotion === 'neutral') {
        tickPlayerState.current.yMotion = 'forward';
      } else if (tickPlayerState.current.yMotion === 'backward') {
        tickPlayerState.current.yMotion = 'neutral';
      }
      return;
    }
    if (keyName === 's') {
      if (tickPlayerState.current.yMotion === 'neutral') {
        tickPlayerState.current.yMotion = 'backward';
      } else if (tickPlayerState.current.yMotion === 'forward') {
        tickPlayerState.current.yMotion = 'neutral';
      }
      return;
    }
    if (keyName === 'a') {
      if (tickPlayerState.current.xMotion === 'neutral') {
        tickPlayerState.current.xMotion = 'left';
      } else if (tickPlayerState.current.xMotion === 'right') {
        tickPlayerState.current.xMotion = 'neutral';
      }
      return;
    }
    if (keyName === 'd') {
      if (tickPlayerState.current.xMotion === 'neutral') {
        tickPlayerState.current.xMotion = 'right';
      } else if (tickPlayerState.current.xMotion === 'left') {
        tickPlayerState.current.xMotion = 'neutral';
      }
      return;
    }
  };

  const onKeyUp = (keyName: string) => {
    if (keyName === 'w') {
      tickPlayerState.current.yMotion = 'neutral';
      return;
    }
    if (keyName === 's') {
      tickPlayerState.current.yMotion = 'neutral';
      return;
    }
    if (keyName === 'a') {
      tickPlayerState.current.xMotion = 'neutral';
      return;
    }
    if (keyName === 'd') {
      tickPlayerState.current.xMotion = 'neutral';
      return;
    }
  };

  const { keyPresses } = useKeyPresses({
    keyRows: keyboardControls,
    onKeyDown,
    onKeyUp,
  });
  
  const onTick = () => {
    if (tickPlayerState.current.xMotion === 'neutral' && tickPlayerState.current.yMotion === 'neutral') {
      return;
    }
    if (tickPlayerState.current.xMotion === 'left') {
      playerPosition.current.x -= (0.125);
    }
    if (tickPlayerState.current.xMotion === 'right') {
      playerPosition.current.x += (0.125);
    }
    if (tickPlayerState.current.yMotion === 'forward') {
      playerPosition.current.z += (0.125);
    }
    if (tickPlayerState.current.yMotion === 'backward') {
      playerPosition.current.z -= (0.125);
    }
  };

  const {
    isPaused,
    togglePaused,
  } = useGameLoop({
    onTick,
  });

  const value = useMemo(() => ({
    isPaused,
    keyPresses,
  }), [isPaused, keyPresses]);

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
                  justifyContent="flex-end"
                >
                  <Flex>
                    <PlayPause
                      isPaused={isPaused}
                      togglePaused={togglePaused}
                    />
                  </Flex>
                </Flex>
                <KeyPad keyRows={keyboardControls} />
                <CanvasScene playerPosition={playerPosition} />
              </Flex>
            </GameContextProvider>
          </section>
        </Flex>
      </article>
    </>
  );
};
