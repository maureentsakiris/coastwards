#!/usr/bin/env bash
set -e

main() {

  if [[ ! -f ".env" ]]; then
    echo -e "Env file is missing!"
    exit 1
  fi

  # read environment variables for mysql configuration
  source ".env"

  docker run --name coastwards-mysql \
    -e MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD}" \
    -e MYSQL_USER="${MYSQL_USER}" \
    -e MYSQL_PASSWORD="${MYSQL_PASSWORD}" \
    -e MYSQL_DATABASE="${MYSQL_DATABASE}" \
    -p 3306:3306 \
    -d mysql:5.7
}

main "${@}"
