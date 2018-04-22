function getDataFromJson() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			renderData(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", "http://careers.picpay.com/tests/mobdev/users", true);
	xhttp.send();
};

function renderData(data) {
	
	var fetchedData = data.map((person) => {
		document.getElementById("listOfPeople").innerHTML +=
		`
		<li class="collection-item avatar">
			<img src="${person.img}" alt="" class="circle">
			<span class="title">${person.name}</span>
			<p>id: ${person.id} ${person.username}</p>
			<a href="#!" class="secondary-content">
				<img class="" src="./build/img/pagar.svg" alt="" height="28" /> <span class="hide-on-small-only pay-text">pagar</span>
				<img class="" src="./build/img/down.svg" alt="" height="28" />
			</a>
		</li>
		`;

		return person;
	})
}