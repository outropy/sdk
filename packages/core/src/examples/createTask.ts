import { outropyClient as outropyClient } from '../outropy';

const outropy = outropyClient();

(async () => {
  const response = await outropy.createTask({
    task_type: 'transform',
    name: 'character_extractor',
  });

  console.log('createTask:\n', response);
})();
