(function () {
	angular.module('mas.controllers', ['mas.scaleServices'])

		.controller('menuController', function () {
			this.item = 1;

			this.selectItem = function(item) {
				this.item = item;
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
						escala: function () {
							return $scope.escala;
						}
					}
				});

				modalInstance.result.then(function () {
					scaleService.all().then(function (data) {
						$scope.escalas = data;
						$scope.escala = {};
					})
				});

			};

			$scope.deleteForm = function (size) {
				var modalInstance = $uibModal.open({
					animation: false,
					templateUrl: '../html/partials/delete-scale.html',
					controller: 'DeleteEscalaModalCtrl',
					backdrop: 'static',
					size: size,
					resolve: {
						escala: function () {
							return $scope.escala;
						}
					}
				});

				modalInstance.result.then(function () {
					$scope.all();
				});
			}

			$scope.add = function () {
				$scope.escala = {};
				$scope.newForm();
			};

			$scope.edit = function () {
				if (!$scope.selectedScale) {
					return;
				}
				else {
					scaleService.get($scope.selectedScale).then(function (data) {
						$scope.escala = data;
						$scope.newForm();
					});
				}
			};

			$scope.delete = function () {
				if (!$scope.selectedScale) {
					return;
				}
				else {
					scaleService.get($scope.selectedScale).then(function (data) {
						$scope.escala = data;
						$scope.deleteForm('sm');
					});
				}
			};

			$scope.all = function () {
				scaleService.all().then(function (data) {
					$scope.escalas = data;
				});	
			}

			$scope.all();

			$scope.selectedScale = null;
			$scope.selectScale = function (id) {
				$scope.selectedScale = id;
			}

		}])

		.controller('EscalaModalInstanceCtrl', ['$scope','$uibModalInstance', 'scaleService', 'escala', function ($scope, $uibModalInstance, scaleService, escala) {
			
			$scope.cancel= function () {
			    $uibModalInstance.dismiss('close');
			};

			$scope.escala = escala;

			$scope.save = function () {
				scaleService.save($scope.escala).then(function (lastId) {
					$scope.$close();
				});
			};
		}])

		.controller('DeleteEscalaModalCtrl', ['$scope','$uibModalInstance', 'scaleService', 'escala', function ($scope, $uibModalInstance, scaleService, escala) {
			
			$scope.cancel= function () {
			    $uibModalInstance.dismiss('close');
			};

			$scope.escala = escala;

			$scope.delete = function () {
				scaleService.destroy($scope.escala).then(function (lastId) {
					$scope.$close();
				});
			};
		}])

		
})();