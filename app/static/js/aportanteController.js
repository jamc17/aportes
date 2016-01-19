(function () {
	angular.module('mas.aportanteController', ['mas.scaleServices', 'mas.contributorServices'])

		.controller('aportanteController', ['$scope','$uibModal','scaleService', 'contributorService', function ($scope, $uibModal, scaleService, contributorService) {
			this.nuevo = false;

			$scope.newForm = function (size) {
		    	var modalInstance = $uibModal.open({
					animation: false,
					templateUrl: '../html/partials/aportante-form.html',
					controller: 'ModalInstanceCtrl',
					backdrop: 'static',
					size: size,
					resolve: {
						aportante: function () {
							return $scope.aportante;
						},
						escalas: function () {
							return $scope.escalas
						}
					}
				});

				modalInstance.result.then(function () {
					$scope.all();
				});
			};

			$scope.add = function () {
				$scope.aportante = {};
				$scope.newForm();
			};

			$scope.edit = function () {
				if ($scope.selectedContributor) {

					contributorService.get($scope.selectedContributor).then(function (data) {
						$scope.aportante = data;
						$scope.newForm();
					})
				}
			};

			// $scope.selectedClass = "no-selected"
			$scope.selectedContributor = null;
			$scope.selectContributor = function (id) {
				$scope.selectedContributor = id;
				// console.log("Aportante seleccionado " + $scope.selectedContributor);
			}

			$scope.escalas = scaleService.getActives().then(function (data){
				$scope.escalas = data;
			});

			$scope.all = function () {
				contributorService.all().then(function (data) {
					$scope.aportantes = data;
				});
			}

			$scope.all();
			
		}])

		.controller('ModalInstanceCtrl', ["$scope", "$uibModalInstance", "contributorService", "aportante", "escalas", function ($scope, $uibModalInstance, contributorService, aportante, escalas) {
				$scope.close = function () {
				    $uibModalInstance.close('close');
				};

				$scope.aportante = aportante;

				$scope.escalas = escalas;

				$scope.save = function () {
					$scope.aportante.dateup = Date.now();
					contributorService.save($scope.aportante);
					
					$scope.close();
				};
			}])
})();