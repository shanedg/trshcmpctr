const { defineConfig } = require('eslint/config');
const node = require('eslint-plugin-n');

const eslintConfig = require('@trshcmpctr/eslint-config').default;

module.exports = defineConfig([
  eslintConfig,
  {
    extends: [node.configs['flat/recommended-script']],
    files: ['**/*.cjs'],
  },
  {
    extends: [node.configs['flat/recommended-module']],
    files: ['lib/**/*.js'],
    languageOptions: {
      sourceType: 'module',
    },
  },
]);
