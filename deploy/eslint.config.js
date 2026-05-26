import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';
import eslintConfigNode from '@trshcmpctr/eslint-config-node';

export default defineConfig([
  {
    extends: [
      eslintConfigNode,
      eslintConfig,
    ],
    languageOptions: {
      /**
       * Node 24.16.8 supports virtually all features ES2025 and below,
       * See <https://node.green/#ES2023>
       */
      ecmaVersion: 2025,
    },
    rules: {
      // Node default resolution requires extensions for relative imports
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
