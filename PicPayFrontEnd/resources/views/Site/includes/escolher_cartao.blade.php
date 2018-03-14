<div class="page-box col-md-12" ng-if="modal == 4 && innerWidth < 768">
	@include('site.includes.header')
	<div class="content-box">
		<div class="back">
			<img src="{{ URL::asset('public/assets/back.svg') }}" class="ic-back">
			<p class="text" ng-click="closeModal()">Voltar</p>
		</div>
		<div class="header">
			<h2 class="title">Cartões Cadastrados</h2>
		</div>
		<div class="list-box">
			<div class="lb-item <% card.checked ? 'active' : '' %>" ng-repeat="card in listCards track by $index" ng-click="setCardDefault($index)" ng-disabled="card.checked">
				<div class="text-block">
					<img src="{{ URL::asset('public/assets/green.svg') }}" class="ic-green"> 
					<h3><% card.number %></h3>
					<img src="{{ URL::asset('public/assets/check-mark.svg') }}" class="ic-check" ng-if="card.checked"> 
				</div>
			</div>
			<div class="h-line"></div>
			<div class="lb-item" ng-click="registerCard()">
				<div class="text-block">
					<img src="{{ URL::asset('public/assets/plus_green.svg') }}" class="ic-plus"> 
					<h3>Cadastrar novo cartão</h3>
				</div>
			</div>
		</div>
        <div class="buttons-box">
			<button type="button" class="btn-modal" ng-disabled="!cardsUpdate" ng-click="saveCardDefault()">SELECIONAR CARTÃO</button>
		</div>
	</div>
</div>