#!/usr/bin/bash

npm install --save-dev rimraf nyc
node_modules/.bin/rimraf coverage .nyc_output && node_modules/.bin/nyc --reporter=html node ${YourUnitTestFile}