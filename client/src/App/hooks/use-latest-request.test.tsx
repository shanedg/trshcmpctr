import { act, renderHook } from '@testing-library/react';
import axios, { CanceledError } from 'axios';

jest.mock('axios');

import { useLatestRequest } from './use-latest-request';

const mockedRequestTimeout = 100;

describe('useRequest', () => {
  beforeEach(() => {
    // Heads up, `waitFor` from @testing-library/react defeats fake timers
    // I spent literal hours debugging these tests wondering why
    // fake timers weren't working
    // https://github.com/testing-library/dom-testing-library/blob/56543d51a8776d3bc7fa9b947771ce5308bf5df4/src/wait-for.js#L52
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    (axios as jest.Mocked<typeof axios>).request.mockReset();
  });

  it('wraps successful requests', async () => {
    (axios as jest.Mocked<typeof axios>).request.mockResolvedValue({ data: 'data!' });

    const { result } = renderHook(useLatestRequest, {
      initialProps: {
        url: '/api/v1/success',
      },
    });
    await act(async () => { await jest.runAllTimersAsync(); });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe('data!');
    expect(result.current.error).toBeNull();
  });

  it('wraps requests with configurable options', async () => {
    (axios as jest.Mocked<typeof axios>).request.mockResolvedValue({ data: 'data!' });

    renderHook(useLatestRequest, {
      initialProps: {
        config: {
          baseURL: 'https://www.trshcmpctr.com',
        },
        url: '/api/v1/customizable',
      },
    });
    await act(async () => { await jest.runAllTimersAsync(); });

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenNthCalledWith(1, expect.objectContaining({
      baseURL: 'https://www.trshcmpctr.com',
    }));
  });

  it('wraps failed requests', async () => {
    (axios as jest.Mocked<typeof axios>).request.mockRejectedValue(
      Error('request-error')
    );

    const { result } = renderHook(useLatestRequest, {
      initialProps: {
        url: '/api/v1/failed',
      },
    });
    await act(async () => { await jest.runAllTimersAsync(); });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toStrictEqual(Error('request-error'));
  });

  it('wraps canceled requests', async () => {
    // Canceling a request throws an error
    (axios as jest.Mocked<typeof axios>).request.mockRejectedValue(
      // axios throws CanceledError but other implementations use or
      // rethrow AbortError from AbortController (i.e. built-in fetch)
      CanceledError
    );
    (axios as jest.Mocked<typeof axios>).isCancel.mockReturnValue(true);

    const { result } = renderHook(useLatestRequest, {
      initialProps: {
        url: '/api/v1/canceled',
      },
    });
    await act(async () => { await jest.runAllTimersAsync(); });

    // The host component isn't done loading when a stale request is canceled
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    // Canceled request errors should be ignored
    expect(result.current.error).toBeNull();

    (axios as jest.Mocked<typeof axios>).isCancel.mockReset();
  });

  it('wraps pending requests', async () => {
    (axios as jest.Mocked<typeof axios>).request.mockReturnValue(
      new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: 'data!' });
        }, mockedRequestTimeout);
      })
    );

    const { result } = renderHook(useLatestRequest, {
      initialProps: {
        url: '/api/v1/pending',
      },
    });
    await act(async () => { await jest.advanceTimersByTimeAsync(mockedRequestTimeout - 1); });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => { await jest.runAllTimersAsync(); });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe('data!');
    expect(result.current.error).toBeNull();
  });

  it('wraps pending requests that are canceled on clean up', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    (axios as jest.Mocked<typeof axios>).request.mockReturnValue(
      new Promise(jest.fn())
    );

    const { result, unmount } = renderHook(useLatestRequest, {
      initialProps: {
        url: '/api/v1/pending',
      },
    });
    await act(async () => { await jest.runAllTimersAsync(); });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(abortSpy).toHaveBeenCalledTimes(0);

    unmount();
    await act(async () => { await jest.runAllTimersAsync(); });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(abortSpy).toHaveBeenCalledTimes(1);

    abortSpy.mockReset();
  });
});
