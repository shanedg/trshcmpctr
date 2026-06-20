# `rush-lint-staged`

This [autoinstaller] supports linting staged changes with [lint-staged]
in the pre-commit Git hook.

## Keeping Autoinstaller Dependencies Up to Date

From anywhere in the repository, run the following to upgrade all dependencies to the latest version:

```sh
rush update-rush-lint-staged
```

Then reinstall autoinstaller dependencies:

```sh
rush update-autoinstaller --name rush-lint-staged
```

Commit the changes:

```sh
git add package.json pnpm-lock.yaml
git commit -m 'build(rush-lint-staged): update autoinstaller'
```

[autoinstaller]: https://rushjs.io/pages/maintainer/autoinstallers/
[lint-staged]: https://www.npmjs.com/package/lint-staged
