#!/usr/bin/env bash

# This script prepares a new worktree created in a bare repository.
# Run it before any other git commands in the new worktree.

# Doesn't apply if the repo itself isn't bare
# or if the repo is and the worktree already isn't.
repoCoreBare=$(git config get core.bare)
[[ -z $repoCoreBare || $repoCoreBare == false ]] && exit 0

# Doesn't apply if the worktree config extension isn't enabled.
worktreeConfig=$(git config get extensions.worktreeConfig)
[[ -z $worktreeConfig || $worktreeConfig == false ]] && exit 0

git config set --worktree core.bare false
