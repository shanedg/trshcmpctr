#!/usr/bin/env bash

# This script sets the git hooks path for worktrees
# where the worktree config extension is enabled.

# Rush doesn't directly control where git looks for hooks to run.
# By design, if the default git hook location is overridden via `core.hooksPath`,
# Rush errors on install to skip copying hooks
# rather than copying them somewhere that git may quietly ignore them:
# https://github.com/microsoft/rushstack/pull/3013
# https://github.com/microsoft/rushstack/issues/3275

# Run this script after rush install
# so that git will run the worktree's git hooks.

# Doesn't apply if worktree config is not enabled.
worktreeConfig=$(git config get extensions.worktreeConfig)
[[ -z $worktreeConfig || $worktreeConfig == false ]] && exit 0

# If the worktree hooks path is ALREADY set, there's no work to do so bail out.
# Only validates the path is not empty.
# Worktrees will run hooks installed per-worktree.
hooksPath=$(git config get --worktree core.hooksPath)
[[ -n $hooksPath ]] && exit 0

git config --worktree core.hooksPath "$(git rev-parse --git-dir)/hooks"
