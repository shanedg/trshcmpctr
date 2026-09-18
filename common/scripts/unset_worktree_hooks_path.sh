#!/usr/bin/env bash

# This script removes the git hooks path for worktrees
# where the worktree config extension is enabled.

# Rush doesn't directly control where git looks for hooks to run.
# By design, if the default git hook location is overridden via `core.hooksPath`,
# Rush errors on install to skip copying hooks
# rather than copying them somewhere that git may quietly ignore them:
# https://github.com/microsoft/rushstack/pull/3013
# https://github.com/microsoft/rushstack/issues/3275

# Run this script before rush install
# so that Rush will copy the worktree's git hooks.

# Doesn't apply if worktree config is not enabled.
worktreeConfig=$(git config get extensions.worktreeConfig)
[[ -z "$worktreeConfig" ]] && exit 0

# If the git hooks path is already unset,
# e.g. if the post-install script fails to restore it after a prior install
# or if it was never set in a new worktree,
# there's no work to do so bail out.
hooksPath=$(git config get --worktree core.hooksPath)
[[ -z "$hooksPath" ]] && exit 0

git config --worktree --unset core.hooksPath
