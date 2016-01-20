(function () {
	angular.module('mas.periodoController', ['mas.periodoServices', 'mas.aporteMensualServices'])

		.controller('periodoController', ['$scope','$uibModal', 'periodoService', 'aporteMensualService' , function ($scope, $uibModal, periodoService, aporteMensualService) {

			$scope.add = function () {
				
			};

			$scope.edit = function () {
				
			};

			$scope.delete = function () {
				
			};

			$scope.all = function () {
				periodoService.all().then(function (data) {
					$scope.periodos = data;
				});	
			};

			$scope.cerrarPeriodo = function (periodo) {
				
				periodoService.closePeriod(periodo).then(function (modId) {
					periodoService.newPeriod(periodo).then(function (retorno) {
						$scope.all();

						if (retorno.accion == "insertar") {
							// Copiamos los aportantes al nuevo periodo
							var nuevoPeriodo = retorno.lastid;
							aporteMensualService.copiarAportantes(nuevoPeriodo);
						}
					});
				});
			};

			$scope.all();

			$scope.selectedPeriodo = null;
			$scope.selectPeriodo = function (id) {
				$scope.selectedPeriodo = id;
			}

		}])
		
})();