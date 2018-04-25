var app = angular.module('testeFrontApp', ['ngRoute', 'ngAnimate', 'LocalStorageModule', 'ngMask']);

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
	.when('/mycards', {
		templateUrl: 'views/mycards.html',
		controller: 'myCardsCtrl'
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

app.factory('creditCardsFactory', function(localStorageService) {
	var creditCards = JSON.parse(localStorage.getItem("creditCards") || "[]");

	function set(data) {
		creditCards.push(data);
		localStorage.setItem("creditCards", JSON.stringify(creditCards));
	}

	function get() {
		return JSON.parse(localStorage.getItem("creditCards") || "[]");
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

app.controller('paymentCtrl', function($scope, personToPayFactory, $http, creditCardsFactory){
	$scope.personToPay = personToPayFactory.get();
	$scope.creditCards = creditCardsFactory.get();
	$scope.selectedCard = null;
	$scope.lastDigits = 0;
	$scope.value = "";
	$scope.mountedObjectToPay = {};

	angular.forEach($scope.creditCards, function(value, key) {
		if (value.is_selected) {
			$scope.selectedCard = value;
			$scope.lastDigits = $scope.selectedCard.card_number.substr($scope.selectedCard.card_number.length - 4);
		}
	});

	$scope.pay = function() {
		$scope.mountedObjectToPay = {
			card_number: $scope.selectedCard.card_number.replace(/\s+/g,''),
			cvv: $scope.selectedCard.ccv,
			value: $scope.value,
			expiry_date: $scope.selectedCard.expiry_date,
			destination_user_id: $scope.personToPay.id
		}

		$http({
			method: 'POST',
			url: 'http://careers.picpay.com/tests/mobdev/transaction',
			data: $scope.mountedObjectToPay
		}).then(function successCallback(response) {
			console.log(response);
		}, function errorCallback(response) {
			$scope.people = response.statusText;
		});
	}
});

app.controller('creditCardCtrl', function($scope, creditCardsFactory, $route){
	$scope.creditCard = {
		card_name: "",
		card_number:"",
		cvv: null,
		expiry_date:"",
		zip:"",
		is_selected: false
	};

	$scope.saveCard = function() {
		creditCardsFactory.set($scope.creditCard);
		$route.reload();
	}

	$scope.getCard = function() {
		let card = creditCardsFactory.get();
		console.log(card);
	}
});

app.controller('myCardsCtrl', function($scope, creditCardsFactory, localStorageService, $route){

	$scope.creditCards = creditCardsFactory.get();
	console.log($scope.creditCards);

	$scope.targetThisCard = function(card, index) {
		card.is_selected = true;
		console.log(card);

		angular.forEach($scope.creditCards, function(value, key) {
			if (key != index) {
				value.is_selected = false;
			}
		});
	}

	$scope.deleteThisCard = function(index) {
		$scope.creditCards.splice(index, 1);
		localStorage.setItem("creditCards", JSON.stringify($scope.creditCards));
	}

	$scope.chooseCard = function() {
		localStorage.setItem("creditCards", JSON.stringify($scope.creditCards));
		$route.reload();
	}
});

app.directive('testHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/test-header.html'
	}
});