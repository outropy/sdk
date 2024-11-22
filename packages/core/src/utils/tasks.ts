import { type AxiosInstance } from 'axios';
import deepmerge from 'deepmerge';

import { type components } from '../outropy-env';

type CreateTaskOptions =
  & Partial<components['schemas']['CreateTaskRequest']>
  & {
    task_type: components['schemas']['CreateTaskRequest']['task_type'],
    name: components['schemas']['CreateTaskRequest']['name'],
  };

export async function createTask(
  client: AxiosInstance,
  options: CreateTaskOptions,
): Promise<components['schemas']['PipelineCreateResponse']> {
  const mergedOptions = deepmerge(
    /**
     * Default values.
     */
    {
      directives: {
        latency: 0,
        accuracy: 0,
        cost: 0,
        reproducibility: 0,
        freshness: 0,
        personalization: 0,
        recall: 0,
        creativity: 0
      },
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
