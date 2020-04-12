//////////////////////////////////////////////
//////////////// package.json ////////////////
//////////////////////////////////////////////

// {
//   "scripts": {
    "docs": "npm run docs:diagrams && npm run docs:code",
    "docs:diagrams": "node dev/build.docs.diagrams.js",
    "docs:code": "javadoc -i ./src/**/*/.js ./src/**/*/.vue ./src/**/*/.scss ./src/**/*/.css -o docs/README.api.md -f markdown && concat docs/README.ini.md docs/README.api.md docs/README.end.md",
    "dev:diagrams": "chokidar ./docs/**/*.skm -c 'npm run docs'"
//   },
//   "devDependencies": {
    "concat": "^1.0.3",
    "execute-command-sync": "^1.0.2",
    "javadoc": "^2.0.0",
    "mermaid.cli": "^0.5.1",
    "node-plantuml": "^0.9.0",
    "skemator": "^1.0.3"
//   }
// }

////////////////////////////////////////////////////////////
//////////////// dev/build.docs.diagrams.js ////////////////
////////////////////////////////////////////////////////////
// Configurations:
const skematorFiles = [];
const mermaidBackgroundColor = "#000000";
//
////////////////////////////////////////////////////////////
// Script:
const exec = require("execute-command-sync");
const path = require("path");

if (!Array.isArray(skematorFiles)) {
	throw new Error(`Required <.meva.config.js#docs.skemator.files> to be an array`)
}

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
