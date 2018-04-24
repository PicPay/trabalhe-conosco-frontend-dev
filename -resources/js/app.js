var app = angular.module('testeFrontApp', ['ngRoute', 'ngAnimate', 'LocalStorageModule']);

app.config(function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'views/main.html',
		controller: 'listCtrl'
	})
	.when('/list', {
		templateUrl: 'views/main.html',
		controller: 'listCtrl'
	})
	.when('/payment', {
		templateUrl: 'views/payment.html',
		controller: 'paymentCtrl'
	})
	.when('/card', {
		templateUrl: 'views/card.html',
		controller: 'creditCardCtrl'
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

app.controller('paymentCtrl', function($scope, personToPayFactory, localStorageService){
	$scope.personToPay = personToPayFactory.get();
	$scope.creditCards = [];

	$scope.creditCards = localStorageService.get('creditCards');
	console.log($scope.creditCards);
});

app.controller('creditCardCtrl', function($scope, localStorageService){
	$scope.creditCard = {
		card_name: "",
		card_number:"",
		cvv:0,
		expiry_date:"",
		zip:""
	};

	$scope.saveCard = function() {
		localStorageService.set('creditCards', $scope.creditCard);
	}

	$scope.getCard = function() {
		let card = localStorageService.get('creditCards');
		console.log(card);
	}
});

app.directive('testHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/test-header.html'
	}
});