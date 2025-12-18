const { defineConfig } = require('eslint/config');
const node = require('eslint-plugin-n');

const eslintConfig = require('@trshcmpctr/eslint-config').default;

module.exports = defineConfig([
  node.configs['flat/recommended-script'],
  eslintConfig,
]);
