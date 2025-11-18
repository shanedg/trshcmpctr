const babelParser = require('@babel/eslint-parser');
const { defineConfig } = require('eslint/config');
const node = require('eslint-plugin-n');

const eslintConfig = require('@trshcmpctr/eslint-config');

module.exports = defineConfig([
  eslintConfig,
  node.configs['flat/recommended-script'],
  {
    languageOptions: {
      // eslint-plugin-import needs @babel/eslint-parser to understand:
      // 1. import attributes aka json imports
      // (import config from './config.json' with { type: 'json' })
      // 2. wildcard re-exports
      // (export * from './some-file')
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        // No actual transpilation by babel (just parsing) so no config file
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
        },
      },
      sourceType: 'module',
    },
    name: 'Deploy Customizations',
  },
]);
