import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';

import eslintConfigNode from './src/eslint-config-node.js';

export default defineConfig([
  eslintConfig,
  // It lints itself :)
  eslintConfigNode,
]);
