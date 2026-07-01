# @trshcmpctr/eslint-node

ESLint config for Node ESM files

## Usage

> Note: Does not support CommonJS files

### Linting a Node runtime project

```js
import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';
import nodeConfig from '@trshcmpctr/eslint-config-node';

export default defineConfig([
  nodeConfig,
  eslintConfig,
]);
```

### Linting only a project's Node configuration files

```js
import { defineConfig } from 'eslint/config';

import eslintConfig from '@trshcmpctr/eslint-config';
import nodeConfig from '@trshcmpctr/eslint-config-node';

const esmConfigFiles = [
  'webpack.config.js',
  'babel.config.js',
];

export default defineConfig([
  {
    extends: [nodeConfig],
    files: esmConfigFiles,
  },
  eslintConfig,
]);
```
