# @trshcmpctr/eslint-config-react

ESLint config for React in JavaScript projects.

## Usage

This config assumes a base like `@trshcmpctr/eslint-config` is already applied.

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
