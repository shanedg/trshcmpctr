# rush pnpm config field warnings

Likely duplicate rushstack issues:

- <https://github.com/microsoft/rushstack/issues/5752>
- <https://github.com/microsoft/rushstack/issues/5803>

## warning

Upgrading pnpm to v11 produces this warning during install:

```text
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.overrides", "pnpm.packageExtensions", "pnpm.peerDependencyRules", "pnpm.ignoredOptionalDependencies", "pnpm.allowedDeprecatedVersions", "pnpm.patchedDependencies". See https://pnpm.io/settings for the new home of each setting.
```

@microsoft/rush issue:
<https://github.com/microsoft/rushstack/issues/5837>

## full command output

```text
rush update --full --recheck
Found configuration in /Users/shanegarrity/dev/trsh-1/rush.json


Rush Multi-Project Build Tool 5.176.0 - https://rushjs.io
Node.js version is 24.16.0 (LTS)


Starting "rush update"

Found files in the "common/git-hooks" folder.
Successfully installed these Git hook scripts: commit-msg, pre-commit

Trying to acquire lock for pnpm-11.8.0
Acquired lock for pnpm-11.8.0
Found pnpm version 11.8.0 in /Users/shanegarrity/.rush/node-v24.16.0/pnpm-11.8.0

Symlinking "/Users/shanegarrity/dev/trsh-1/common/temp/pnpm-local"
  --> "/Users/shanegarrity/.rush/node-v24.16.0/pnpm-11.8.0"
Transforming /Users/shanegarrity/dev/trsh-1/common/config/rush/.npmrc
  --> "/Users/shanegarrity/dev/trsh-1/common/temp/.npmrc"

Updating workspace files in /Users/shanegarrity/dev/trsh-1/common/temp
Your version of PNPM (11.8.0) no longer supports the "globalNeverBuiltDependencies" field in /Users/shanegarrity/dev/trsh-1/common/config/rush/pnpm-config.json. Use "globalAllowBuilds" instead (with a value of false to deny build scripts).

Checking installation in "/Users/shanegarrity/dev/trsh-1/common/temp"


Running "pnpm install" in /Users/shanegarrity/dev/trsh-1/common/temp

[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.overrides", "pnpm.packageExtensions", "pnpm.peerDependencyRules", "pnpm.ignoredOptionalDependencies", "pnpm.allowedDeprecatedVersions", "pnpm.patchedDependencies". See https://pnpm.io/settings for the new home of each setting.
Scope: all 14 workspace projects
[WARN] 5 deprecated subdependencies found: glob@10.5.0, glob@7.2.3, inflight@1.0.6, uuid@8.3.2, whatwg-encoding@3.1.1
.                                        |    +1449 ++++++++++++++++++++++++++++
Progress: resolved 1474, reused 1440, downloaded 13, added 144, done
node_modules/.pnpm/core-js@3.49.0/node_modules/core-js: Running postinstall script, done in 315ms
node_modules/.pnpm/unrs-resolver@1.12.2/node_modules/unrs-resolver: Running postinstall script, done in 299ms
node_modules/.pnpm/cypress@15.16.0/node_modules/cypress: Running postinstall script, done in 1.2s
Done in 20s using pnpm v11.8.0

Copying "/Users/shanegarrity/dev/trsh-1/common/temp/pnpm-lock.yaml"
  --> "/Users/shanegarrity/dev/trsh-1/common/config/rush/pnpm-lock.yaml"
repo-state.json has been modified and must be committed to source control.


Rush update finished successfully. (20.77 seconds)
```
