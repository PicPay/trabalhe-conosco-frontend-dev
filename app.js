// 1. Tela de Listagem de Destinatários (da transação)

// 1.1 Listar destinatários

// Json remoto, não utilizado
/*$.getJSON("http://careers.picpay.com/tests/mobdev/users", function(
    json
  ) {
    
    var qntUsuarios = json.length;
    for (id = 0; id < qntUsuarios; id++) {  
      $('#usuariosLista').append('<li>' + json[id].name + '</li>');
    }
    
 })
    .done(function() {
      console.log("JSON recebido");
    })
    .fail(function() {
      console.log("Erro ao carregar listagem de destinatários");
    });*/

// Pega json local, por conta de instabilidade do link oficial
var usuarios = [{"id":1001,"name":"Eduardo Santos","img":"https://randomuser.me/api/portraits/men/9.jpg","username":"@eduardo.santos"},{"id":1002,"name":"Marina Coelho","img":"https://randomuser.me/api/portraits/women/37.jpg","username":"@marina.coelho"},{"id":1003,"name":"Márcia da Silva","img":"https://randomuser.me/api/portraits/women/57.jpg","username":"@marcia.silva"},{"id":1004,"name":"Fabrício Val","img":"https://randomuser.me/api/portraits/men/98.jpg","username":"@fabricio.val"},{"id":1005,"name":"Júlia Magalhães","img":"https://randomuser.me/api/portraits/women/44.jpg","username":"@julia.magalhaes"},{"id":1006,"name":"Luma Pereira","img":"https://randomuser.me/api/portraits/women/13.jpg","username":"@luma.pereira"},{"id":1007,"name":"Danilo Gonçalves","img":"https://randomuser.me/api/portraits/men/55.jpg","username":"@danilo.goncalves"},{"id":1008,"name":"Amanda Souza","img":"https://randomuser.me/api/portraits/women/59.jpg","username":"@amanda.souza"},{"id":1009,"name":"Suely Abreu","img":"https://randomuser.me/api/portraits/women/80.jpg","username":"@suely.abreu"},{"id":1010,"name":"Elizângela Moraes","img":"https://randomuser.me/api/portraits/women/10.jpg","username":"@elizangela.moraes"},{"id":1011,"name":"Rogéria Duarte","img":"https://randomuser.me/api/portraits/women/50.jpg","username":"@rogeria.duarte"},{"id":1012,"name":"Eveline Dantas","img":"https://randomuser.me/api/portraits/women/58.jpg","username":"@eveline.dantas"},{"id":1013,"name":"Wagner Oliveira","img":"https://randomuser.me/api/portraits/men/96.jpg","username":"@wagner.oliveira"},{"id":1014,"name":"Vitor Lins","img":"https://randomuser.me/api/portraits/men/14.jpg","username":"@vitor.lins"},{"id":1015,"name":"Sandro Carvalho","img":"https://randomuser.me/api/portraits/men/71.jpg","username":"@sandro.carvalho"},{"id":1016,"name":"Cauã Muniz","img":"https://randomuser.me/api/portraits/men/29.jpg","username":"@caua.muniz"},{"id":1017,"name":"Felipe Andrade","img":"https://randomuser.me/api/portraits/men/67.jpg","username":"@felipe.andrade"},{"id":1018,"name":"André Castro","img":"https://randomuser.me/api/portraits/men/3.jpg","username":"@andre.castro"},{"id":1019,"name":"Mariana Torres","img":"https://randomuser.me/api/portraits/women/34.jpg","username":"@mariana.torres"},{"id":1020,"name":"Juliano Garcia","img":"https://randomuser.me/api/portraits/men/54.jpg","username":"@juliano.garcia"},{"id":1021,"name":"Otávio Barcelos","img":"https://randomuser.me/api/portraits/men/33.jpg","username":"@otavio.barcelos"},{"id":1022,"name":"Tatiana Novaes","img":"https://randomuser.me/api/portraits/women/0.jpg","username":"@tatiana.novaes"},{"id":1023,"name":"Marco Assunção","img":"https://randomuser.me/api/portraits/men/72.jpg","username":"@marco.assuncao"},{"id":1024,"name":"Antônio Moura","img":"https://randomuser.me/api/portraits/men/92.jpg","username":"@antonio.moura"},{"id":1025,"name":"Alessandra Gomes","img":"https://randomuser.me/api/portraits/women/9.jpg","username":"@alessandra.gomes"},{"id":1026,"name":"Arnaldo Barros","img":"https://randomuser.me/api/portraits/men/41.jpg","username":"@arnaldo.barros"},{"id":1027,"name":"Adriele Cavalcante","img":"https://randomuser.me/api/portraits/women/96.jpg","username":"@adriele.cavalcante"},{"id":1028,"name":"Carol Lombardi","img":"https://randomuser.me/api/portraits/women/62.jpg","username":"@carol.lombardi"},{"id":1029,"name":"Bruno Martins","img":"https://randomuser.me/api/portraits/men/20.jpg","username":"@bruno.martins"},{"id":1030,"name":"Fernando Sanches","img":"https://randomuser.me/api/portraits/men/21.jpg","username":"@fernando.sanches"},{"id":1031,"name":"Maria Medeiros","img":"https://randomuser.me/api/portraits/women/77.jpg","username":"@maria.medeiros"},{"id":1032,"name":"Paulo Noronha","img":"https://randomuser.me/api/portraits/men/68.jpg","username":"@paulo.noronha"},{"id":1033,"name":"Mário Campos","img":"https://randomuser.me/api/portraits/men/35.jpg","username":"@mario.campos"}];

// Função para ordenar resultados em ordem alfabética
function sortJSON(data, key) {
    return data.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
    });
}

