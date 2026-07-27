#!/usr/bin/env bash
set -euo pipefail

git config --global url."https://x-access-token:${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
npm install
