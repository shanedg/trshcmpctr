# @trshcmpctr/eslint-config-typescript

ESLint config for TypeScript in JavaScript projects.

## Usage

This config assumes a base like `@trshcmpctr/eslint-config` is already applied.

There is a performance cost for some of the rules this config applies.
The folks behind `typescript-eslint` suggest it's worth it: <https://typescript-eslint.io/getting-started/typed-linting/#performance>

```js
// eslint.config.cjs
const { defineConfig } = require('eslint/config');

const eslintConfig = require('@trshcmpctr/eslint-config');
const tsEslintConfig = require('@trshcmpctr/eslint-config-typescript');

module.exports = defineConfig([
  eslintConfig,
  {
    extends: [tsEslintConfig],
    files: ['**/*.ts'],
  },
]);
```
