import axios, { AxiosInstance, HttpStatusCode } from 'axios';
import deepmerge from 'deepmerge';

import { createTask } from './utils/tasks';

type OutropyClientConfig = {
  /**
   * Outropy API endpoint. If not provided, it will default to the value
   * of the OUTROPY_API_ENDPOINT environment variable.
   * @default process.env.OUTROPY_API_ENDPOINT
   */
  endPoint?: string,
  /**
   * Outropy API key. If not provided, it will default to the value of the
   * OUTROPY_API_KEY environment variable.
   * @default process.env.OUTROPY_API_KEY
   */
  apiKey?: string,
};

/**
 * Create a fetch-based Outropy client.
 *
 * @example
 * Recommended usage:
 * ```ts
 * import { createOutropyClient } from '@outropy/typescript';
 *
 * const outropy = createOutropyClient();
 *
 * async function doSomething() {
 *   const response = await outropy.post('/tasks/create', {
 *     task_type: 'transform',
 *     name: 'character_extractor',
 *   });
 * }
 * ```
 */
export function createOutropyClient(clientConfig: OutropyClientConfig) {
  const config: OutropyClientConfig = deepmerge(
    {
      endPoint: process.env.OUTROPY_API_ENDPOINT,
      apiKey: process.env.OUTROPY_API_KEY,
    },
    clientConfig,
  );

  const customAxiosInstance = axios.create({
    baseURL: `${config.endPoint}/api`,
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
        const skipAxiosException = [
          HttpStatusCode.Unauthorized,
          HttpStatusCode.NotFound,
        ].includes(error.response?.status!);

        if (skipAxiosException) {
          return error.response;
        }
      }

      return Promise.reject(error);
    },
  );

  return customAxiosInstance;
}

/**
 * Create an Outropy client with ready-to-use methods.
 *
 * @example
 * Recommended usage:
 * ```ts
 * import { outropyClient } from '@outropy/typescript';
 *
 * const outropy = outropyClient();
 *
 * async function doSomething() {
 *   const data = await outropy.createTask({
 *     task_type: 'transform',
 *     name: 'character_extractor',
 *   });
 * }
 * ```
 */
export function outropyClient(clientConfig: OutropyClientConfig = {}) {
  const client = createOutropyClient(clientConfig);

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
