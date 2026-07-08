import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Plop, run } from 'plop';

Plop.prepare(
  {
    configPath: join(
      dirname(fileURLToPath(import.meta.url)),
      'plopfile.js',
    ),
  },
  env => Plop.execute(env, run)
);
