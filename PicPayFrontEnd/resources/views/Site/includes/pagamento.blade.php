<div class="page-box col-md-12" ng-if="(modal == 3 || modal == 1) && innerWidth < 768">
	@include('site.includes.header')
	<div class="content-box">
		<div class="tost" ng-if="toastMessage" style="background:<% toastColor %>">
			<p> <% toastMessage %></p>
		</div>
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
        <div class="form-box">
			<div class="input-box">
				<input class="input-val" type="text" placeholder="R$ 0,00" ng-model="form.value" mask="R$ 9?9?9?9?9?9?9?9?9,99"/>
			</div>
		</div>
		<div class="f-line"></div>
        <div class="message-box" ng-if="modal == 1">
			<img src="{{ URL::asset('public/assets/alert.svg') }}" class="ic-alert">
			<p class="text">Nenhum cartão de crédito cadastrado. <a href="#" ng-click="registerCard()">Cadastrar agora.</a></p>
		</div>
        <div class="message-box cursor-nav" ng-if="modal == 3" ng-click="selectCard()">
			<img src="{{ URL::asset('public/assets/green.svg') }}" class="ic-green">
			<p class="text-b">Forma de pagamento:</br><span>Cartão de Crédito com final <% cardSelected.number | limitTo: 4:15  %></span></p>
		</div>
        <div class="buttons-box">
			<button type="button" class="btn-modal" ng-disabled="!form.value" ng-click="payment()">PAGAR</button>
		</div>
	</div>
</div>