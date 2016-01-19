(function() {
	// var fs = require("fs");
	// var sqlite3 = require('sqlite3').verbose();
	// var path = require("path");
	var angular = require("angular");
	require('angular-ui-bootstrap');

	var app = angular.module('mas', [
		'ui.bootstrap',
		'mas.controllers',
		'mas.aportanteController',
		'mas.aporteMensualController',
		'mas.directives']);


})();