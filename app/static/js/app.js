var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
var path = require("path");

var config = require("../../db/config/config");

var db = new sqlite3.Database(config.dbPath);
 
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
db.close();

// console.log(process.cwd());

// fs.readFile(path.join('LICENSE.md'), 'utf8', function (err, data) {
// 	if (err) throw err;

// 	console.log(data);
// });