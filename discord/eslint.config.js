import { defineConfig } from 'eslint/config';
import avaConfig from 'eslint-plugin-ava';
import cypressConfig from 'eslint-plugin-cypress';

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
       * Import attributes are supported in 20.10.0
       * but eslint will only parse them starting in 2025.
       * <https://nodejs.org/api/esm.html#import-attributes>
       */
      ecmaVersion: 2025,
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
          '@trshcmpctr/client/paths',
          'ava',
          'eslint/config',
          'lowdb/node',
        ],
      }],
    },
  },
  {
    extends: [avaConfig.configs['flat/recommended']],
    files: ['**/*.test.js'],
    name: 'Recommended Ava',
  },

  {
    extends: [cypressConfig.configs.recommended],
    files: ['cypress/**'],
    name: 'Recommended Cypress',
    rules: {
      'import/extensions': 'off',
    },
  },
]);
