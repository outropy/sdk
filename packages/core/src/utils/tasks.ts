import { type AxiosInstance } from 'axios';
import deepmerge from 'deepmerge';

import { type components } from '../outropy-env';

type CreateTaskOptions =
  & Partial<components['schemas']['CreateTaskRequest']>
  & {
    task_type: components['schemas']['CreateTaskRequest']['task_type'],
    name: components['schemas']['CreateTaskRequest']['name'],
  };

type GetTaskByNameOptions = {
  name: string;
}

/**
 * Create a new Task
 */
export async function createTask(
  client: AxiosInstance,
  options: CreateTaskOptions,
): Promise<components['schemas']['PipelineCreateResponse']> {
  const mergedOptions = deepmerge(
    /**
     * Default values.
     */
    {
      examples: [],
      reference_data: [],
    },
    options,
  );

  const { data } = await client.post<components['schemas']['PipelineCreateResponse']>(
    '/tasks/create',
    mergedOptions,
  );

  return data;
}

type ExecuteTaskOptions = components['schemas']['ExecuteTaskRequest'];

/**
 * Execute a task with the given input. Tasks are executed asynchronously,
 * this will return a `urn` for the task run which can be used to retrieve
 * the results later.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/execute-task}
 */
export async function executeTask(
  client: AxiosInstance,
  options: ExecuteTaskOptions,
) {
  const { data } = await client.post<components['schemas']['TaskExecuteResponse']>(
    '/tasks/execute',
    options,
  );

  return data;
}


export async function getTaskByName(
  client: AxiosInstance,
  options: GetTaskByNameOptions,
) {
  const result = await client.get<string | null>(
    `/tasks/by-name/${options.name}`,
  );
  if (result.status === 200) {
    return result.data;
  }

  return null;
}
