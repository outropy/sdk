import axios, { AxiosInstance } from 'axios';
import deepmerge from 'deepmerge';

import { createTask } from './utils/tasks';

type ApiClientAppConfig = {
  endPoint: string,
  apiKey: string,
};

/**
 * @example
 * Recommended usage:
 * ```ts
 * import { createApiClient } from '@outropy/typescript';
 *
 * const outropy = createApiClient({
 *   apiKey: process.env.OUTROPY_API_KEY,
 * });
 *
 * await outropy.get('/path/to/endpoint');
 * ```
 */
export function createApiClient(appConfig: ApiClientAppConfig) {
  const config: ApiClientAppConfig = deepmerge(
    {
      endPoint: process.env.OUTROPY_API_ENDPOINT,
      apiKey: process.env.OUTROPY_API_KEY,
    },
    appConfig,
  );

  const customAxiosInstance = axios.create({
    baseURL: `${config.endpoint}/api`,
    withCredentials: true,
  });

  if (!config.apiKey) {
    throw new Error('Outropy API key is required. Please set the OUTROPY_API_KEY environment variable or pass it in the client config.');
  }

  customAxiosInstance.interceptors.request.use(
    async function onRequestSuccess(request) {
      request.headers['Authorization'] = `Bearer ${config.apiKey}`;

      return request;
    },
  );

  customAxiosInstance.interceptors.response.use(
    async function onResponseSuccess(response) {
      return response;
    },
    async function onResponseError(error) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }

      return Promise.reject(error);
    },
  );

  return customAxiosInstance;
}

/**
 * @example
 * Recommended usage:
 * ```ts
 * import { outropy as outropyClient } from '@outropy/typescript';
 *
 * const outropy = outropyClient({
 *   apiKey: process.env.OUTROPY_API_KEY,
 * });
 * ```
 */
export function outropy(appConfig: ApiClientAppConfig) {
  const client = createApiClient(appConfig);

  function addClientInstance<T extends (client: AxiosInstance, ...args: any[]) => any>(fn: T): (
    ...args: Parameters<T> extends [AxiosInstance, ...infer R] ? R : never
  ) => ReturnType<T> {
    return (...args: Parameters<T> extends [AxiosInstance, ...infer R] ? R : never) => {
      return fn(client, ...args);
    };
  }

  return {
    /**
     * Create a new Task.
     */
    createTask: addClientInstance(createTask),
  };
};
