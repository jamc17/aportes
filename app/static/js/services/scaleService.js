(function () {

	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('test.sqlite');

	//Creamos la tabla scale si no existe
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS scale (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, description TEXT, amount DOUBLE, state INTEGER DEFAULT 1)");
	});


	angular.module('mas.scaleServices', [])

		.factory('scaleService', ['$q', function ($q) {

			function all () {
				var deferred = $q.defer();

				db.all("SELECT id, description, amount FROM scale", function(err, rows) {
					if (err) {
						console.log(err);
					}
					deferred.resolve(rows);
				});

				return deferred.promise;
			};

			function save(scale) {
				var deferred = $q.defer();
				db.run("INSERT INTO scale (description, amount) VALUES ($desc, $amount)", {
						$desc: scale.description,
						$amount: scale.amount
					}, function (err) {
						deferred.resolve(this.lastID);
					}
				);

				return deferred.promise;
			};

			return {
				all: all,
				save: save
			};

		}])

	// db.close();
})();