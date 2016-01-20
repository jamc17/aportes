(function () {
	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('test.sqlite');

	//Creamos la tabla scale si no existe
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS contributor ("
			+ "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
			+ "name TEXT NOT NULL,"
			+ "appaterno TEXT,"
			+ "apmaterno TEXT,"
			+ "dni TEXT,"
			+ "address TEXT,"
			+ "phone TEXT,"
			+ "dateup NUMERIC,"
			+ "scaleid INTEGER NOT NULL,"
			+ "FOREIGN KEY (scaleid) REFERENCES scale(id)"
			+ ")");
	});

	angular.module('mas.contributorServices', [])
		.factory('contributorService', ['$q', function($q){

			function all() {
				var deferred = $q.defer();

				db.all("SELECT c.id, c.name, c.appaterno, c.apmaterno, c.dni, c.address, c.phone, c.dateup, c.scaleid, s.amount  FROM contributor as c INNER JOIN scale as s ON c.scaleid = s.id", function(err, rows) {
					if (err) {
						console.log(err);
					}
					deferred.resolve(rows);
				});

				return deferred.promise;
			};

			function get(id) {
				var deferred = $q.defer();

				db.get("SELECT * FROM contributor WHERE id = $id",
					{
						$id: id
					},
					function (err, row) {
						if (err) {
							console.log(err);
						}
						deferred.resolve(row);
					}
				)
				return deferred.promise;
			};

			function save(contributor) {
				var deferred = $q.defer();
				var stmt = "INSERT INTO contributor (name, appaterno, apmaterno, dni, address, phone, dateup, scaleid) VALUES ($name, $appaterno, $apmaterno, $dni, $address, $phone, $dateup, $scaleid)";

				if (contributor.id) {
					stmt = "UPDATE contributor SET name = $name, appaterno = $appaterno, apmaterno = $apmaterno, dni = $dni, address = $address, phone = $phone, dateup = $dateup, scaleid = $scaleid WHERE id = $id"
				}

				db.run(stmt, {
						$name: contributor.name,
						$appaterno: contributor.appaterno,
						$apmaterno: contributor.apmaterno,
						$dni: contributor.dni,
						$address: contributor.address,
						$phone: contributor.phone,
						$dateup: contributor.dateup,
						$scaleid: contributor.scaleid,
						$id: contributor.id
					}, function (err) {
						if (err) {
							console.log(err);
						}
						deferred.resolve(this.lastID);
						// console.log(this.lastID);
					}
				);

				return deferred.promise;
			}

			return {
				all: all,
				save: save,
				get: get
			};
		}])



})();