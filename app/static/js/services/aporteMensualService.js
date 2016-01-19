(function () {

	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('test.sqlite');

	//Creamos la tabla scale si no existe
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS aporte_mensual (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, num_rec INTEGER DEFAULT 0, aportante_id INTEGER NOT NULL, year TEXT NOT NULL, month TEXT NOT NULL, amount DOUBLE, dateContrib DATE NOT NULL, state INTEGER DEFAULT 0, FOREIGN KEY (aportante_id) REFERENCES contributor(id))");
	});


	angular.module('mas.aporteMensualServices', [])

		.factory('aporteMensualService', ['$q', '$timeout', function ($q, $timeout) {

			function all () {
				var deferred = $q.defer();

				var query = "SELECT am.id, am.num_rec, c.name, c.appaterno, c.apmaterno, am.year, am.month, am.amount, am.dateContrib FROM aporte_mensual as am INNER JOIN contributor as c ON am.aportante_id = c.id"

				db.all(query, function(err, rows) {
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
			};

			function getLastNumRec () {
				var deferred = $q.defer();
				// var reg = null;
				db.get("SELECT num_rec FROM aporte_mensual WHERE 1 ORDER BY num_rec DESC LIMIT 1",
					
					function(err, row) {
						if (err) {
							console.log(err);
						}
						// reg = row
						deferred.resolve(row);
				});

				// return reg;
				return deferred.promise;
			};

			function setNumeroRecibo(aportante) {
				// var aportante = aportante;
				getLastNumRec().then(function(data) {
					// console.log(data);
					var deferred = $q.defer();

					var stmt = "UPDATE aporte_mensual SET num_rec = $num_rec WHERE id = $id"
					db.run(stmt, {
							$num_rec: data.num_rec + 1,
							$id: aportante.id
						}, function (err) {
							if (err) {
								console.log(err);
							}
							deferred.resolve(this.lastID);
							// console.log(this.lastID);
						}
					);
					return deferred.promise;
				});
			};

			function saveAll(aportantes) {

				var deferred = $q.defer();
				var numRec = 0;
				var stmt = "";

				for (var i = 0; i< aportantes.length; i++) {
					
					if (aportantes[i].id) {
						stmt = "UPDATE aporte_mensual SET num_rec = $num_rec, amount = $amount, dateContrib = $dateContrib WHERE id = $id"
					}
					
					// Si no existe num de recibo lo generamos
					if (!aportantes[i].num_rec) {
						setNumeroRecibo(aportantes[i]);
						// $timeout(setNumeroRecibo, 500, true, [aportantes[i]]);
					}

					
					db.run(stmt, {
							$num_rec: aportantes[i].num_rec,
							$amount: aportantes[i].amount,
							$dateContrib: aportantes[i].dateContrib,
							$id: aportantes[i].id
						}, function (err) {
							if (err) {
								console.log(err);
							}
							deferred.resolve(this.lastID);
							// console.log(this.lastID);
						}
					);
				}

				return deferred.promise;
			};

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
				saveAll: saveAll,
				destroy: inactive,
				get: get,
				getLastNumRec: getLastNumRec
			};

		}])

	// db.close();
})();