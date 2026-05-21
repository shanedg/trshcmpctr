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
      },
    });
    expect(result.current.keyPressesRef.current.size).toEqual(0);
    await user.keyboard('asdf');
    expect(result.current.keyPressesRef.current.size).toEqual(4);
  });

  it('responds to keys in props', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(useKeyPresses, {
      initialProps: {
        keyRows: [
          ['a', 's', 'd', 'f'],
        ],
      },
    });
    await user.keyboard('asdf');
    expect(result.current.keyPressesRef.current.size).toEqual(4);
  });

  it('does not respond to keys not in props', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(useKeyPresses, {
      initialProps: {
        keyRows: [
          ['a', 's', 'd', 'f'],
        ],
      },
    });
    await user.keyboard('qwer');
    expect(result.current.keyPressesRef.current.size).toEqual(0);
    await user.keyboard('aszxcv');
    expect(result.current.keyPressesRef.current.size).toEqual(2);
  });
});
