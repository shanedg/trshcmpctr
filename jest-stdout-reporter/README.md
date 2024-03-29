# @trshcmpctr/jest-stdout-reporter

Prevent Jest from logging normal output to stderr.

By default, Jest writes all output to stderr ([facebook/jest#5064](https://github.com/facebook/jest/issues/5064)).
This custom reporter wraps the default Jest reporter and
redirects "normal" logging output from stderr to stdout.

This is useful for avoiding misleading "succeeded with warnings" messages in [Rush](https://rushjs.io/pages/configs/command-line_json/) output:

```sh
==[ @trshcmpctr/eslint-config ]===================================[ 2 of 10 ]==
PASS lib/eslint-config.test.js

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   5 passed, 5 total
Time:        0.962 s
"@trshcmpctr/eslint-config" completed with warnings in 2.05 seconds.
# <...truncated...>
Operations succeeded with warnings.
# (exit code: 1)
```

Original solution (not mine) found [here](https://github.com/microsoft/fluentui/blob/28ceaaa83cd92a0389c466f0b15b283e3d9b08e4/scripts/jest/jest-reporter.js).

## TODOs

> Note: Added `"allowWarningsInSuccessfulBuild": true` for warnings generated by `--experimental-vm-modules` flag needed for esm support in `@trshcmpctr/discord`.
This allows Jest test runs to complete successfully but is temporary.
Overriding the default Jest reporter still avoids additional "succeeded with warnings" messages.

* Consider removing this package in favor of an open-source reporter like [jest-standard-reporter](https://github.com/chrisgalvan/jest-standard-reporter).

Other interesting reporters: [jest-community/awesome-jest#reporters](https://github.com/jest-community/awesome-jest/blob/main/README.md#reporters)

## Installation

```sh
npm install @trshcmpctr/jest-stdout-reporter --save-dev

# Or in a Rush package:
# rush add -p @trshcmpctr/jest-stdout-reporter --dev
```

## Usage

```sh
jest --reporters=@trshcmpctr/jest-stdout-reporter

# Or via `jest.reporters` in package.json:
# "jest": {
#   "reporters": ["@trshcmpctr/jest-stdout-reporter"]
# }

# Or via the `reporters` property in jest.config.js:
# reporters: ['@trshcmpctr/jest-stdout-reporter']
```
