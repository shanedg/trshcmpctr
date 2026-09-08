import { defineConfig } from 'eslint/config';
import globals from 'globals';

import eslintConfigNodeEsm from '@trshcmpctr/eslint-config-node/esm';
import eslintConfigReact from '@trshcmpctr/eslint-config-react';
import eslintConfigTypescript from '@trshcmpctr/eslint-config-typescript';

export default defineConfig([
  {
    ignores: [
      'lib',
      'node_modules',
    ],
  },
  {
    extends: [
      eslintConfigNodeEsm,
    ],
    files: [
      './eslint.config.js',
    ],
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
  eslintConfigTypescript,
  eslintConfigReact,
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      // Browser code is transpiled by babel so it's ok to use the latest features
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    rules: {
      // Redundant with TS checks
      'import/no-unresolved': 'off',
    },
  },
]);
