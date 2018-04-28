/* Instanciando o módulo do app */
var app = angular.module('testeFrontApp', ['ngRoute', 'ngAnimate', 'LocalStorageModule', 'ngMask']);

/* Rotas e seus respectivos templates */
app.config(function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'views/main.html',
		controller: 'mainCtrl'
	})
	.when('/main', {
		templateUrl: 'views/main.html'
	})
	.when('/payment', {
		templateUrl: 'views/payment.html'
	})
	.when('/creditcard', {
		templateUrl: 'views/creditcard.html'
	})
	.when('/mycards', {
		templateUrl: 'views/mycards.html'
	})
	.when('/receipt', {
		templateUrl: 'views/receipt.html'
	})
});