///////////////////
// INLINE USAGE: //
///////////////////
console.log((function(text) {
  const formatFile = file => JSON.stringify("./" + file.replace(/^(\.|\/)+/g, ""));
  const filePayloadEJS = JSON.stringify(`
<%
// EJS Template:
%>
`);
  const filePayloadSQL = JSON.stringify("# SQL Script:");
  const filePayloadJS = JSON.stringify(`
module.exports = {
  recursiveapi: true,
  build: async function() {
    return undefined;
  }
};`);
  const getFilePayload = (file) => 
    file.endsWith(".ejs") ? filePayloadEJS :
    file.endsWith(".sql") ? filePayloadSQL :
    file.endsWith(".js") ? filePayloadJS : JSON.stringify("");
  return text
    .split(/\n([\t\r\n ]*)/gi)
    .map(s => s.trim())
    .filter(s => s !== "")
    .map(f => {
      const isFile = f.endsWith("#");
      const fileTmp = isFile ? f.substr(0, f.length-1) : f;
      const file = formatFile(fileTmp);
      return isFile 
       ? `echo -e ${getFilePayload(fileTmp)} > ${file}`
       : `mkdir ${file}`;
    })
    .join("\n");
})(`
/db
/db/helper
/db/action
/db/action/getConnection.js#
/db/action/query.js#
/db/middleware
/db/controller

/auth
/auth/helper
/auth/query
/auth/query/select-session-with-same-token.sql.ejs#
/auth/query/select-user-with-same-name.sql.ejs#
/auth/query/select-authentication-data.sql.ejs#
/auth/query/select-user-by-email-token.sql.ejs#
/auth/query/insert-session.sql.ejs#
/auth/query/insert-unconfirmed-user.sql.ejs#
/auth/query/insert-user.sql.ejs#
/auth/query/update-user-password.sql.ejs#
/auth/query/update-user-email-token.sql.ejs#
/auth/query/update-session-token.sql.ejs#
/auth/query/delete-session.sql.ejs#
/auth/query/delete-unconfirmed-user.sql.ejs#
/auth/query/delete-user.sql.ejs#
/auth/action
/auth/action/register.js#
/auth/action/unregister.js#
/auth/action/login.js#
/auth/action/logout.js#
/auth/action/confirm.js#
/auth/action/forgot.js#
/auth/action/change.js#
/auth/action/refresh.js#
/auth/middleware
/auth/middleware/authenticated.js#
/auth/middleware/authenticatedOrNot.js#
/auth/middleware/unauthenticated.js#
/auth/middleware/onlyUser.js#
/auth/middleware/onlyGroup.js#
/auth/middleware/onlyPrivilege.js#
/auth/controller
/auth/controller/register.js#
/auth/controller/unregister.js#
/auth/controller/login.js#
/auth/controller/logout.js#
/auth/controller/confirm.js#
/auth/controller/forgot.js#
/auth/controller/change.js#
/auth/controller/refresh.js#

/rest
/rest/helper
/rest/query
/rest/action
/rest/middleware
/rest/controller

/query
/query/helper
/query/query
/query/action
/query/middleware
/query/controller

/template
/template/helper
/template/query
/template/action
/template/middleware
/template/controller

/page
/page/helper
/page/query
/page/action
/page/middleware
/page/controller



/auth
/auth/helper
/auth/query
/auth/action
/auth/middleware
/auth/controller
`))
