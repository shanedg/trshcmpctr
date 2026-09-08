import { defineConfig } from 'eslint/config';

import eslintConfigNodeEsm from '@trshcmpctr/eslint-config-node/esm';

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
          '@trshcmpctr/eslint-config-node',
          'eslint/config',
        ],
      }],
    },
  },
]);
