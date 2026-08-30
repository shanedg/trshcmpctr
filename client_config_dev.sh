#!/usr/bin/env bash

set -eou pipefail

export AWS_ACCESS_KEY_ID=dev_awsaccesskey
export AWS_SECRET_ACCESS_KEY=dev_awssecretaccesskey
export DISCORD_CLIENT_ID=dev_discordclientid
export DISCORD_CLIENT_SECRET=dev_discordclientsecret
export DISCORD_GUILD_ID=dev_discordguildid
export DISCORD_REDIRECT_URI=dev_discordredirecturi
export DISCORD_SESSION_SECRET=dev_discordsessionsecret
export ENVIRONMENT=dev_environment

(cd projects/discord && ./client_config_ci.sh)
(cd projects/deploy && ./client_config_ci.sh)
