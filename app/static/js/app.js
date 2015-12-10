(function() {
	var fs = require("fs");
	var sqlite3 = require('sqlite3').verbose();
	var path = require("path");
	var angular = require("angular");

	var app = angular.module('mas', []);

	app.controller('menuController', function () {
		this.item = 1;

		this.selectItem = function(item) {
			this.item = item;
		};
	});

	app.controller('aportanteController', function () {
		this.nuevo = false;

		this.showFormToogle = function () {
			this.nuevo = !this.nuevo;
		}

		this.aportante = {
			id: "001",
			nombres: "José Mariñas",
			appaterno: "Mariñas",
			apmaterno: "Collantes",
			dni: "43267055",
			telefono: "99999999",
			direccion: "Pje. Chota 123",
			escala : {
				id: '001',
				descripcion: 'funcionarios'
			},
			estado: 1
		}


		this.aportantes = [{
			id: "001", nombres: "José Anderson", appaterno: "Mariñas",
			apmaterno: "Collantes", dni: "43267055", direccion: "Pje. Chota 123", telefono: "976123456"
		}, {
			id: "001", nombres: "Ronald Heenry", appaterno: "Velásquez",
			apmaterno: "Díaz", dni: "41267035", direccion: "Pje. Cantuta 123", telefono: "976123456"
		}, {
			id: "001", nombres: "Neyer Gonzalo", appaterno: "Lavado",
			apmaterno: "Abanto", dni: "40267022", direccion: "Pje. Inca 122", telefono: "976123456"
		}, {
			id: "001", nombres: "José Anderson", appaterno: "Mariñas",
			apmaterno: "Collantes", dni: "43267055", direccion: "Pje. Chota 123", telefono: "976123456"
		}, {
			id: "001", nombres: "Ronald Heenry", appaterno: "Velásquez",
			apmaterno: "Díaz", dni: "41267035", direccion: "Pje. Cantuta 123", telefono: "976123456"
		}, {
			id: "001", nombres: "Neyer Gonzalo", appaterno: "Lavado",
			apmaterno: "Abanto", dni: "40267022", direccion: "Pje. Inca 122", telefono: "976123456"
		}, {
			id: "001", nombres: "José Anderson", appaterno: "Mariñas",
			apmaterno: "Collantes", dni: "43267055", direccion: "Pje. Chota 123", telefono: "976123456"
		}, {
			id: "001", nombres: "Ronald Heenry", appaterno: "Velásquez",
			apmaterno: "Díaz", dni: "41267035", direccion: "Pje. Cantuta 123", telefono: "976123456"
		}, {
			id: "001", nombres: "Neyer Gonzalo", appaterno: "Lavado",
			apmaterno: "Abanto", dni: "40267022", direccion: "Pje. Inca 122", telefono: "976123456"
		}];

	});

})();