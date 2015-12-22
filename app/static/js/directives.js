(function () {
	angular.module('mas.directives', [])
		.directive('mainMenu', function () {
			return {
				restrict: 'E',
				templateUrl: '../html/partials/main-menu.html'
			}
		})

		.directive('aportantePage', function () {
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

		.directive('listadoActions', function () {
			return {
				restrict: 'E',
				templateUrl: '../html/partials/listado-actions.html'
			}
		})
})();