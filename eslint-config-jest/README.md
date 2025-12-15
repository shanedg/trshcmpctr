# @trshcmpctr/eslint-config-jest

ESLint config for Jest tests in JavaScript projects.

## Usage

This config assumes a base like `@trshcmpctr/eslint-config` is already applied.

```js
// eslint.config.cjs
const { defineConfig } = require('eslint/config');

const eslintConfig = require('@trshcmpctr/eslint-config');
const jestConfig = require('@trshcmpctr/eslint-config-jest');

module.exports = defineConfig([
  eslintConfig,
  {
    extends: [jestConfig],
    files: ['**/*.test.js'],
  },
]);
```
