#!/usr/bin/env bash

__argv=${@}
__opts=()

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "${__dir}/../.."; pwd)" 

FOREVER_CLI=$(which forever) 2>/dev/null
if [[ -z "${FOREVER_CLI}" ]]; then
	printf '\n\x1b[2mSyncing to \x1b[0m\x1b[1m%s\x1b[0m - %s' "${SSH_HOST}" "${sync_line}"	

	npm i forever -g
	npm i forever-service -g
fi

FOREVER_BIN=$(which forever) 2>/dev/null
FOREVER_SERVICE_BIN=$(which forever) 2>/dev/null

source "env.inc"

sudo scp -r "${APP_SRC}/" "${WWW_ROOT}"
sudo chown "${WWW_USER}:${WWW_USER}" "${WWW_ROOT}"