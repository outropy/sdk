import { type AxiosInstance } from 'axios';
import deepmerge from 'deepmerge';

import { type components } from '../outropy-env';

type CreateTaskOptions =
  & Partial<components['schemas']['CreateTaskRequest']>
  & {
    task_type: components['schemas']['CreateTaskRequest']['task_type'],
    name: components['schemas']['CreateTaskRequest']['name'],
  };

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
