/* Factories criadas para inserir e buscar dados, para que possamos passar informações de um controller para outro, 
e consequentemente entre uma view e outra */

/* Factory  do recibo */
app.factory('receiptFactory', function() {
	var receipt = [];

	function set(data) {
		receipt = data;
	}

	function get() {
		return receipt;
	}

	return {
		set: set,
		get: get
	}
});

/* Factory referente a pessoa para a qual o pagament será enviado */
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

/* Factory que salva e buscar os cartões cadastrados no local storage do browser */
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
