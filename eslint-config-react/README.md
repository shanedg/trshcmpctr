# @trshcmpctr/eslint-config-react

ESLint config for React in JavaScript projects.

## Usage

This config assumes a base like `@trshcmpctr/eslint-config` is already applied.

### CommonJS

```js
const { defineConfig } = require('eslint/config');

const eslintConfig = require('@trshcmpctr/eslint-config').default;
const reactConfig = require('@trshcmpctr/eslint-config-react').default;

module.exports = defineConfig([
  eslintConfig,
  {
    extends: [reactConfig],
    files: ['**/*.jsx'],
  },
]);
```

### ESM

```js
import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';
import reactConfig from '@trshcmpctr/eslint-config-react';

export default defineConfig([
  eslintConfig,
  {
    extends: [reactConfig],
    files: ['**/*.jsx'],
  },
]);
```
