(function () {

	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('test.sqlite');

	//Creamos la tabla scale si no existe
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS aporte_mensual (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, num_rec INTEGER DEFAULT 0, aportante_id INTEGER NOT NULL, periodo_id INTEGER NOT NULL, amount DOUBLE, dateContrib DATE, state INTEGER DEFAULT 0, FOREIGN KEY (aportante_id) REFERENCES contributor(id), FOREIGN KEY (periodo_id) REFERENCES periodo(id))");
	});


	angular.module('mas.aporteMensualServices', ['mas.contributorServices'])

		.factory('aporteMensualService', ['$q', '$timeout', 'contributorService', function ($q, $timeout, contributorService) {

			function all () {
				var deferred = $q.defer();

				var query = "SELECT am.id, am.num_rec, c.name, c.appaterno, c.apmaterno, c.dni, c.address, p.year, p.month, am.amount, am.dateContrib FROM aporte_mensual as am INNER JOIN contributor as c ON am.aportante_id = c.id INNER JOIN periodo as p ON am.periodo_id = p.id"

				db.all(query, function(err, rows) {
					if (err) {
						console.log(err);
					}
					deferred.resolve(rows);
				});

				return deferred.promise;
			};

			function allByPeriod (period) {
				var deferred = $q.defer();

				var query = "SELECT am.id, am.num_rec, c.name, c.appaterno, c.apmaterno, c.dni, c.address, p.year, p.month, am.amount, am.dateContrib FROM aporte_mensual as am INNER JOIN contributor as c ON am.aportante_id = c.id INNER JOIN periodo as p ON am.periodo_id = p.id WHERE p.year = $year AND p.month = $month";

				db.all(query, {
						$year: period.year,
						$month: period.month
					},
					function(err, rows) {
						if (err) {
							console.log(err);
						}
						deferred.resolve(rows);
					}
				);

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



			function copiarAportantes(periodo) {
				contributorService.all().then(function (contributors) {
					var deferred = $q.defer();

					var stmt = "";
					for (var i = 0; i < contributors.length; i++) {
						stmt = "INSERT INTO aporte_mensual (aportante_id, periodo_id, amount) VALUES ($aportante_id, $periodo_id, $amount)";

						db.run(stmt, {
							$aportante_id: contributors[i].id,
							$periodo_id: periodo,
							$amount: contributors[i].amount
						}, function (err) {
							if (err) {
								console.log(err);
							}
							deferred.resolve(this.lastID);
						});
					}

					return deferred.promise;
				});
			};


			return {
				all: all,
				saveAll: saveAll,
				getLastNumRec: getLastNumRec,
				copiarAportantes: copiarAportantes,
				allByPeriod: allByPeriod
			};

		}])

	// db.close();
})();