import { defineConfig } from 'eslint/config';

import eslintConfigNodeEsm from './src/eslint-config-node-esm.js';

export default defineConfig([
  {
    extends: [eslintConfigNodeEsm],
    rules: {
      'import/no-unresolved': ['error', {
        /**
         * import/no-unresolved cannot parse subpath exports
         * but can still report if ignored modules are not found:
         * See [rules/no-unresolved.md#ignore](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore)
         */
        ignore: [
          'eslint/config',
        ],
      }],
    },
  },
]);
