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

				db.all("SELECT id, description, amount, state FROM scale", function(err, rows) {
					if (err) {
						console.log(err);
					}
					deferred.resolve(rows);
				});

				return deferred.promise;
			};

			function getActives () {
				var deferred = $q.defer();
				db.all("SELECT id, description, amount FROM scale WHERE state = 1", function (err, rows) {
					if (err) {
						console.log(err);
					}
					deferred.resolve(rows);
				})

				return deferred.promise;
			}

			function save(scale) {
				var deferred = $q.defer();
				var stmt = "INSERT INTO scale (description, amount) VALUES ($desc, $amount)";

				if (scale.id) {
					stmt = "UPDATE scale SET description = $desc, amount = $amount WHERE id = $id"
				}

				db.run(stmt, {
						$desc: scale.description,
						$amount: scale.amount,
						$id: scale.id
					}, function (err) {
						deferred.resolve(this.lastID);
						console.log(this.lastID);
					}
				);

				return deferred.promise;
			};

			function inactive(scale) {
				var deferred = $q.defer();
				db.run("UPDATE scale SET state = 0 WHERE id = $id", {$id: scale.id}, function (err) {
						deferred.resolve(this.lastID);
						console.log(this.lastID);
				});

				return deferred.promise;
			};

			function get(scaleId) {
				var deferred = $q.defer();

				db.get("SELECT id, description, amount FROM scale WHERE id = $id",
					{
						$id: scaleId
					},
					function(err, row) {
						if (err) {
							console.log(err);
						}
						deferred.resolve(row);
				});

				return deferred.promise;
			};

			return {
				all: all,
				getActives: getActives,
				save: save,
				destroy: inactive,
				get: get
			};

		}])

	// db.close();
})();