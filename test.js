var config = require('./config'),
    marklogic = require('marklogic');

var db = marklogic.createDatabaseClient({
  host: config.host,
  port: config.database.port,
  user: config.auth.user,
  password: config.auth.pass,
  authType: 'digest'
});

var q = marklogic.queryBuilder;

var whereClause = [
    q.value(
      'foo',
      'bar',
      q.termOptions('exact')
    )
];

console.dir(whereClause[0]);

db.documents.query(
    q.where(whereClause)
    .slice(1, 10)
  )
  .result(function(documents) {
      var results = [];
      documents.forEach(function(document) {
        console.dir(document.content);
      });
      }, function(error) {
        console.dir(error);
    });
