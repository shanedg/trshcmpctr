# typescript peer dependency issues

blockers are:

- [@typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940) (and `@typescript-eslint/*`)
- `eslint-plugin-jest`
- `ts-api-utils`

potential workaround: [run v7 side by side with v6](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0)

## full pnpm peer dependency complaint

```text
[ERR_PNPM_PEER_DEP_ISSUES] Unmet peer dependencies

✕ unmet peer typescript
  Installed: 7.0.2
  Wanted:
    ">=4.8.4 <6.1.0":
      @typescript-eslint/tsconfig-utils@8.65.0
      @typescript-eslint/project-service@8.65.0
      @typescript-eslint/typescript-estree@8.65.0
      @typescript-eslint/parser@8.65.0
      @typescript-eslint/utils@8.65.0

✕ unmet peer typescript
  Installed: 7.0.2
  Wanted:
    ">=4.8.4 <6.1.0":
      @typescript-eslint/type-utils@8.65.0
      @typescript-eslint/eslint-plugin@8.65.0

✕ missing peer typescript
  Wanted:
    >=4.8.4:
      ts-api-utils@2.5.0
    ">=4.8.4 <6.1.0":
      @typescript-eslint/tsconfig-utils@8.65.0
      @typescript-eslint/project-service@8.65.0
      @typescript-eslint/typescript-estree@8.65.0
      @typescript-eslint/utils@8.65.0
      @typescript-eslint/type-utils@8.65.0
      @typescript-eslint/eslint-plugin@8.65.0
      @typescript-eslint/parser@8.65.0
    ">=4.8.4 <8.0.0":
      eslint-plugin-jest@29.16.0

✕ unmet peer typescript
  Installed: 7.0.2
  Wanted:
    ">=4.8.4 <6.1.0":
      typescript-eslint@8.65.0
hint: To auto-install peer dependencies, add the following to "pnpm-workspace.yaml" in your project root:

  autoInstallPeers: true
hint: To disable failing on peer dependency issues, add the following to pnpm-workspace.yaml in your project root:

  strictPeerDependencies: false
```
