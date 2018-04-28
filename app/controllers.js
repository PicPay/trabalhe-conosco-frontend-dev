/* Controllers que manipulam o model de cada view */

/* Controller da main view */
app.controller('mainCtrl', function($scope, $location, $http, personToPayFactory){
	$scope.people = [];
	$scope.modalView = {
		path: ''
	};

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
		$scope.modalView.path = "payment";
	}

	$scope.setModalView = function(newView){
		$scope.modalView.path = newView;
	}
});

/* Controller da view de pagamento */
app.controller('paymentCtrl', function($scope, $location,  personToPayFactory, $http, creditCardsFactory, receiptFactory){
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
			receiptFactory.set(response);
			
			$scope.modalView.path = "receipt";
		}, function errorCallback(response) {
			$scope.people = response.statusText;
		});
	}
});

/* Controller do cadastro de cartão de crédito */
app.controller('creditCardCtrl', function($scope, creditCardsFactory, $route, $location){
	angular.element(document).ready(function () {
		var elem = document.querySelector('select');
		var instance = M.FormSelect.init(elem);
	});

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
		$scope.modalView.path = "mycards";
	}

	$scope.getCard = function() {
		let card = creditCardsFactory.get();
	}
});

/* Controller da view que mostram os cartões cadastrados deste usuário */
app.controller('myCardsCtrl', function($scope, creditCardsFactory, localStorageService, $route, $location){

	$scope.creditCards = creditCardsFactory.get();

	$scope.targetThisCard = function(card, index) {
		card.is_selected = true;


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
		$scope.modalView.path = "payment";
	}
});

/* Controller do recibo */
app.controller('receiptCtrl', function($scope, receiptFactory, $route){
	$scope.receipt = receiptFactory.get();
	$scope.dateAndTime = new Date();
});