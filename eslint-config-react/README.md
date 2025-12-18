# @trshcmpctr/eslint-config-react

ESLint config for React in JavaScript projects.

## Usage

This config assumes a base like `@trshcmpctr/eslint-config` is already applied.

```js
// eslint.config.cjs
const { defineConfig } = require('eslint/config');

const eslintConfig = require('@trshcmpctr/eslint-config').default;
const reactConfig = require('@trshcmpctr/eslint-config-react');

module.exports = defineConfig([
  eslintConfig,
  {
    extends: [reactConfig],
    files: ['**/*.jsx'],
  },
]);
```
