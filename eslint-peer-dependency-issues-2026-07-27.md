# eslint peer dependency issues

blockers:

- [eslint-plugin-import#3227](https://github.com/import-js/eslint-plugin-import/issues/3227) - close!
- [eslint-plugin-jest-dom#417](https://github.com/testing-library/eslint-plugin-jest-dom/issues/417) - release pipeline broken, maybe abandoned?
- [eslint-plugin-jsx-a11y#1075](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/1075) - recent development, no release yet
- [eslint-plugin-react#3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977) - close! same maintainer + blockers as eslint-plugin-import

## after unblocking

don't forget to:

- remove `--reject eslint`,
replace chained minor and major update commands in [update-rush-lint-staged](./common/config/rush/command-line.json),
and rerun `rush update-autoinstaller --name rush-lint-staged`,
committing any changes
- remove this doc and references in [CONTRIBUTING](./CONTRIBUTING.md)

## full pnpm peer dependency complaint

```text
[ERR_PNPM_PEER_DEP_ISSUES] Unmet peer dependencies

✕ unmet peer eslint
  Installed: 10.8.0
  Wanted:
    "^2 || ^3 || ^4 || ^5 || ^6 || ^7.2.0 || ^8 || ^9":
      eslint-plugin-import@2.32.0

✕ unmet peer eslint
  Installed: 10.8.0
  Wanted:
    "^6.8.0 || ^7.0.0 || ^8.0.0 || ^9.0.0":
      eslint-plugin-jest-dom@5.5.0

✕ unmet peer eslint
  Installed: 10.8.0
  Wanted:
    "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9":
      eslint-plugin-jsx-a11y@6.10.2
    "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7":
      eslint-plugin-react@7.37.5
```
