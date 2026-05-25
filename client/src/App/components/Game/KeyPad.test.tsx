jest.mock('./use-key-presses');

import { render, screen } from '@testing-library/react';

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
      <KeyPad
        isEmptyFirst={true}
        keyPresses={new Map()}
        keyRows={[['a']]}
      />
    );
    expect(screen.queryByText('a')).toBeFalsy();
  });

  it('renders keys that have been pressed', () => {
    const keyPresses = new Map<string, boolean>();
    // 'a' has already been pressed if set in the map.
    // 'false' means it's not currently pressed.
    keyPresses.set('a', false);
    render(
      <KeyPad
        keyPresses={keyPresses}
        keyRows={[['a']]}
      />
    );
    expect(screen.getByText('a')).not.toBeFalsy();
  });

  it('render un-pressed keys when isEmptyFirst=false', () => {
    render(
      <KeyPad
        isEmptyFirst={false}
        keyPresses={new Map()}
        keyRows={[['a']]}
      />
    );
    expect(screen.getByText('a')).not.toBeFalsy();
  });
});
