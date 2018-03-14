<div class="list-users col-md-12"  ng-if="(innerWidth < 768 && modal == 0) || innerWidth > 768">
	@include('site.includes.header')
	<div class="list">
		<div class="container">
			<div class="item-list" ng-repeat="user in users track by $index" ng-click="openModal($index)">
				<div class="info">
					<div class="avatar" style="background-image:url(<% user['img'] %>)"></div>
					<div class="text-group">
						<h1 class="name"><% user['name'] %></h1>
						<span class="username">id: <% user['id']%></span>
						<span class="username ml-10"><% user['username']%></span>
					</div>
				</div>
				<div class="actions">
					<img src="{{ URL::asset('public/assets/pagar.svg') }}" class="ic-pay">
					<span class="pay-text">PAGAR</span>
					<img src="{{ URL::asset('public/assets/down.svg') }}" class="ic-down">
				</div>
			</div>
		</div>
	</div>
</div>