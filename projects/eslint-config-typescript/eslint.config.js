import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';
import eslintConfigNode from '@trshcmpctr/eslint-config-node';

export default defineConfig([
  eslintConfig,
  eslintConfigNode,
]);
