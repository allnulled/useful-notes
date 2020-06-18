/*
(function filesToCommand(text) {
  return text
    .split(/\n[\t\r\n ]*/gi)
    .filter(s => s !== "")
    .map(f => {
      const isFile = f.endsWith("#");
      const command = isFile ? "touch" : "mkdir";
      const file = isFile ? f.substr(0, f.length-2) : f;
      return `${command} ${file}`;
    })
    .join("\n");
})(`
/a
/a/b
/a/b/c
/a/b/c/README.md
`)
//*/
module.exports = function filesToCommand(text) {
  return text
    .split(/\n[\t\r\n ]*/gi)
    .filter(s => s !== "")
    .map(f => {
      const isFile = f.endsWith("#");
      const command = isFile ? "touch" : "mkdir";
      const file = isFile ? f.substr(0, f.length-2) : f;
      return `${command} ${file}`;
    })
    .join("\n");
}
