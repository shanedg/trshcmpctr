# Contributing

Notes specifically for repository maintainers

## TODOs

* (client) consider replacing webpack with rspack
* (deploy) new deployment target that's just a local network raspberry pi
* (client, discord) auth fails on first couple renders, refresh resolves

## Scaffolding a New Project

Use a custom rush command (see [command-line.json]) that calls [plop] to
scaffold a new project. Answer the command line prompts to generate a
new project based on templates in [@trshcmpctr/scaffold].

```sh
rush scaffold
```

## Keeping Project Dependencies Up to Date

### Autoinstallers

Autoinstallers are managed separately from repo projects, see:

* [rush-check-updates]: manage the version of [npm-check-updates]
* [rush-commitlint]: lint commit messages before committing
* [rush-lint-staged]: lint staged files before committing

```sh
# rush-check-updates
rush update-rush-check-updates
rush update-autoinstaller --name rush-check-updates
git add common/autoinstallers/rush-check-updates
git commit -m 'build(rush-check-updates): update autoinstaller'
# rush-commitlint
rush update-rush-commitlint
rush update-autoinstaller --name rush-commitlint
git add common/autoinstallers/rush-commitlint
git commit -m 'build(rush-commitlint): update autoinstaller'
# rush-lint-staged
rush update-rush-lint-staged
rush update-autoinstaller --name rush-lint-staged
git add common/autoinstallers/rush-lint-staged
git commit -m 'build(rush-lint-staged): update autoinstaller'
```

### Projects

Periodically bump project dependencies for new features and fixes,
e.g. before starting or after completing new feature development.
Break dependency upgrades into stages to make it easier to identify what
version changes are responsible for any problems.
Lint code, run tests, and validate affected project behavior at each
stage:

#### 1. Patch Updates

Use the out of the box rush update feature to bump all packages to the
latest version available that satisfies current range specifiers.
Since this repo abides by the default rush convention that package
specifiers are prefixed by [tildes], this effectively implies only patch
updates.

```sh
rush update --full
git add common/rush/pnpm-lock.yaml common/rush/repo-state.json
git commit -m 'build: rush update --full'
```

#### 2. Minor Updates

Use a custom rush command[^1] (see [command-line.json]) that calls
[npm-check-updates] to bump all packages to the latest minor version.

```sh
rush update-minor
rush update
git add -A
git commit -m 'build: rush update-minor'
```

#### 3. Major Upgrades

Use a custom rush command[^1] (see [command-line.json]) that calls
[npm-check-updates] to bump all packages to the latest major version.

```sh
rush update-major
rush update
git add -A
git commit -m 'build: rush update-major'
```

Packages excluded via the [--reject] option:

* All known `@babel/*` packages excluded because of missing transitive @babel/core@v7 peer deps when upgrading direct deps to v8.
* `@eslint/js`, `eslint`, and `eslint-plugin-ava` are excluded because not all eslint plugins are ready for v10.
  These packages' peer dependencies block upgrading:
  * [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/issues/3227) - close!
  * [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom/issues/417) - release pipeline broken, maybe abandoned?
  * [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/1075) - recent development, no release yet
  * [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977) - close! same maintainer + blockers as eslint-plugin-import
* `@types/node` is excluded because the major version of this package
corresponds with the expected major version of Node and should only change
when Node is upgraded in this repository

### Updating pnpm

Periodically update the version of [pnpm] used in this repo with the
`pnpmVersion` field in [rush.json].
See the [pnpm releases page] for details on new features and fixes.
Run `rush update` with the `--recheck` flag to pick up any subtle
differences in dependency calculation and commit the changes to
`rush.json` as well as any changes in [pnpm-lock.yaml].

```sh
rush update --recheck
git add rush.json common/config/rush/pnpm-lock.yaml
git commit -m 'build: update pnpm from x to y'
```

### Updating Rush

Periodically update the version of Rush used in this repo with the
`rushVersion` field in [rush.json].
See the [Rush changelog] for details on new features and fixes.
Run `rush update` and commit changes to `rush.json` as well as any
scripts modified in [common/scripts].

```sh
rush update
git add rush.json common/scripts
git commit -m 'build: update rush from x to y'
```

---

[^1]: `update-minor` and `update-major` depend on [jq](https://stedolan.github.io/jq/)
(with Homebrew: `brew install jq`)

[--reject]: https://www.npmjs.com/package/npm-check-updates#reject
[@trshcmpctr/scaffold]: ./scaffold
[command-line.json]: ./common/config/rush/command-line.json
[common/scripts]: ./common/scripts
[npm-check-updates]: https://www.npmjs.com/package/npm-check-updates
[plop]: https://www.npmjs.com/package/plop
[pnpm releases page]: https://github.com/pnpm/pnpm/releases
[pnpm-lock.yaml]: ./common/config/rush/pnpm-lock.yaml
[pnpm]: https://www.npmjs.com/package/pnpm
[Rush changelog]: https://github.com/microsoft/rushstack/blob/main/apps/rush/CHANGELOG.md
[rush-check-updates]: ./common/autoinstallers/rush-check-updates/README.md
[rush-commitlint]: ./common/autoinstallers/rush-commitlint/README.md
[rush-lint-staged]: ./common/autoinstallers/rush-lint-staged/README.md
[rush.json]: ./rush.json
[tildes]: https://github.com/npm/node-semver?tab=readme-ov-file#tilde-ranges-123-12-1
