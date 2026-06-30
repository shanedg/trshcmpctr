import { defineConfig } from 'eslint/config';
import globals from 'globals';

import eslintConfig from '@trshcmpctr/eslint-config';
import eslintConfigNode from '@trshcmpctr/eslint-config-node';
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
      eslintConfigNode,
    ],
    files: [
      './eslint.config.js',
    ],
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
  eslintConfigTypescript,
  eslintConfigReact,
  eslintConfig,
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
