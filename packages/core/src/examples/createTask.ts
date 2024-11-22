import { outropy as outropyClient } from '../outropy';
import { createTask } from '../utils/tasks';

const outropy = outropyClient({
  apiKey: 'ot-example-key',
  endPoint: 'http://localhost:8000',
});

(async () => {
  const response = await outropy.createTask({
    task_type: 'transform',
    name: 'character_extractor',
  });

  console.log('createTask:\n', response);
})();
