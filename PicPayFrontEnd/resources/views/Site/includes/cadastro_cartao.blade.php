<div class="page-box col-md-12" ng-if="modal == 2 && innerWidth < 768">
	@include('site.includes.header')
	<div class="content-box">
		<div class="back">
			<img src="{{ URL::asset('public/assets/back.svg') }}" class="ic-back">
			<p class="text" ng-click="backHome()">Voltar</p>
		</div>
		<form class="form-cad" name="frm">
			<div class="input-box">
				<label class="float-label" ng-if="flagSelected.id > 0">Selecione a bandeira</label>
				<div class="dropdown">
				  <button class="select dropdown-toggle" type="button" data-toggle="dropdown" style="color: <% (flagSelected.id > 0) ? '#fff' : '#acb1bd' %>"><span><% flagSelected.name %></span>
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
</div>