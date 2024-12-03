import axios, { AxiosInstance, HttpStatusCode } from 'axios';
import deepmerge from 'deepmerge';

import {
  createTask,
  downloadData,
  executeTask,
  getMetadata,
  getRun,
  getRunInputs,
  setMetadata,
  uploadData,
} from './utils';
import { createDataSource, createIndex, getDataSourceByName, getDataSourceByUrn, getIndexByName } from './utils/data-sources';

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

  console.log('config', config);

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
    /**
     * Execute a task with the given input. Tasks are executed asynchronously,
     * this will return a `urn` for the task run which can be used to retrieve
     * the results later.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/execute-task}
     */
    executeTask: addClientInstance(executeTask),
    /**
     * Retrieve the inputs used for a given task run.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-run-inputs}
     */
    getRun: addClientInstance(getRun),
    /**
     * Retrieve the inputs used for a given task run.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-run-inputs}
     */
    getRunInputs: addClientInstance(getRunInputs),
    /**
     * Upload a text-based file to Outropy.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/upload-data}
     */
    uploadData: addClientInstance(uploadData),
    /**
     * Download a data file from Outropy.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/download-data}
     */
    downloadData: addClientInstance(downloadData),
    /**
     * Get metadata for a data file from Outropy.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-metadata}
     */
    getMetadata: addClientInstance(getMetadata),
    /**
     * Set metadata for a data file in Outropy.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/set-metadata}
     */
    setMetadata: addClientInstance(setMetadata),
    /**
     * Create a data source.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/create-data-source}
     */
    createDataSource: addClientInstance(createDataSource),
    /**
     * Get a data source by name.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-data-source-by-name}
     */
    getDataSourceByName: addClientInstance(getDataSourceByName),
    /**
     * Create an index.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/create-index}
     */
    createIndex: addClientInstance(createIndex),
    /**
     * Get an index by name.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-index-by-name}
     */
    getIndexByName: addClientInstance(getIndexByName),
    /**
     * Get a data source by URN.
     *
     * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-data-source-by-urn}
     */
    getDataSourceByUrn: addClientInstance(getDataSourceByUrn),
  };
};
