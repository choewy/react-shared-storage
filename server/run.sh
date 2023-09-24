#!/bin/bash

DIR=`pwd`/server

if [ ! -d "$DIR/node_modules" ]; then
  cd "$DIR" && npm ci
fi

cd "$DIR" && npm run start

exit 0