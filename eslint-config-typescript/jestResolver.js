/**
 * This custom resolver is a workaround for these related issues:
 * https://github.com/typescript-eslint/typescript-eslint/issues/4210#issuecomment-981203332
 * and
 * https://github.com/facebook/jest/issues/9771#issuecomment-871585234
 * 
 * Lifted from:
 * https://github.com/typescript-eslint/typescript-eslint/blob/eaaa2047ca54f098dcdd32aaf5d8949495c6be26/tests/jest-resolver.js
 */
const resolver = require('enhanced-resolve').create.sync({
  conditionNames: ['require', 'node', 'default'],
  extensions: ['.js', '.json', '.node', '.ts', '.tsx'],
});

/**
 * @param request {unknown}
 * @param options {{ defaultResolver(...args: unknown[]): unknown, basedir: unknown }}
 * @returns {unknown}
 */
module.exports = function (request, options) {
  // global modules must be resolved by defaultResolver
  if (['fs', 'http', 'path'].includes(request)) {
    return options.defaultResolver(request, options);
  }
  return resolver(options.basedir, request);
};
