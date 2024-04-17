#!/bin/bash

echo "Build script"

# add the commands here
cd client
npm install
npm run build
cd ../server
npm install