#!/usr/bin/bash

npm install --save rimraf nyc
rimraf coverage .nyc_output && node_modules/.bin/nyc --reporter=html node ${YourUnitTestFile}