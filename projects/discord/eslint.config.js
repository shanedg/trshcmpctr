import { defineConfig } from 'eslint/config';
import avaConfig from 'eslint-plugin-ava';
import cypressConfig from 'eslint-plugin-cypress';

import eslintConfig from '@trshcmpctr/eslint-config';
import eslintConfigNode from '@trshcmpctr/eslint-config-node';

export default defineConfig([
  eslintConfig,
  eslintConfigNode,
  {
    extends: [avaConfig.configs['flat/recommended']],
    files: ['**/*.test.js'],
    name: 'Recommended Ava',
  },

  {
    extends: [cypressConfig.configs.recommended],
    files: ['cypress/**'],
    name: 'Recommended Cypress',
  },
]);
