# `rush-lint-staged`

This [autoinstaller] supports linting staged changes with [lint-staged]
in the pre-commit Git hook.

## Keeping Autoinstaller Dependencies Up to Date

From this directory, run the following:

```sh
npx npm-check-updates@19.2.0 --upgrade --target latest
```

> Keep the version of [npm-check-updates] used here in sync with
commands in [common/config/rush/command-line.json]

This command upgrades all dependencies to the latest version.

Then, from anywhere in the repository, run:

```sh
rush update-autoinstaller --name rush-lint-staged
```

Commit the changes:

```sh
git add package.json pnpm-lock.yaml
git commit -m 'build(rush-lint-staged): update autoinstaller'
```

[autoinstaller]: https://rushjs.io/pages/maintainer/autoinstallers/
[common/config/rush/command-line.json]: ../../config/rush/command-line.json
[lint-staged]: https://www.npmjs.com/package/lint-staged
[npm-check-updates]: https://www.npmjs.com/package/npm-check-updates
