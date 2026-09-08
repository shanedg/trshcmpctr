import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';
import eslintConfigNodeLegacy from '@trshcmpctr/eslint-config-node';

export default defineConfig([
  {
    extends: [
      eslintConfig,
      eslintConfigNodeLegacy,
    ],
    rules: {
      // Default node resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
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
