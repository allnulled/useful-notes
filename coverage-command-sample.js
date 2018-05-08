// [FILE] - /test/MY_LIBRAY_FILE.spec.js

// 0.0. REQUIREMENTS:
// npm install --save rimraf nyc execute-command-sync

// 0. Variabilize the name of your library file (or files)
const MY_LIBRARY_FILE = "whatever.js";
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// 1. Change the path of your library main file (or files) to other that will have the same code, but INSTRUMENTED:
var srcMainOriginal = require("path").resolve(__dirname + "/../src/" + MY_LIBRARY_FILE);
var srcMainCoverage = require("path").resolve(__dirname + "/../src-cov/" + MY_LIBRARY_FILE);
// 2. Clean previous coverage results:
var exec = require("execute-command-sync");
exec("node_modules/.bin/rimraf coverage .nyc_output");
// 3. Generate the instrumented code:
exec("node_modules/.bin/nyc instrument src src-cov");
// 4. Require your library, but INSTRUMENTED:
var MY_LIBRARY_VARIABLE = require(srcMainCoverage);
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// 5. Do your tests:                            //
// test test test test test test test test test //
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// 6. Create the folder that (by default) has the coverage data:
require("fs").mkdirSync(".nyc_output");
// 7. Change the routes of the files instrumented to the original sources:
global.__coverage__[MY_LIBRARY_FILE].path = srcMainOriginal;
// 8. Write the results:
require("fs").writeFileSync(".nyc_output/out.json", JSON.stringify(global.__coverage__), "utf8");
// 9. Generate the reports:
exec("nyc report --reporter=html");
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////