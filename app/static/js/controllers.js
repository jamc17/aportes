(function () {


	angular.module('mas.controllers', ['mas.scaleServices'])

		.controller('menuController', function () {
			this.item = 1;

			this.selectItem = function(item) {
				this.item = item;
			};
		})

		.controller('aportanteController', function ($scope, $uibModal) {
			this.nuevo = false;

			$scope.newForm = function (size) {
		    	var modalInstance = $uibModal.open({
					animation: false,
					templateUrl: '../html/partials/aportante-form.html',
					controller: 'ModalInstanceCtrl',
					backdrop: 'static',
					size: size,
					resolve: {
						aportantes: function () {
							return $scope.aportantes;
						}
					}
				});
			};

			// $scope.selectedClass = "no-selected"
			$scope.selectedContributor = null;
			$scope.selectContributor = function (id) {
				$scope.selectedContributor = id;
				// console.log("Aportante seleccionado " + $scope.selectedContributor);
			}


			$scope.aportantes = [{
				id: "001", nombres: "José Anderson", appaterno: "Mariñas",
				apmaterno: "Collantes", dni: "43267055", direccion: "Pje. Chota 123", telefono: "976123456", fechaRegistro: Date.now()
			}, {
				id: "002", nombres: "Ronald Heenry", appaterno: "Velásquez",
				apmaterno: "Díaz", dni: "41267035", direccion: "Pje. Cantuta 123", telefono: "976123456", fechaRegistro: Date.now()
			}, {
				id: "003", nombres: "Neyer Gonzalo", appaterno: "Lavado",
				apmaterno: "Abanto", dni: "40267022", direccion: "Pje. Inca 122", telefono: "976123456", fechaRegistro: Date.now()
			}, {
				id: "004", nombres: "José Anderson", appaterno: "Mariñas",
				apmaterno: "Collantes", dni: "43267055", direccion: "Pje. Chota 123", telefono: "976123456", fechaRegistro: Date.now()
			}];
		})

		.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, aportantes) {
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
		})

		.controller('escalaController', ['$scope','$uibModal', 'scaleService' , function ($scope, $uibModal, scaleService) {

			$scope.newForm = function (size) {
		    	var modalInstance = $uibModal.open({
					animation: false,
					templateUrl: '../html/partials/escala-form.html',
					controller: 'EscalaModalInstanceCtrl',
					backdrop: 'static',
					size: size,
					resolve: {
						escalas: function () {
							return $scope.escalas;
						}
					}
				});
			};

			scaleService.all().then(function (data) {
				$scope.escalas = data;
			});

			$scope.selectedScale = null;
			$scope.selectScale = function (id) {
				$scope.selectedScale = id;
			}

		}])

		.controller('EscalaModalInstanceCtrl', ['$scope','$uibModalInstance', 'scaleService','escalas', function ($scope, $uibModalInstance, scaleService , escalas) {
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
				// $scope.saveState.msg = "Data saved ok!!"

				scaleService.save($scope.escala).then(function (lastId) {
					$scope.escala.id = lastId;
					escalas.push($scope.escala);
					$scope.escala = {};
				});
				
				$scope.close();
			};
		}])


		.controller('escalaDbCtrl', ['$scope','scaleService', function ($scope, scaleService) {
			
		}])
})();