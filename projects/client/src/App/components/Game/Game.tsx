import { Flex } from '@trshcmpctr/components';

import { Nav } from '../Nav';
import { CanvasSquareScene } from './CanvasScene';

const resolutionFactor = 45;

const sceneHeight = resolutionFactor * 9;
const sceneWidth = resolutionFactor * 16;
// const sceneWidth = resolutionFactor * 9;

export const Game = () => {
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
            <CanvasSquareScene
              height={sceneHeight}
              width={sceneWidth}
            />
          </section>
        </Flex>
      </article>
    </>
  );
};
