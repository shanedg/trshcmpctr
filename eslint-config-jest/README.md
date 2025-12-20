# @trshcmpctr/eslint-config-jest

ESLint config for Jest tests in JavaScript projects.

## Usage

This config assumes a base like `@trshcmpctr/eslint-config` is already applied.

### CommonJS

```js
const { defineConfig } = require('eslint/config');

const eslintConfig = require('@trshcmpctr/eslint-config').default;
const jestConfig = require('@trshcmpctr/eslint-config-jest').default;

module.exports = defineConfig([
  eslintConfig,
  {
    extends: [jestConfig],
    files: ['**/*.test.js'],
  },
]);
```

### ESM

```js
import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';
import jestConfig from '@trshcmpctr/eslint-config-jest';

export default defineConfig([
  eslintConfig,
  {
    extends: [jestConfig],
    files: ['**/*.test.js'],
  },
]);
```
