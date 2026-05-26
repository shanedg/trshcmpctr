# `rush-commitlint`

This [autoinstaller] supports linting commit messages in this repo with
[@commitlint/cli] extending the rules from
[@commitlint/config-conventional].
Using an autoinstaller ensures that commit messages can always be
linted, even if repo dependencies are not installed.

See the `@commitlintconfig-conventional` [readme#rules] for a list of
enforced rules.

## Keeping Autoinstaller Dependencies Up to Date

From this directory, run the following:

```sh
npx npm-check-updates@22.2.1 --upgrade --target latest
```

> Keep the version of [npm-check-updates] used here in sync with
commands in [common/config/rush/command-line.json]

This command upgrades all dependencies to the latest version.

Then, from anywhere in the repository, run:

```sh
rush update-autoinstaller --name rush-commitlint
```

Commit the changes:

```sh
git add package.json pnpm-lock.yaml
git commit -m 'build(rush-commitlint): update autoinstaller'
```

[@commitlint/cli]: https://www.npmjs.com/package/@commitlint/cli
[@commitlint/config-conventional]: https://www.npmjs.com/package/@commitlint/config-conventional
[autoinstaller]: https://rushjs.io/pages/maintainer/autoinstallers/
[common/config/rush/command-line.json]: ../../config/rush/command-line.json
[npm-check-updates]: https://www.npmjs.com/package/npm-check-updates
[readme#rules]: https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md#rules
