// Support extending Jest matchers from @testing-library/jest-dom:
// https://github.com/testing-library/jest-dom/blob/4723de3664d129dfa97a877a4e0a9d171bc4c720/README.md#usage
// Note this file needs to be .ts to include the necessary types:
// https://github.com/testing-library/jest-dom/blob/4723de3664d129dfa97a877a4e0a9d171bc4c720/README.md#with-typescript
// Needs to import the jest-globals subpath because Jest globals are not injected:
// https://github.com/testing-library/jest-dom/tree/55c07ce5f1c489b5b9dc31a770a84d83a1178072#with-jestglobals
import '@testing-library/jest-dom/jest-globals';

import { TextEncoder, TextDecoder } from 'node:util';

// TextEncoder is not bundled with jsdom since v16
// https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
// but needed for react-router@7
Object.assign(globalThis, { TextDecoder, TextEncoder });
