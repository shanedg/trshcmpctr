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
  eslintConfig,
  {
    extends: [
      eslintConfigNode,
    ],
    files: [
      './eslint.config.js',
    ],
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
  },
]);
