import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';

import eslintConfig from '@trshcmpctr/eslint-config';

import eslintConfigNode from './eslint-config-node.js';

export default defineConfig([
  {
    extends: [
      eslintConfig,
      eslintConfigNode,
      node.configs['flat/recommended-module'],
    ],
    name: 'Recommended Node ESM',
    rules: {
      // Default node resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
      // Redundant with import/no-unresolved and not as robust
      'n/no-missing-import': 'off',
    },
  },
]);
