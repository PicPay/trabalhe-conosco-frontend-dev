<div class="modal" tabindex="-1" role="dialog" ng-if="modal > 0 && innerWidth > 768">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" ng-if="modal == 1 || modal == 3">Pagamento para <span class="name"> <% users[index]['name'] %></span></h5>
        <h5 class="modal-title" ng-if="modal != 1 && modal != 3">Cadastro Cartão de Crédito</h5>
		<img src="{{ URL::asset('public/assets/shape-copy.svg') }}" class="ic-close" ng-click="closeModal()">
      </div>
      <div class="modal-body" ng-if="modal == 1 || modal == 3">
		<div class="tost" ng-if="toastMessage" style="background:<% toastColor %>">
			<p> <% toastMessage %></p>
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
			<img src="{{ URL::asset('public/assets/blue.svg') }}" class="ic-blue">
			<p class="text-b">Forma de pagamento:</br><span>Cartão de Crédito com final <% cardSelected.number | limitTo: 4:15  %></span></p>
		</div>
        <div class="buttons-box">
			<button type="button" class="btn-modal" ng-disabled="!form.value" ng-click="payment()">PAGAR</button>
		</div>
      </div>
      <div class="modal-body" ng-if="modal == 2">
		<form name="frm">
			<div class="input-box">
				<label class="float-label" ng-if="flagSelected.id > 0">Selecione a bandeira</label>
				<div class="dropdown">
				  <button class="select dropdown-toggle" type="button" data-toggle="dropdown" style="color: <% (flagSelected.id > 0) ? '#000' : '#acb1bd' %>"><span><% flagSelected.name %></span>
				  <ul class="dropdown-menu">
					<li ng-repeat="flag in flags track by $index" ng-click="setFlag($index)"><img class="ic-flag" src="<% flag.icon %>"> <span class="text-flag"><%flag.name%></span></li>
				  </ul>
				</div>
				<div class="h-line"></div>
			</div>
			<div class="input-box">
				<label class="float-label" ng-if="form.name.length > 0">Nome escrito no cartão</label>
				<input class="input-f" type="text" placeholder="Nome escrito no cartão" name="name" ng-model="form.name" ng-minlength="5" ng-maxlength="30" required/>
				<span class="error-msg" ng-if="frm.name.$invalid">O nome deve ter mais de 5 caracteres e menos que 30 caracteres.</span>
			</div>
			<div class="input-box">
				<label class="float-label" ng-if="form.number.length > 0">Número do Cartão</label>
				<input class="input-f" type="text" placeholder="Número do Cartão" name="number" ng-model="form.number" mask="9999 9999 9999 9999"  required/>
				<span class="error-msg" ng-if="frm.number.$invalid">O número informado não é válido.</span>
			</div>
			<div class="input-box">
				<label class="float-label" ng-if="form.expiry_date.length > 0">Validade (mm/aaaa)</label>
				<input class="input-f" type="text" placeholder="Validade (mm/aaaa)" name="expiry_date" ng-model="form.expiry_date" mask="99/9999"  required/>
				<span class="error-msg" ng-if="frm.expiry_date.$invalid">A validade informada não é válida.</span>
			</div>
			<div class="input-box">
				<label class="float-label" ng-if="form.cvv.length > 0">Código de segurança</label>
				<input class="input-f" type="text" placeholder="Código de segurança" name="cvv" ng-model="form.cvv" mask="9?999"  required/>
				<span class="error-msg" ng-if="frm.cvv.$invalid">Código de segurança informado não é válido.</span>
			</div>
			<div class="input-box">
				<label class="float-label" ng-if="form.cep.length > 0">CEP do endereço da fatura</label>
				<input class="input-f" type="text" placeholder="CEP do endereço da fatura" name="cep" ng-model="form.cep" mask="99.999-999"  required/>
				<span class="error-msg" ng-if="frm.cep.$invalid">CEP informado não é válido.</span>
			</div>
		</form>
        <div class="buttons-box">
			<button type="button" class="btn-modal" ng-disabled="frm.$invalid || form.flag.id == 0" ng-click="saveCard()">CADASTRAR</button>
		</div>
      </div>
      <div class="modal-body pd-rl-0" ng-if="modal == 4">
		<div class="header">
			<h2 class="title">Cartões Cadastrados</h2>
		</div>
		<div class="list-box">
			<div class="lb-item <% card.checked ? 'active' : '' %>" ng-repeat="card in listCards track by $index" ng-click="setCardDefault($index)" ng-disabled="card.checked">
				<div class="text-block">
					<img src="{{ URL::asset('public/assets/blue.svg') }}" class="ic-blue"> 
					<h3><% card.number %></h3>
					<img src="{{ URL::asset('public/assets/check-mark.svg') }}" class="ic-check" ng-if="card.checked"> 
				</div>
			</div>
			<div class="lb-item" ng-click="registerCard()">
				<div class="text-block">
					<img src="{{ URL::asset('public/assets/plus.svg') }}" class="ic-plus"> 
					<h3>Cadastrar novo cartão</h3>
				</div>
			</div>
		</div>
        <div class="buttons-box">
			<button type="button" class="btn-modal" ng-disabled="!cardsUpdate" ng-click="saveCardDefault()">SELECIONAR</button>
		</div>
      </div>
      <div class="modal-body" ng-if="modal == 5">
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
  </div>
</div>