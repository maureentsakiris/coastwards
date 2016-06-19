#!/usr/bin/env bash


__argv=${@}
__opts=()

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "${__dir}/../.."; pwd)" 
__config="${__root}/config"


__env_name="production"

case ${1} in
	development|stage|production )
		__env_name="${1}"
		shift
		;;
esac


function mysql_config () {
	local config_key="${1}"

	node -p "require('${__config}/${__env_name}.json').mysql.${config_key}"
}


mysql_host=`mysql_config host`
mysql_user=`mysql_config user`
mysql_password=`mysql_config password`
mysql_database=`mysql_config database`


printf 'Please provide root password: '
read mysql_root_password

function _mysql () {
	mysql -u "${mysql_user}" -p"${mysql_password}" ${@}
}

function _mysql_root () {
	mysql -u root "-p${mysql_root_password}" ${@}
}

function _mysql_db () {
	_mysql "${mysql_database}" ${@}
}

function sql_create_schema () {
	printf 'CREATE SCHEMA IF NOT EXISTS %s;\n' "${mysql_database}"
}

function sql_user () {
	printf '`%s`@`%s`' "${mysql_user}" "${mysql_host}"
	if [[ -n "${mysql_password}" ]]; then
		printf 'IDENTIFIED BY "%s"' "${mysql_password}"
	fi
}

function sql_create_user () {
	printf ' GRANT ALL ON %s.* TO %s;' "${mysql_database}" "$(sql_user)"
}

function sql_list_users () {
	printf 'SELECT User FROM mysql.user WHERE User = "%s";' "${mysql_user}"
}


#printf '\x1b[1m%s\x1b[0m\n' "Creating database"
#sql_create_schema | mysql -u root -p"${mysql_root_password}" 

case "${mysql_user}" in
	root )
		# skip user creation
		;;

	* )
		printf '\x1b[1m%s\x1b[0m\n' "Creating user"
		_users_=$(sql_list_users | _mysql_root)
		if [[ -z "${_users_}" ]]; then
			sql_create_user | _mysql_root "${mysql_database}"
		fi		
		;;
esac


# import
cat "${__root}/coastwards_contributions.sql" | _mysql_db