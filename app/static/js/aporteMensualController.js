(function () {
	angular.module('mas.aporteMensualController', ['mas.scaleServices', 'mas.contributorServices', 'mas.aporteMensualServices'])

		.controller('aporteMensualController', ['$scope','$uibModal','scaleService', 'contributorService', 'aporteMensualService', function ($scope, $uibModal, scaleService, contributorService, aporteMensualService) {

			// $scope.selectedClass = "no-selected"
			$scope.selectedContributor = null;
			$scope.selectContributor = function (id) {
				$scope.selectedContributor = id;
				// console.log("Aportante seleccionado " + $scope.selectedContributor);
			}

			$scope.years = [];
			var date = new Date();
			var year = date.getFullYear();
			for (i = year; i >= year - 5; i--) {
				$scope.years.push(i);
			}

			$scope.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

			$scope.dateContrib = date;


			$scope.setAllDateContrib = function () {
				for (var i = 0; i < $scope.aportantes.length; i++) {
					$scope.aportantes[i].dateContrib = $scope.dateContrib;
				}
			}

			$scope.escalas = scaleService.getActives().then(function (data){
				$scope.escalas = data;
			});

			

			$scope.saveAll = function () {
				aporteMensualService.saveAll($scope.aportantes).then(function () {
					$scope.allAportantes();
				});
			}


			$scope.allAportantes = function () {
				aporteMensualService.all().then(function (data) {
					$scope.aportantes = data;
				});
			}

			$scope.allAportantes();
			
		}])

})();