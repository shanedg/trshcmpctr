import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useKeyPresses } from './use-key-presses';

describe('useKeyPresses', () => {
  it('starts with no key presses', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(useKeyPresses, {
      initialProps: {
        keyRows: [
          ['a', 's', 'd', 'f'],
        ],
        onKeyDown: jest.fn(),
        onKeyUp: jest.fn(),
      },
    });
    expect(result.current.keyPresses.size).toEqual(0);
    await user.keyboard('asdf');
    expect(result.current.keyPresses.size).toEqual(4);
  });

  it('responds to keys in props', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(useKeyPresses, {
      initialProps: {
        keyRows: [
          ['a', 's', 'd', 'f'],
        ],
        onKeyDown: jest.fn(),
        onKeyUp: jest.fn(),
      },
    });
    await user.keyboard('asdf');
    expect(result.current.keyPresses.size).toEqual(4);
  });

  it('does not respond to keys not in props', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(useKeyPresses, {
      initialProps: {
        keyRows: [
          ['a', 's', 'd', 'f'],
        ],
        onKeyDown: jest.fn(),
        onKeyUp: jest.fn(),
      },
    });
    await user.keyboard('qwer');
    expect(result.current.keyPresses.size).toEqual(0);
    await user.keyboard('aszxcv');
    expect(result.current.keyPresses.size).toEqual(2);
  });
});
