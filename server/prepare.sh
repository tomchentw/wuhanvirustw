#!/bin/sh

rm -rf out public/data
if [[ ! -z "${CI}" ]]; then
  git fetch --all
fi
git restore --source=origin/gh-pages data
mv data public/data
