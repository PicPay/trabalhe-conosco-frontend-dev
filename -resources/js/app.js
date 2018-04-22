var app = angular.module('testeFrontApp', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: '../views/main.html',
		controller: 'listCtrl'
	})
	.when('/list', {
		templateUrl: '../views/main.html',
		controller: 'listCtrl'
	})
	.when('/payment', {
		templateUrl: '../views/payment.html',
		controller: 'paymentCtrl'
	})
});

app.factory('personToPayFactory', function() {
	var person = [];

	function set(data) {
		person = data;
	}

	function get() {
		return person;
	}

	return {
		set: set,
		get: get
	}
});

app.controller('listCtrl', function($scope, $location, $http, personToPayFactory){
	$scope.people = [];

	$http({
		method: 'GET',
		url: 'http://careers.picpay.com/tests/mobdev/users'
	}).then(function successCallback(response) {
		$scope.people = response.data;
	}, function errorCallback(response) {
		$scope.people = response.statusText;
	});

	$scope.payThisPerson = function (person){
		personToPayFactory.set(person);
		$location.path('payment');
	}
});

app.controller('paymentCtrl', function($scope, personToPayFactory){
	$scope.personToPay = personToPayFactory.get();
	console.log($scope.personToPay);
});

app.directive('testHeader', function() {
	return {
		restrict: 'E',
		templateUrl: '../views/test-header.html'
	}
});