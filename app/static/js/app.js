(function() {
	var fs = require("fs");
	var sqlite3 = require('sqlite3').verbose();
	var path = require("path");
	var angular = require("angular");
	require('angular-ui-bootstrap');

	var app = angular.module('mas', ['ui.bootstrap']);


	app.controller('menuController', function () {
		this.item = 1;

		this.selectItem = function(item) {
			this.item = item;
		};
	});

	app.controller('aportanteController', function ($scope, $uibModal) {
		this.nuevo = false;

		$scope.newForm = function (size) {
	    	var modalInstance = $uibModal.open({
				animation: false,
				templateUrl: '../html/partials/aportante-form.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				resolve: {
					aportantes: function () {
						return $scope.aportantes;
					}
				}
			});
		};


		$scope.aportantes = [{
			id: "001", nombres: "José Anderson", appaterno: "Mariñas",
			apmaterno: "Collantes", dni: "43267055", direccion: "Pje. Chota 123", telefono: "976123456", fechaRegistro: Date.now()
		}, {
			id: "001", nombres: "Ronald Heenry", appaterno: "Velásquez",
			apmaterno: "Díaz", dni: "41267035", direccion: "Pje. Cantuta 123", telefono: "976123456", fechaRegistro: Date.now()
		}, {
			id: "001", nombres: "Neyer Gonzalo", appaterno: "Lavado",
			apmaterno: "Abanto", dni: "40267022", direccion: "Pje. Inca 122", telefono: "976123456", fechaRegistro: Date.now()
		}, {
			id: "001", nombres: "José Anderson", appaterno: "Mariñas",
			apmaterno: "Collantes", dni: "43267055", direccion: "Pje. Chota 123", telefono: "976123456", fechaRegistro: Date.now()
		}, {
			id: "001", nombres: "Ronald Heenry", appaterno: "Velásquez",
			apmaterno: "Díaz", dni: "41267035", direccion: "Pje. Cantuta 123", telefono: "976123456", fechaRegistro: Date.now()
		}];

	});

	app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, aportantes) {
		$scope.close = function () {
		    $uibModalInstance.close('close');
		};

		$scope.aportante = {};

		$scope.saveState = {
			state: false,
			msg: ""
		};

		$scope.save = function () {
			$scope.saveState.state = true;
			$scope.saveState.msg = "Data saved ok!!"

			$scope.aportante.fechaRegistro = Date.now();

			aportantes.push($scope.aportante);
			$scope.aportante = {};
			$scope.close();
		};
	});

	app.controller('escalaController', function ($scope, $uibModal) {

		$scope.newForm = function (size) {
	    	var modalInstance = $uibModal.open({
				animation: false,
				templateUrl: '../html/partials/escala-form.html',
				controller: 'EscalaModalInstanceCtrl',
				size: size,
				resolve: {
					escalas: function () {
						return $scope.escalas;
					}
				}
			});
		};



		$scope.escalas = [{
			descripcion: "Gerentes Sede GRC",
			monto: 550,
		}, {
			descripcion: "Sub Gerentes Sede GRC",
			monto: 350,
		}, {
			descripcion: "CAS Nivel 1 Sede GRC",
			monto: 100
		}, {
			descripcion: "CAS Nivel 2 Sede GRC",
			monto: 50
		}];
	});

	app.controller('EscalaModalInstanceCtrl', function ($scope, $uibModalInstance, escalas) {
		$scope.close = function () {
		    $uibModalInstance.close('close');
		};

		$scope.escala = {};

		$scope.saveState = {
			state: false,
			msg: ""
		};

		$scope.save = function () {
			$scope.saveState.state = true;
			$scope.saveState.msg = "Data saved ok!!"

			// $scope.aportante.fechaRegistro = Date.now();

			escalas.push($scope.escala);
			$scope.escala = {};
			$scope.close();
		};
	});

	app.directive('mainMenu', function () {
		return {
			restrict: 'E',
			templateUrl: '../html/partials/main-menu.html'
		}
	});

	app.directive('aportantePage', function () {
		return {
			restrict: 'E',
			templateUrl: '../html/partials/aportante-listado.html'
		}
	})
	.directive('configurationPage', function () {
		return {
			restrict: 'E',
			templateUrl: '../html/partials/escala-listado.html'
		}
	})

})();