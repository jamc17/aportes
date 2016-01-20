(function () {

	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('test.sqlite');

	//Creamos la tabla scale si no existe
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS periodo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, year INTEGER NOT NULL, month INTEGER NOT NULL, state INTEGER DEFAULT 0)");
	});


	angular.module('mas.periodoServices', [])

		.factory('periodoService', ['$q', function ($q) {

			function all () {
				var deferred = $q.defer();

				db.all("SELECT id, year, month, state FROM periodo", function(err, rows) {
					if (err) {
						console.log(err);
					}
					deferred.resolve(rows);
				});

				return deferred.promise;
			};

			function save(periodo) {
				var deferred = $q.defer();
				var stmt = "INSERT INTO periodo (year, month) VALUES ($year, $month)";

				if (scale.id) {
					stmt = "UPDATE periodo SET year = $year, month = $month WHERE id = $id"
				}

				db.run(stmt, {
						$year: periodo.year,
						$month: periodo.month,
						$id: periodo.id
					}, function (err) {
						deferred.resolve(this.lastID);
						console.log(this.lastID);
					}
				);

				return deferred.promise;
			};

			function closePeriod(periodo) {
				var deferred = $q.defer();
				var stmt = "UPDATE periodo SET state = 1 WHERE id = $id";

				db.run(stmt, {
						$id: periodo.id
					}, function (err) {
						deferred.resolve(this.lastID);
						// console.log(this.lastID);
					}
				);
				return deferred.promise;
			};

			function newPeriod(periodo) {
				var deferred = $q.defer();

				var date = new Date(periodo.year, periodo.month);
				date.setMonth(date.getMonth() + 1);
				
				getPeriodByDate(date).then(function (period) {
					var stmt = "";
					var params = {};
					var accion = "insertar";
					if (period) {
						stmt = "UPDATE periodo SET state = 0 WHERE id = $id";
						params =  {$id: period.id};
						accion = "actualizar";
					}
					else {
						stmt = "INSERT INTO periodo (year, month) VALUES ($year, $month)";
						params = {$year: date.getFullYear(), $month: date.getMonth()};
						accion = "insertar";
					}
					db.run(stmt, params, function (err) {
							if (err) {
								console.log(err);
							}
							
							var retorno = {accion: accion, lastid: this.lastID}
							deferred.resolve(retorno);
						}
					);
				});
				return deferred.promise;
			};

			function getPeriodByDate (date) {
				var q = "SELECT * FROM periodo WHERE year = $year AND month = $month";

				var def = $q.defer();
				db.get(q, {
						$year: date.getFullYear(),
						$month: date.getMonth()
					},
					function (err, row) {
						if (err) {
							console.log(err);
						}
						def.resolve(row)
					}
				);
				return def.promise;
			}


			function get(scaleId) {
				var deferred = $q.defer();

				db.get("SELECT id, year, month, state FROM periodo WHERE id = $id",
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
				save: save,
				get: get,
				closePeriod: closePeriod,
				newPeriod: newPeriod
			};

		}])

	// db.close();
})();