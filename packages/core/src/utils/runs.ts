import { type AxiosInstance } from 'axios';

import { components } from '../outropy-env';

type GetTaskRunOptions = {
  /**
   * The urn of the task run to retrieve.
   */
  task_run_urn: string,
}

export async function getRun(
  client: AxiosInstance,
  options: GetTaskRunOptions,
) {
  const { task_run_urn } = options;

  const { data } = await client.get<components['schemas']['TaskRunResponse']>(
    `/tasks/runs/${task_run_urn}`,
  );

  return data;
}

type GetTaskRunInputsOptions = {
  /**
   * The urn of the task run to retrieve the inputs for.
   */
  task_run_urn: string,
}

/**
 * Retrieve the inputs used for a given task run.
 *
 * @see {@link https://docs.outropy.ai/api-reference/endpoint/get-run-inputs}
 */
export async function getRunInputs(
  client: AxiosInstance,
  options: GetTaskRunInputsOptions,
) {
  const { task_run_urn } = options;

  const { data } = await client.get<components['schemas']['TaskRunResponse']>(
    `/tasks/runs/${task_run_urn}/inputs`,
  );

  return data;
}
