var app = angular.module('picpay', ['ngSanitize', 'ngMask']);

app.config(['$httpProvider', '$interpolateProvider', function ($httpProvider, $interpolateProvider) 
{
	$httpProvider.defaults.timeout = 5000;
	
	/* 
		Como o laravel utiliza os mesmos símbolos que o angularjs, 
		é preciso alterar o símbolo do angularjs para não ter conflito.
	*/
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
}]);

app.controller('UserCtrl', function($scope, $window, $http, $timeout)
{
	$scope.form = {};
	$scope.users = [];
	$scope.flags = [{id: 1, icon: 'public/assets/elo.png', name: 'Elo'}, {id: 2, icon: 'public/assets/visa.png', name: 'Visa'}, {id: 3, icon: 'public/assets/mastercard.png', name: 'MasterCard'}, {id: 4, icon: 'public/assets/americanexpress.png', name: 'American Express'}];
	$scope.modal = 0;
	$scope.index = 0;
	$scope.listCards = JSON.parse(localStorage.getItem("cards")); // [{ number: <int>, checked: <bool>, expiry_date: <mm/yyyy>, code: <int>, cep: <string>, name: <string>, flag: <int> }]
	$scope.listCards = $scope.listCards == null ? [] : $scope.listCards;
	$scope.listCardsBkp = [];
	$scope.cardSelected = { number: null, checked: true, expiry_date: null, code: null, cep: null, name: null, flag: null };
	$scope.flagSelected = {id: 0, icon: '', name: 'Selecione a bandeira'};
	$scope.cardsUpdate = false;
	$scope.lastModal = 0;
	$scope.innerWidth = $window.innerWidth;

	/* Busca os usuários que podem receber pagamentos */
	$scope.getUsers = function()
	{
		var request = 
		{
			method: 'get',
			url: 'http://careers.picpay.com/tests/mobdev/users',
			dataType: 'json',
			contentType: "application/json"
		};
		
		$http(request)
		.then(function (data)
		{
			$scope.users = data.data;
		});
	};
	
	/* Define a bandeira selecionada no dropbox */
	$scope.setFlag = function(index)
	{
		$scope.flagSelected = $scope.flags[index];
		$scope.form.flag = $scope.flags[index];
	};
	
	/* Volta para lista de usuários */
	$scope.backHome = function()
	{
		$scope.modal = 0;
	};
	
	/* Controle de navegação para fechar o modal */
	$scope.closeModal = function()
	{
		/* 
			Se saiu de um modal e foi para outro, salva o modal para poder voltar onde estava. 
			Ex.: Estava na tela de pagamento e foi para tela de escolha de cartão, quando sair da tela
			de escolha de cartão, volta para tela de pagamento.
		*/
		if($scope.lastModal == 3)
		{
			/*
				Controla a lista de cartões, quando o usuário não confirmar com o botão 'selecionar'
				a escolha do cartão, volta para o estado anterior da lista, ou seja, não salva a alteração.
				O IF garante que não apagar os dados da listCards, caso ainda não tenha nenhum backup.
			*/
			if($scope.listCardsBkp.length > 0)
			{
				angular.copy($scope.listCardsBkp, $scope.listCards);
			}
			
			$scope.lastModal = 0;
			$scope.openModal($scope.index);
		}
		else if($scope.lastModal == 4) 
		{
			/*
				Quando o usuário clicar em cadastrar novo cartão, pela tela de escolha de cartão, 
				se ele optar por cancelar o cadastro (fechar), volta para tela de escolha de cartão
			*/
			$scope.lastModal = 0;
			$scope.modal = 4;
		}
		else
		{
			/* Vai para lista de usuários */
			$scope.modal = 0;
		}
		
		/* 
			Evita que o usuário selecione o cartão que já está selecionado, 
			sua função é desabilitar o botão, quando não ocorreu alteração no cartão selecionado 
		*/
		$scope.cardsUpdate = false;
		
		if($scope.listCardsBkp.length > 0)
		{
			angular.copy($scope.listCardsBkp, $scope.listCards);
		}
	};
	
	/* Vai para tela de escolha de cartão */
	$scope.selectCard = function()
	{
		$scope.lastModal = $scope.modal;
		$scope.modal = 4;
	};
	
	/* Define o cartão principal selecionado, mas ainda não salva */
	$scope.setCardDefault = function(index)
	{
		/* Indica alteração no cartão principal, habilita o botão de selecionar */
		$scope.cardsUpdate = true;

		/* Cria um backup da lista, caso o usuário não confirme a alteração */
		angular.copy($scope.listCards, $scope.listCardsBkp);
		
		for(i=0; i < $scope.listCards.length; i++)
		{
			$scope.listCards[i].checked = false;
			if(i == index)
			{
				$scope.listCards[i].checked = true;
			}
		}
	};
	
	/* Salva a alteração no cartão principal */
	$scope.saveCardDefault = function()
	{
		/* Salva no navegador os cartões atualizados */
		localStorage.setItem("cards", JSON.stringify($scope.listCards));
	
		$scope.cardsUpdate = false;
		
		/* Atualiza a variável de backup da lista de cartões */
		angular.copy($scope.listCards, $scope.listCardsBkp);
	};
	
	/* Salva o cartão cadastrado na lista de cartões */
	$scope.saveCard = function()
	{
		/* Registra o último modal aberto */
		$scope.lastModal = $scope.modal;
		/* 
			Se a lista de cartões estiver vazia, então o cartão cadastrado é o principal,
			caso contrário, o cartão não será salvo como principal.
		*/
		var check = true; 
		
		if($scope.listCards.length > 0)
		{
			check = false;
		}
		
		/* Garante que não vai salvar cartão sem número */
		if(!$scope.form.number)
		{
			return;
		}
		
		/* Cria um objeto com os dados do cartão para ser inserido na lista de cartões */
		var obj = { number: $scope.form.number, checked: check, expiry_date: $scope.form.expiry_date, code: $scope.form.cvv, cep: $scope.form.cep, name: $scope.form.name, flag: $scope.form.flag };
		
		/* Adiciona o cartão na lista de cartões */
		$scope.listCards.push(obj);
		
		/* Atualiza a lista no navegador */
		localStorage.setItem("cards", JSON.stringify($scope.listCards));
		
		/* Vai para tela de escolha de cartão */
		$scope.modal = 4;
	};
	
	/* Verifica qual modal será aberto, quando clicar em algum usuário da lista de usuários */
	$scope.openModal = function(index)
	{
		/* A janela padrao é a de sem cartão */
		$scope.modal = 1;
		/* Salva o index do usuário selecionado */
		$scope.index = index;
		/* Cartão selecionado que será exibido na tela de pagamento */
		$scope.cardSelected = {};
		
		/* Contador de cartões */
		var cards = 0;
		cards = $scope.listCards.length;
		
		/*
			Salva o cartão principal
		*/
		for(i=0; i < $scope.listCards.length; i++)
		{
			if($scope.listCards[i].checked)
			{
				$scope.cardSelected = $scope.listCards[i];
				break;
			}
		}
		
		/*
			Se tiver mais de um cartão, então já vai para tela de pagamento,
			caso contrário, vai para tela sem cartão 
		*/
		if(cards > 0)
		{
			$scope.modal = 3; // modal de pagamento
		}
		else
		{
			$scope.modal = 1; // modal sem cartão
		}
		
	};
	
	/*
		Vai para tela de cadastro de cartão
	*/
	$scope.registerCard = function()
	{
		/*	Reseta o formulário */
		$scope.form = {};
		/* Salva o último modal */
		$scope.lastModal = $scope.modal;
		/* Tela de cadastro de cartão */
		$scope.modal = 2;
		$scope.cardsUpdate = false;
		
		if($scope.listCardsBkp.length > 0)
		{
			angular.copy($scope.listCardsBkp, $scope.listCards);
		}
	};
	
	/*
		Realiza o pagamento para o usuário selecionado, informando os ados do cartão, valor. 
	*/
	$scope.payment = function()
	{
		/*
			Parâmetros para a requisição de pagamento.
			card_number => Removendo os espaços da string	
			expiry_date => alterando de mm/yyyy para mm/yy
		*/
		var request = 
		{
			method: 'post',
			url: 'http://careers.picpay.com/tests/mobdev/transaction',
			data: {  
			   "card_number":  $scope.cardSelected.number.replace(new RegExp(' ', 'g'), ''),
			   "cvv": $scope.cardSelected.cvv,
			   "value": $scope.form.value,
			   "expiry_date": $scope.cardSelected.expiry_date.substr(0, 3)+$scope.cardSelected.expiry_date.substr(5, 2),
			   "destination_user_id": $scope.users[$scope.index].id
			}
		};
		
		/*
			Envia a requisição de pagamento
		*/
		$http(request)
		.then(function (data)
		{
			/* Se o pagamento for aprovado, abre a tela de recibo */
			if(data.data.transaction.status == 'Aprovada')
			{
				/* Limpa o valor */
				$scope.form.value = null;
				/* 'Apaga' a navegação entre modais */
				$scope.lastModal = 0;
				/* Tela de recibo */
				$scope.modal = 5;
				/* Salva os dados referente ao pagamento */
				$scope.transaction = data.data.transaction;
			}
			else
			{
				/*
					Pagamento Recusado
					Exibe uma mensagem informando para o usuário que o pagamento não foi aceito.
				*/
				$scope.toastColor = '#ef5778';
				$scope.toastMessage = 'Seu pagamento foi recusado.';
			}
			
			/* Apaga a mensagem depois de 3 segundos */
			$timeout(function()
			{
				$scope.toastMessage = '';
			}, 3000);
		});
	};
	
	/* Chama a função que busca os usuários que podem receber pagamentos */
	$scope.getUsers();

	/* 
		Faz a alteração do layout web => mobile e mobile => web sem carregar a tela, 
		toda vez que ocorrer alteração no innerWidth da página, será atualizado as 
		variáveis, fazendo com que o layout se adapte
	*/
	$(window).resize(function()
	{
		$scope.$apply(function () 
		{
			/* Atualiza o tamanho da página */
			$scope.innerWidth = $window.innerWidth;
			/* Salva a tela atual */
			var tmp = $scope.modal;
			/* Reseta a tela */
			$scope.modal = -1;
			/* Volta com o valor */
			$scope.modal = tmp;
        });
	});
});