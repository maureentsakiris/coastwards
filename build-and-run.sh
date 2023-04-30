#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$(realpath "$0")")"; pwd)"

main() {
  cd $SCRIPT_DIR
  npm run build
  node server.js
}

main "${@}"
