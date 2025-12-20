import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';
import globals from 'globals';

import eslintConfig from '@trshcmpctr/eslint-config';

export default defineConfig([
  {
    extends: [
      node.configs['flat/recommended-module'],
      eslintConfig,
    ],
    languageOptions: {
      /**
       * Node 20.19.5 supports 100% of ES2023 features,
       * only some of 2024, and very little of 2025.
       * See <https://node.green/#ES2023>
       */
      ecmaVersion: 2023,
      globals: globals.nodeBuiltin,
    },
    rules: {
      // Default node resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-unresolved': ['error', {
        /**
         * import/no-unresolved cannot parse commonjs subpath exports
         * but can still report whether ignored modules are located:
         * See [rules/no-unresolved.md#ignore](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore)
         */
        ignore: [
          'eslint/config',
        ],
      }],
    },
  },
]);