// Aplica função de ordem alfabética
usuarios = sortJSON(usuarios, "username");

// Imprime lista de usuários
$(function() {

    // Para cada registro, imprime um item de lista
    $.each(usuarios, function(index, usuario) {
      
        $('#usuariosLista').append('<li class="flex flex-justificar"> <div class="dadosUsuario"> <img class="fotoUsuario" src="' + usuario.img + '"> <div> <span class="nomeUsuario">' + usuario.name + '</span> <span class="metaUsuario">id: <span class="idUsuario">' + usuario.id + '</span>  <span class="arrobaUsuario">' + usuario.username + '</span></span> </div> </div> <div class="acoes flex flex-centralizar"> <span class="pagar-icone"></span> <span class="pagar-texto">PAGAR</span> <span><i class="fas fa-chevron-right"></i></span> </div> </li>');
    });
    
});

// 1.2 Selecionar destinatário

// Verifica se há destinatário selecionado na sessão
var destinoSelecionadoUN = sessionStorage.getItem('destinoSelecionadoUN') || 0;
var destinoSelecionadoID = sessionStorage.getItem('destinoSelecionadoID') || 0;

$(function() {

    // Caso haja, avança para Definição de Valor
    if (destinoSelecionadoUN != 0) {
        $('#selecionarDestino').hide(); // Oculta Listagem de Destinatários
        $('#selecionarValor').show(); // Exibe Definição do Valor
        $('.destinoSelecionado').text(destinoSelecionadoUN); // Identifica o destinatário selecionado

        // Caso contrário, abre tela de seleção
    } else {
        // Quando um destinatário é escolhido 
        $('#usuariosLista').on('click', 'li', function() {

            // Personaliza modal e abre
            $('.modalUsuario').attr("id", $('.idUsuario').text());
            $('.modalUsuario').show();
            
            // Identifica o destinatário selecionado
            $('.modal .nomeUsuario').text($(this).find('.nomeUsuario').text());
            $('.modal .fotoUsuario').attr("src", $(this).find('.fotoUsuario').attr('src'));
            $('.modal .idUsuario').text($(this).find('.idUsuario').text());
            $('.modal .arrobaUsuario').text($(this).find('.arrobaUsuario').text());
                        
            

            // Salva na sessão o username e o ID selecionado
            sessionStorage.setItem('destinoSelecionadoUN', $(this).find('.username').text());
            sessionStorage.setItem('destinoSelecionadoID', $(this).attr('data-id'));
            
            

            // Oculta seção atual (Listagem de Destinatários)
            //$(this).closest('section').slideUp();

            // Avança para Definição do Valor
            //$('#selecionarValor').closest('section').slideDown();
        });
    }
});


// 2. Definição do Valor

var valorSelecionado = sessionStorage.getItem('valorSelecionado') || 0; // Se não houver valor selecionado, o declara
$('#valor').val(valorSelecionado); // Se houver valor selecionado, o recupera (Caso do usuário sair do fluxo / cadastrar novo cartão)

// Dados do cartão cadastrado (se não houver, declara as variáveis)
var cartao = localStorage.getItem('cartao') || 0;

$(function() {

    // Para confirmar o POST, preciso de um cartão cadastrado

    // Quando o valor é submetido
    $('#selecionarValor').on('click', '#enviarValor', function(evento) {

        evento.preventDefault();

        // Salva na sessão
        sessionStorage.setItem('valorSelecionado', $('#valor').val());

        // Se houver cartão cadastrado, avança para Transferência
        if (cartao != 0) {
            
            var transacao = {
                "card_number" : cartao.numero,
                "cvv" : cartao.cvv,
                "value" : valorSelecionado,
                "expiry_date" : cartao.validade,
                "destination_user_id" : destinoSelecionadoID
            };

            $.post("http://careers.picpay.com/tests/mobdev/transaction", function( transacao ) {
               console.log('Transação enviada');
                console.log(transacao);
            })
                .done (function () {
                alert("Transação efetuada com sucesso!");
                
                // Remove os valores de destinatário e valor
                sessionStorage.removeItem(destinoSelecionadoUN);
                sessionStorage.removeItem(destinoSelecionadoID);
                sessionStorage.removeItem(valorSelecionado);
            })
                .fail (function () {
                alert("Houve um problema com a transação. Tente novamente mais tarde.")
            });
            

            // Se não houver cartão cadastrado, solicita a inclusão
        } else {

            console.log('Não há cartão cadastrado');

            // Oculta seção atual (Transferência)
            $('#selecionarValor').slideUp();

            // Mostra informações para Adicionar Cartão
            $('#adicionarCartao').slideDown();

            // Quando o cartão é submetido
            $('#adicionarCartao').on('click', '#enviarCartao', function() {
                
                // Tratando a validade (mês/ano)
                validadeBruta = $('#cartValidade').val();
                [ano, mes] = validadeBruta.split('-');
                validadeFinal = mes + '/' + ano.substring(2, 4);

                // Passa preenchimento do formulário para Cadastro do Cartão                
                var cartao = {
                    numero : $('#cartNumero').val(),
                    validade : validadeFinal,
                    cvv : $('#cartCVV').val()
                };
                
                // Grava cartão cadastrado
                localStorage.setItem('cartao', cartao);

            })
            .done( function() {
                alert("oi");
            });
        }
    });

});


// 2.3.1 Botão para o usuário do sistema mudar destinatário
$('.alterarDestinatario').on('click', function() {

    // Redefine valor inicial
    sessionStorage.setItem('destinoSelecionadoUN', 0);
    sessionStorage.setItem('destinoSelecionadoID', 0);

    // Retorna para seção Listagem de Destinatários
    $('#selecionarValor').slideUp();
    $('#selecionarDestino').slideDown();

});