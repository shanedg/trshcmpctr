const child_process = require('child_process');

const { handleChildExit } = require('./helpers');

// Always send child's output to parent.
// i.e. make sure that we see lint-staged and jest in the terminal.
const execSyncOptions = {
  stdio: 'inherit',
};

/**
 * Run on pre-commit, optionally linting staged files first.
 */
function onPreCommit() {
  if (process.env.NO_PRECOMMIT) {
    process.exit(0);
  } else {
    child_process.execSync(
      'npm run lint-staged',
      execSyncOptions,
      handleChildExit
    );
  }
}

/**
 * Run on pre-push, testing and optionally linting all files first.
 */
function onPrePush() {
  if (process.env.NO_PRECOMMIT) {
    child_process.execSync(
      // lint-staged doesn't make sense in the pre-push context: changes
      // have already been committed
      // TODO: ensure that this lint command leverages eslint cache!
      'npm run lint:js && npm run test',
      execSyncOptions,
      handleChildExit
    );
  } else {
    child_process.execSync(
      'npm run test',
      execSyncOptions,
      handleChildExit
    );
  }
}

module.exports = {
  onPreCommit,
  onPrePush,
};
