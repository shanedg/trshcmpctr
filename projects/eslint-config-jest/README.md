# @trshcmpctr/eslint-config-jest

ESLint config for Jest tests in JavaScript projects.

## Usage

This config assumes a base like `@trshcmpctr/eslint-config` is already applied.

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
