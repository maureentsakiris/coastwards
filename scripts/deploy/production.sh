#!/usr/bin/env bash


__argv=${@}
__opts=()

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "${__dir}/../.."; pwd)" 
__config="${__root}/config"

source "${__dir}/credentials.inc"

function log_error () {
	printf '\x1b[31m%s\x1b[0m' ${@}
}

function ssh_remote () {
	printf '\x1b[2mExec on remote (%s): \x1b[0m' "${SSH_HOST}"
	printf '%s\n' "${@}"
	ssh -i "${SSH_PUBLIC_KEY}" "${SSH_USER}"@"${SSH_HOST}" "${@}"
}

function install_remote_key() {
	local key_name="$(basename "${SSH_PUBLIC_KEY}")"
	local key_val=`cat "${SSH_PUBLIC_KEY}"`

	local has_key=`ssh_remote "cat ~/.ssh/authorized_keys"`

	# printf ' --- local key --- \n'
	# printf ' %s \n' "${key_val}"
	# printf ' --- remote key --- \n'
	local key_match=`printf ' %s \n' "${has_key}" | grep "${key_val}"`

	if [[ "${#key_match}" -eq 0 ]]; then
		ssh_remote "printf '%s\n' \"${key_val}\" >> ~/.ssh/authorized_keys"
	fi
	#printf 'has key: %s\n' "${has_key}"
}

function fsize () {
	ls -Alh "${1}" | awk '{ print $5 }'
}

function log_sync () {
	while read sync_line; do 
		if [[ -f "${__root}/${sync_line}" ]]; then
			printf '\n\x1b[2mSyncing to \x1b[0m\x1b[1m%s\x1b[0m - (\x1b[1m\x1b[34m%s\x1b[0m) \t%s' "${SSH_HOST}" "$(fsize "${sync_line}")" "${sync_line}"
		else
			printf '\n\x1b[2mSyncing to \x1b[0m\x1b[1m%s\x1b[0m - %s' "${SSH_HOST}" "${sync_line}"	
		fi
		
	done

	printf '\n'
}

function _rsync () {
	local local_item="${1:-}"
	local remote_item="${2:-}"

	local local_path="${__root}/${local_item}"
	local remote_path="${APP_ROOT}"
	if [[ -n "${remote_item}" ]]; then
		remote_path="${remote_path}/${remote_item}"
	fi
	rsync -avzh \
		--exclude '.*' \
		--exclude 'node_modules' \
		--exclude 'config/!production.json' \
		--exclude 'public/uploads' \
		--exclude 'scripts/deploy' \
		"${local_path}" "${SSH_USER}"@"${SSH_HOST}":"${remote_path}" | log_sync
}

install_remote_key

_rsync

