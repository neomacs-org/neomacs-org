#!/bin/sh
# NEO Emacs installer entry point — https://neomacs.org/install.sh
#
#   curl -fsSL https://neomacs.org/install.sh | bash
#
# This file is deliberately tiny and stable: it should almost never change.
# ALL install logic is maintained in the neomacs repository and published as
# a release asset, so this entry point always executes the installer that
# matches the release it downloads:
#
#   https://github.com/eval-exec/neomacs          (source)
#   https://github.com/eval-exec/neomacs/blob/main/install.sh
#
# To review the installer before running it:
#   curl -fsSL https://neomacs.org/install.sh -o install-entry.sh   # this file
#   curl -fsSL https://github.com/eval-exec/neomacs/releases/latest/download/install.sh
set -eu

repo=${NEOMACS_GH_REPO:-eval-exec/neomacs}
url="https://github.com/${repo}/releases/latest/download/install.sh"

if command -v curl >/dev/null 2>&1; then
  installer=$(curl -fsSL "$url")
elif command -v wget >/dev/null 2>&1; then
  installer=$(wget -qO- "$url")
else
  echo "install.sh: need curl or wget to fetch the installer from $url" >&2
  exit 1
fi

exec sh -c "$installer" install.sh "$@"
