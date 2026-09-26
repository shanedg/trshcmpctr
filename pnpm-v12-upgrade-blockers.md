# pnpm v12 upgrade blockers

pnpm upgrade:

```diff
diff --git a/rush.json b/rush.json
index 82dfc34..0a74b31 100644
--- a/rush.json
+++ b/rush.json
@@ -28,7 +28,7 @@
    *
    * Set options in common/config/rush/pnpm-config.json.
    */
-  "pnpmVersion": "11.28.0",
+  "pnpmVersion": "12.6.0",
 
   /**
    * Older releases of the Node.js engine may be missing features required by your system.
```

Unmet typescript peer dependency

```text
[ERR_PNPM_PEER_DEP_ISSUES] Unmet peer dependencies

✕ unmet peer typescript
  Installed: 7.0.2
  Wanted:
    ">=4.8.4 <6.1.0":
      @typescript-eslint/parser@8.70.1
      @typescript-eslint/typescript-estree@8.70.1
      @typescript-eslint/tsconfig-utils@8.70.1
      @typescript-eslint/project-service@8.70.1
hint: To disable failing on peer dependency issues, add the following to pnpm-workspace.yaml in your project root:

  strictPeerDependencies: false
```

Full command output:

```text
❯ rush update      
Found configuration in /home/shane/dev/trshcmpctr/dev-updates-2026-09-26/rush.json


Rush Multi-Project Build Tool 5.179.0 - https://rushjs.io
Node.js version is 24.19.0 (LTS)


Starting "rush update"

Executing event hooks for preRushInstall

Event hooks finished. (0.02 seconds)

Found files in the "common/git-hooks" folder.
Successfully installed these Git hook scripts: commit-msg, pre-commit

Trying to acquire lock for pnpm-12.6.0
Acquired lock for pnpm-12.6.0
Found pnpm version 12.6.0 in /home/shane/.rush/node-v24.19.0/pnpm-12.6.0

Symlinking "/home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp/pnpm-local"
  --> "/home/shane/.rush/node-v24.19.0/pnpm-12.6.0"
Transforming /home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/config/rush/.npmrc
  --> "/home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp/.npmrc"

Updating workspace files in /home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp
Copying "/home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/config/rush/pnpm-lock.yaml"
  --> "/home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp/pnpm-lock.yaml"
Copying "/home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/config/rush/pnpm-lock.yaml"
  --> "/home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp/pnpm-lock-preinstall.yaml"

Checking installation in "/home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp"

Deleting files from /home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp/node_modules

Running "pnpm install" in /home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp

Scope: all 14 workspace projects
? Verifying lockfile against supply-chain policies (1457 entries)...
../../projects/client                    | [WARN] deprecated eslint@9.39.5. 10.11.0 is not deprecated, outside the range you declared.
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /home/shane/.rush-pnpm-store/v11
  Virtual store is at:             node_modules/.pnpm
[WARN] 4 deprecated subdependencies found: glob@10.5.0, glob@7.2.3, inflight@1.0.6, whatwg-encoding@3.1.1
Progress: resolved 1270, reused 1187, downloaded 0, added 1227
✓ Lockfile passes supply-chain policies (1457 entries in 2.4s)
Packages: +1568
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1568, reused 1433, downloaded 0, added 1568, done
.../node_modules/@parcel/watcher install$ node scripts/build-from-source.js
.../core-js@3.50.0/node_modules/core-js postinstall$ node -e "try{require('./postinstall')}catch(e){}"
.../cypress@16.1.0/node_modules/cypress postinstall$ node dist/index.js --exec install
.../node_modules/unrs-resolver postinstall$ node postinstall.js
.../node_modules/@parcel/watcher install: Done
.../core-js@3.50.0/node_modules/core-js postinstall: Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!
.../core-js@3.50.0/node_modules/core-js postinstall: 
.../core-js@3.50.0/node_modules/core-js postinstall: The project needs your help! Please consider supporting core-js:
.../core-js@3.50.0/node_modules/core-js postinstall: > https://opencollective.com/core-js 
.../core-js@3.50.0/node_modules/core-js postinstall: > https://patreon.com/zloirock 
.../core-js@3.50.0/node_modules/core-js postinstall: > https://boosty.to/zloirock 
.../core-js@3.50.0/node_modules/core-js postinstall: > bitcoin: bc1qlea7544qtsmj2rayg0lthvza9fau63ux0fstcz 
.../core-js@3.50.0/node_modules/core-js postinstall: 
.../core-js@3.50.0/node_modules/core-js postinstall: I highly recommend reading this: https://github.com/zloirock/core-js/blob/master/docs/2023-02-14-so-whats-next.md 
.../core-js@3.50.0/node_modules/core-js postinstall: 
.../core-js@3.50.0/node_modules/core-js postinstall: Done
.../node_modules/unrs-resolver postinstall: Done
.../cypress@16.1.0/node_modules/cypress postinstall: 
.../cypress@16.1.0/node_modules/cypress postinstall: Cypress 16.1.0 is installed in /home/shane/.cache/Cypress/16.1.0
.../cypress@16.1.0/node_modules/cypress postinstall: 
.../cypress@16.1.0/node_modules/cypress postinstall: Done
[ERR_PNPM_PEER_DEP_ISSUES] Unmet peer dependencies

✕ unmet peer typescript
  Installed: 7.0.2
  Wanted:
    ">=4.8.4 <6.1.0":
      @typescript-eslint/parser@8.70.1
      @typescript-eslint/typescript-estree@8.70.1
      @typescript-eslint/tsconfig-utils@8.70.1
      @typescript-eslint/project-service@8.70.1
hint: To disable failing on peer dependency issues, add the following to pnpm-workspace.yaml in your project root:

  strictPeerDependencies: false


The command failed:
 /home/shane/dev/trshcmpctr/dev-updates-2026-09-26/common/temp/pnpm-local/node_modules/.bin/pnpm install --store /home/shane/.rush-pnpm-store --config.cacheDir=/home/shane/.rush-pnpm-store --config.stateDir=/home/shane/.rush-pnpm-store --no-prefer-frozen-lockfile --strict-peer-dependencies --config.auto-install-peers=false --config.resolutionMode=highest --config.ignoreCompatibilityDb --recursive --link-workspace-packages false --reporter default
ERROR: Error: Process exited with code 1
Giving up after 1 attempts


Executing event hooks for postRushInstall

Event hooks finished. (0.01 seconds)

ERROR: Process exited with code 1
```
