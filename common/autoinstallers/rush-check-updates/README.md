# `rush-check-updates`

This [autoinstaller] supports custom `update-*` commands that depend on [npm-check-updates] (and manages the version of the library installed).

## Keeping Autoinstaller Dependencies Up to Date

From anywhere in the repository, run the following to upgrade all dependencies to the latest version:

```sh
rush update-rush-check-updates
```

Then reinstall autoinstaller dependencies:

```sh
rush update-autoinstaller --name rush-check-updates
```

Commit the changes:

```sh
git add package.json pnpm-lock.yaml
git commit -m 'build(rush-check-updates): update autoinstaller'
```

[autoinstaller]: https://rushjs.io/pages/maintainer/autoinstallers/
[npm-check-updates]: https://www.npmjs.com/package/npm-check-updates
