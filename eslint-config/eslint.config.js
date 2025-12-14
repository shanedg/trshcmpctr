const { defineConfig } = require('eslint/config');
const node = require('eslint-plugin-n');

const eslintConfig = require('./lib/eslint-config.js');

module.exports = defineConfig([
  // It lints itself :)
  eslintConfig,
  node.configs['flat/recommended-script'],
]);
