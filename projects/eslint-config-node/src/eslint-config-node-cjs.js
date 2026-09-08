import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';

import eslintConfig from '@trshcmpctr/eslint-config';

import eslintConfigNode from './eslint-config-node.js';

export default defineConfig([
  {
    extends: [
      eslintConfig,
      eslintConfigNode,
      node.configs['flat/recommended-script'],
    ],
    languageOptions: {
      sourceType: 'commonjs',
    },
    name: 'Recommended Node CJS',
    rules: {
      // Default node resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
      // Redundant with import/no-unresolved and not as robust
      'n/no-missing-require': 'off',
    },
  },
]);
