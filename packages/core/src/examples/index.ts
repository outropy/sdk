import { outropyClient } from '../outropy';

const outropy = outropyClient();

(async () => {
  const createTaskResponse = await outropy.createTask({
    task_type: 'transform',
    name: 'character_extractor',
  });

  console.log('createTask():\n', createTaskResponse);

  const executeTaskResponse = await outropy.executeTask({
    task_urn: createTaskResponse.urn,
  });

  console.log('executeTask():\n', executeTaskResponse);

  const getRunResponse = await outropy.getRun({
    task_run_urn: executeTaskResponse.urn,
  });

  console.log('getRun():\n', getRunResponse);

  const getRunInputsResponse = await outropy.getRunInputs({
    task_run_urn: getRunResponse.urn,
  });

  console.log('getRunInputs():\n', getRunInputsResponse);
})();
