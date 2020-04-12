//////////////////////////////////////////////
//////////////// package.json ////////////////
//////////////////////////////////////////////

// >>> scripts:
    "docs": "npm run docs:diagrams && npm run docs:code",
    "docs:diagrams": "node dev/docs.diagrams.js",
    "docs:code": "javadoc -i ./src/**/*/.js ./src/**/*/.vue ./src/**/*/.scss ./src/**/*/.css -o docs/README.api.md -f markdown && concat docs/README.ini.md docs/README.api.md docs/README.end.md",
    "dev:diagrams": "chokidar ./docs/**/*.skm -c 'npm run docs'",
    "dev": "nodemon -w ./src -w ./test --ext '.js,.ejs' -x 'npm run test'",
    "build": "npm run docs && npm shrinkwrap",
    "upload": "git add . && git commit && git push",
    "test": "mocha --sort --bail test/*.test.js",
    "cover": "nyc --reporter=html mocha --sort --bail test/*.test.js"
// <<< :scripts

// >>> devDependencies:
    "chai": "^4.2.0",
    "chokidar-cli": "^2.1.0",
    "concat": "^1.0.3",
    "execute-command-sync": "^1.0.2",
    "javadoc": "^2.0.0",
    "mermaid.cli": "^0.5.1",
    "mocha": "^7.1.1",
    "node-plantuml": "^0.9.0",
    "nodemon": "^2.0.3",
    "nyc": "^15.0.1",
    "skemator": "^1.0.3"
// <<< :devDependencies

//////////////////////////////////////////////////////
//////////////// dev/docs.diagrams.js ////////////////
//////////////////////////////////////////////////////
//
// Configurations:
//
const skematorFiles = [];
const mermaidBackgroundColor = "#000000";
//
//////////////////////////////////////////////////////
//
// Script:
//
const exec = require("execute-command-sync");
const path = require("path");
console.log(`generating ${skematorFiles.length} diagrams`);
skematorFiles.forEach(file => {
	const mmdFile = file.replace(/\.skm/g, ".mmd");
	const pngFile = file.replace(/\.skm/g, ".png");
	const generateMermaidCommand = `skemator compile ${JSON.stringify(file)} --mmd`;
	const generatePngCommand = `mmdc -i ${JSON.stringify(mmdFile)} -o ${JSON.stringify(pngFile)} -b ${JSON.stringify(mermaidBackgroundColor)}`;
	console.log(`[exec] ${generateMermaidCommand}`);
	exec(generateMermaidCommand, {
		cwd: __dirname + "/.."
	});
	console.log(`[exec] ${generatePngCommand}`);
	exec(generatePngCommand, {
		cwd: __dirname + "/.."
	});
});
