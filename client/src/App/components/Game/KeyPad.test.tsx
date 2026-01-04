jest.mock('./use-key-presses');

import { render, screen } from '@testing-library/react';

import { GameContextProvider } from './game-context';
import { KeyPad } from './KeyPad';
import { useKeyPresses } from './use-key-presses';

describe('KeyPad', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useKeyPresses as jest.Mock).mockReturnValue({
      keyPresses: jest.fn()
    });
  });

  it('does not render keys that have not been pressed', () => {
    render(
      <GameContextProvider
        value={{
          isPaused: true,
          keyPresses: new Map(),
          time: 0,
        }}
      >
        <KeyPad
          keyRows={[['a']]}
        />
      </GameContextProvider>
    );
    expect(screen.queryByText('a')).toBeFalsy();
  });

  it('renders keys that have been pressed', () => {
    const keyPresses = new Map<string, boolean>();
    // 'a' has already been pressed if set in the map.
    // 'false' means it's not currently pressed.
    keyPresses.set('a', false);
    render(
      <GameContextProvider
        value={{
          isPaused: true,
          keyPresses,
          time: 0,
        }}
      >
        <KeyPad
          keyRows={[['a']]}
        />
      </GameContextProvider>
    );
    expect(screen.getByText('a')).not.toBeFalsy();
  });

  it('render un-pressed keys when isEmptyFirst=false', () => {
    render(
      <GameContextProvider
        value={{
          isPaused: true,
          keyPresses: new Map(),
          time: 0,
        }}
      >
        <KeyPad
          isEmptyFirst={false}
          keyRows={[['a']]}
        />
      </GameContextProvider>
    );
    expect(screen.getByText('a')).not.toBeFalsy();
  });
});
