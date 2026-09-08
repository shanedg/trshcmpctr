import { defineConfig } from 'eslint/config';

import eslintConfigNode from '@trshcmpctr/eslint-config-node/esm';

export default defineConfig([
  {
    extends: [eslintConfigNode],
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
