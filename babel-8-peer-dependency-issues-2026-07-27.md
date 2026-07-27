# babel 8 peer dependency issues

problem: <https://github.com/jestjs/jest/issues/15152>

## after resolution

follow Babel 8 [migration guide](https://babeljs.io/docs/v8-migration)

## full pnpm peer dependency complaint

```text
[ERR_PNPM_PEER_DEP_ISSUES] Unmet peer dependencies

✕ unmet peer @babel/core
  Installed: 8.0.1
  Wanted:
    ^7.0.0-0:
      @babel/plugin-syntax-async-generators@7.8.4
      @babel/plugin-syntax-bigint@7.8.3
      @babel/plugin-syntax-class-properties@7.12.13
      @babel/plugin-syntax-class-static-block@7.14.5
      @babel/plugin-syntax-import-attributes@7.29.7
      @babel/plugin-syntax-import-meta@7.10.4
      @babel/plugin-syntax-json-strings@7.8.3
      @babel/plugin-syntax-logical-assignment-operators@7.10.4
      @babel/plugin-syntax-nullish-coalescing-operator@7.8.3
      @babel/plugin-syntax-numeric-separator@7.10.4
      @babel/plugin-syntax-object-rest-spread@7.8.3
      @babel/plugin-syntax-optional-catch-binding@7.8.3
      @babel/plugin-syntax-optional-chaining@7.8.3
      @babel/plugin-syntax-private-property-in-object@7.14.5
      @babel/plugin-syntax-top-level-await@7.14.5
```
