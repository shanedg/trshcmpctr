# @trshcmpctr/eslint-config

Base ESLint config for JavaScript projects.

Extend this config in your flat eslint.config.js file to set defaults suitable for
any JavaScript file but especially for
linting untranspiled, untransformed JavaScript files like those in your project root.

## Usage

```js
import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';

export default defineConfig([
  eslintConfig,
]);
```
