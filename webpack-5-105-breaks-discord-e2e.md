# webpack@^5.105 breaks discord e2e

Changelog entry: <https://github.com/webpack/webpack/blob/main/CHANGELOG.md#51050>

```text
--[ FAILURE: @trshcmpctr/discord ]---------------------------[ 1.72 seconds ]--

<anonymous_script>:8830
    import.meta.hot) // removed by dead control flow
           ^^^^

SyntaxError: Cannot use 'import.meta' outside a module
    at ../common/temp/node_modules/.pnpm/react-router@7.15.1_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/react-router/dist/development/chunk-4N6VE7H7.mjs (file:///Users/shanedg/dev/trshcmpctr/client/lib/paths.js:857:1)
    at __webpack_require__ (file:///Users/shanedg/dev/trshcmpctr/client/lib/paths.js:907:40)
    at eval (webpack://@trshcmpctr/client/./src/App/components/Nav.tsx?:5:70)
    at ./src/App/components/Nav.tsx (file:///Users/shanedg/dev/trshcmpctr/client/lib/paths.js:157:1)
    at __webpack_require__ (file:///Users/shanedg/dev/trshcmpctr/client/lib/paths.js:907:40)
  ...2 lines omitted...
    at __webpack_require__ (file:///Users/shanedg/dev/trshcmpctr/client/lib/paths.js:907:40)
    at eval (webpack://@trshcmpctr/client/./src/App/components/Game/index.ts?:5:63)
    at ./src/App/components/Game/index.ts (file:///Users/shanedg/dev/trshcmpctr/client/lib/paths.js:77:1)

Node.js v24.16.0
Error: server closed unexpectedly
    at ChildProcess.onClose (/Users/shanedg/dev/trshcmpctr/common/temp/node_modules/.pnpm/start-server-and-test@2.1.5/node_modules/start-server-and-test/src/index.js:88:14)
    at ChildProcess.emit (node:events:509:28)
    at maybeClose (node:internal/child_process:1124:16)
    at ChildProcess._handle.onexit (node:internal/child_process:306:5)


Operations failed.

rush test:cypress (1.90 seconds)
```
