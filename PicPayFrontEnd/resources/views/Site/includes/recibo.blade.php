<div class="page-box col-md-12" ng-if="modal == 5 && innerWidth < 768">
	@include('site.includes.header')
	<div class="content-box">
		<div class="back">
			<img src="{{ URL::asset('public/assets/back.svg') }}" class="ic-back">
			<p class="text" ng-click="backHome()">Voltar</p>
		</div>
		<div class="info-block">
			<div class="info">
				<div class="avatar" style="background-image:url(<% users[index]['img'] %>)"></div>
				<div class="text-group">
					<h1 class="name"><% users[index]['name'] %></h1>
					<span class="username">id: <% users[index]['id']%></span>
					<span class="username ml-10"><% users[index]['username']%></span>
				</div>
			</div>
		</div>
		<div class="header">
			<h2 class="title">Pagamento confirmado!</h2>
		</div>
		<ul class="ul-box">
			<li class="ul-item"><h3>Transação</h3><h4><% transaction.id %></h4></li>
			<li class="ul-item"><h3>Data</h3><h4><% transaction.timestamp * 1000 | date:'dd/MM/yy - HH:mm' %></h4></li>
			<li class="ul-item"><h3>Cartão</h3><h4>**** **** **** <% cardSelected.number | limitTo: 4:15 %></h4></li>
			<li class="ul-item"><h3>Valor</h3><h4><% transaction.value %></h4></li>
		</ul>
        <div class="buttons-box mt-90">
			<button type="button" class="btn-modal-2" ng-click="closeModal()">VOLTAR</button>
			<button type="button" class="btn-modal-3" ng-click="openModal(index)">PAGAR NOVAMENTE</button>
		</div>
	</div>
</div>