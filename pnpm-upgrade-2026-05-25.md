# pnpm upgrade

Example ci install failure: <https://github.com/shanedg/trshcmpctr/actions/runs/26420609857/job/77774414385>

```text
// pnpm@10.26.1 -> 11.3.0
rush update --recheck
// cut
Running "pnpm install" in /Users/shanegarrity/dev/trsh-1/common/temp

Scope: all 14 workspace projects
✓ Lockfile passes supply-chain policies (1481 entries in 7.9s)
../../deploy                             | [WARN] deprecated @aws-sdk/client-ec2@3.957.0
[WARN] 7 deprecated subdependencies found: @ungap/structured-clone@1.3.0, glob@10.5.0, glob@7.2.3, inflight@1.0.6, tar@7.5.2, uuid@8.3.2, whatwg-encoding@3.1.1
.                                        |    +1459 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1481, reused 0, downloaded 1463, added 1459, done
[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: core-js@3.47.0, cypress@13.17.0, unrs-resolver@1.11.1

Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.

The command failed:
 /Users/shanegarrity/dev/trsh-1/common/temp/pnpm-local/node_modules/.bin/pnpm install --store /Users/shanegarrity/dev/trsh-1/common/temp/pnpm-store --config.cacheDir=/Users/shanegarrity/dev/trsh-1/common/temp/pnpm-store --config.stateDir=/Users/shanegarrity/dev/trsh-1/common/temp/pnpm-store --no-prefer-frozen-lockfile --strict-peer-dependencies --config.auto-install-peers=false --config.resolutionMode=highest --config.ignoreCompatibilityDb --recursive --link-workspace-packages false --reporter default
ERROR: Error: Process exited with code 1
Giving up after 1 attempts


ERROR: Process exited with code 1
```

Need some way to do `--allow-build=core-js@3.47.0 cypress@13.17.0 unrs-resolver@1.11.1`.

Related rushstack issue: <https://github.com/microsoft/rushstack/issues/5803>

package.json#pnpm not allowed anymore, should be read from pnpm-workspace.yaml:

```json
"pnpm": {
  "allowBuilds": {
    "core-js@3.47.0": true,
    "cypress@13.17.0": true,
    "unrs-resolver@1.11.1": true
  }
}
```

rush doesn't expose directly (common/temp/pnpm-workspace.yaml).

Probably need to stay at pnpm@10 until [microsoft/rushstack#5803](https://github.com/microsoft/rushstack/issues/5803) is addressed.
