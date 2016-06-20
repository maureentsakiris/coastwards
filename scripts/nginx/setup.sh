#!/usr/bin/env bash

__argv=${@}
__opts=()

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "${__dir}/../.."; pwd)" 

__nginx_config="${__root}/nginx"
__nginx_root="$/etc/nginx"


function copy_conf () {

	cd "${__nginx_config}"
	for conf in `ls *.conf`; do
		scp "${__nginx_config}/${conf}" "${__nginx_root}/sites-available/${conf}"
		cd "${__nginx_root}/sites-enabled"
		ln -s "../sites-available/${conf}"
	 done 

}

copy_conf

sudo nginx -s reload