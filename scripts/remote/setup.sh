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

source "${__dir}/env.inc"

# $HOME/coastwards.org/ /var/www/coastwards.org
sudo cp -r "${APP_SRC}/" "${WWW_ROOT}"

# www-data:www-data /var/www/coastwards.org
sudo chown "${WWW_USER}:${WWW_USER}" "${WWW_ROOT}"

forever-service install coastwards --script "${__root}/server/index.js"

sudo forever list


# n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local