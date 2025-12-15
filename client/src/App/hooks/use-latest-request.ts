import axios, { AxiosResponse, isCancel, type AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

interface UseLatestRequestReturnType<T> {
  data: T | null,
  error: Error | null,
  isLoading: boolean,
}

/**
 * Wrap component network requests in a standard hook interface
 * Only use result of most recent request
 * @param url Request url
 * @param config Request configuration
 * @returns A hook for wrapping network requests in a standard interface
 */
export const useLatestRequest = <T, D = never>(url: string, config?: AxiosRequestConfig<D>) => {
  const useRequestWithCancel = (): UseLatestRequestReturnType<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const controller = new AbortController();

      if (data === null && error === null) {
        axios.request<T>({
          signal: controller.signal,
          url,
          ...(config ?? {})
        })
          .then((response: AxiosResponse<T>) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error: unknown) => {
            // Aborting a request throws an error that should be ignored
            // https://axios-http.com/docs/cancellation
            // Canceled, stale requests do not change the loading state
            // because either:
            // 1. the hook was unmounted before the request completed; or
            // 2. a more recent request is now in-flight
            if (!isCancel(error)) {
              setError(error as Error);
              setIsLoading(false);
            }
          });
      }

      // Cancel stale in-flight requests when cleaned up
      return () => { controller.abort(); };
    }, [data, error]);

    return {
      data,
      error,
      isLoading,
    };
  };
  return useRequestWithCancel;
};
