// Listagem de Destinatários da transação
var usuarios;

// Pegar JSON remoto
$.getJSON("http://careers.picpay.com/tests/mobdev/users", function (usuarios) {

    // Função para ordenar resultados em ordem alfabética
    function sortJSON(data, key) {
        return data.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }

    // Aplica função de ordem alfabética
    usuarios = sortJSON(usuarios, "username");

    // Imprime lista de usuários
    $(function () {

        // Para cada registro, imprime um item de lista
        $.each(usuarios, function (index, usuario) {
            $('#usuariosLista').append('<li class="flex flex-justificar"> <div class="dadosUsuario"> <img class="fotoUsuario" src="' + usuario.img + '"> <div> <span class="nomeUsuario">' + usuario.name + '</span> <span class="metaUsuario">id: <span class="idUsuario">' + usuario.id + '</span>  <span class="arrobaUsuario">' + usuario.username + '</span></span> </div> </div> <div class="acoes flex flex-centralizar"> <span class="pagar-icone"></span> <span class="pagar-texto">PAGAR</span> <span><i class="fas fa-chevron-right"></i></span> </div> </li>');
        });

    });
})
        .done(function () {
            console.log("JSON recebido");
        })
        .fail(function () {
            $('#usuariosLista').html('<h3 style="padding: 15px">Houve um problema ao carregar a lista de usuários.</h3>');
        });


// 1.2 Selecionar destinatário

// Verifica se há destinatário selecionado na sessão
var destinoSelecionadoUN = sessionStorage.getItem('destinoSelecionadoUN') || 0;
var destinoSelecionadoID = sessionStorage.getItem('destinoSelecionadoID') || 0;

$(function () {

    // Quando um destinatário é escolhido 
    $('#usuariosLista').on('click', 'li', function () {

        // Personaliza modal e abre
        $('.modalUsuario').attr("id", $('.idUsuario').text());
        $('.modalUsuario').show();

        // Identifica o destinatário selecionado
        $('.modal .nomeUsuario').text($(this).find('.nomeUsuario').text());
        $('.modal .fotoUsuario').attr("src", $(this).find('.fotoUsuario').attr('src'));
        $('.modal .idUsuario').text($(this).find('.idUsuario').text());
        $('.modal .arrobaUsuario').text($(this).find('.arrobaUsuario').text());
        $('.cartaoUltDig').text(cartaoDig.substring(cartaoDig.length - 4));

        // Salva na sessão o username e o ID selecionado
        sessionStorage.setItem('destinoSelecionadoUN', $(this).find('.arrobaUsuario').text());
        sessionStorage.setItem('destinoSelecionadoID', $(this).find('.idUsuario').text());
    });
});


// 2. Definição do Valor

var cartao = localStorage.getItem('cartao') || 0; // Dados do cartão cadastrado (se não houver, declara as variáveis)
var cartaoDig = localStorage.getItem('cartaoDig') || 0;

$(function () {

    // Para confirmar o POST, preciso de um cartão cadastrado (além de valor preenchido)

    // Inicialmente desativa o botão de pagamento
    $('#enviarValor').attr("title", "Preencha um valor");
    $('#enviarValor').prop("disabled", true);
    $('#enviarValor').addClass("inativo");

    // Verifica se há cartão cadastrado
    if (cartao != 0) {
        // Se houver cartão, o identifica e habilita botão de enviar valor
        $('#enviarValor').attr("title", "");
        $('#enviarValor').prop("disabled", false);
        $('#enviarValor').removeClass("inativo");
        $('.aviso').hide();
        $('.infoCartao').show();
    } else {
        // Se não houver, mostra aviso e desabilita botão
        $('#enviarValor').attr("title", "Não há cartão cadastrado");
        $('#enviarValor').prop("disabled", true);
        $('#enviarValor').addClass("inativo");
        $('.aviso').show();
        $('.infoCartao').hide();
    }

    // Quando o valor é submetido
    $('.modalUsuario').on('click', '#enviarValor', function (evento) {

        evento.preventDefault();

        // Trata valor
        var valorString = $('#valor').val();
        var valorNumero = Number(valorString);
        $('.valorSelecionado').text(valorString);

        // Se houver valor digitado, executa
        if (valorNumero > 0) {

            // Transação
            var transacao = {
                "card_number": 1111111111111111,
                "cvv": cartao.cvv,
                "value": valorString,
                "expiry_date": cartao.validade,
                "destination_user_id": destinoSelecionadoID
            };

            // POST da transação
            fetch('http://careers.picpay.com/tests/mobdev/transaction', {
                method: 'POST',
                body: JSON.stringify(transacao),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(res => res.json().then(data => ({
                        data: data,
                        status: res.status
                    })).then(response => {

                    // Imprime ID da transação no recibo
                    $('.idTransacao').text(response.data.transaction.id);

                    // Tratando hora
                    var dataTransacao = new Date(response.data.transaction.timestamp * 1000);
                    var diaTransacao = dataTransacao.getDate();
                    var hrTransacao = dataTransacao.getHours();
                    var minTransacao = dataTransacao.getMinutes();
                    var mesTransacao = dataTransacao.getMonth();
                    var anoTransacao = dataTransacao.getFullYear();

                    // Imprime hora no recibo
                    $('.hrTransacao').text(diaTransacao + '/' + mesTransacao + '/' + anoTransacao + ' - ' + hrTransacao + ':' + minTransacao);

                    $('.modal').hide(); // Fecha outros modais
                    $('.modalRecibo').show();  // Abre modal de Recibo

                    // Remove os valores de destinatário
                    sessionStorage.removeItem(destinoSelecionadoUN);
                    sessionStorage.removeItem(destinoSelecionadoID);

                }));
        } else {
            alert("Preencha um valor");
        }
    });
});


// Adicionar cartão
$(function () {

    $('.cadastrarCartao').on('click', function () {
        $('.modal').hide(); // Fecha outros modais
        $('.modalCadastroCartao').show();  // Abre modal de Cadastro de Cartão
    });

    // Quando o cartão é submetido
    $('.modalCadastroCartao').on('click', '#enviarCartao', function () {

        // Tratando a validade (mês/ano)
        validadeBruta = $('#cartValidade').val();
        [ano, mes] = validadeBruta.split('-');
        validadeFinal = mes + '/' + ano.substring(2, 4);

        // Passa preenchimento do formulário para Cadastro do Cartão                
        cartao = {
            numero: $('#cartNumero').val(),
            validade: validadeFinal,
            cvv: $('#cartCVV').val()
        };
        cartaoDig = $('#cartNumero').val();

        // Grava cartão cadastrado
        localStorage.setItem('cartao', cartao);
        localStorage.setItem('cartaoDig', cartaoDig);

    })

    $('.cartaoUltDig').text(cartaoDig.substring(cartaoDig.length - 4));
});


// Exibir lista de cartões cadastrados
$(function () {

    $('.infoCartao').on('click', function () {
        $('.modal').hide(); // Fecha outros modais
        $('.modalExibirCartoes').show();  // Abre modal de Cadastro de Cartão
    });

    $('#selecionarCartao').on('click', function () {
        $('.modal').hide(); // Fecha outros modais
        $('.modalUsuario').show();  // Abre modal de Cadastro de Cartão
    });

});


// Recibo
$(function () {

    $('.modalRecibo').on('click', '.voltar', function () {
        $('.modal').hide();
        $('.modalUsuario').show();
    });

    $('.modalRecibo').on('click', '.acao', function () {
        $('.modal').hide();
    });

});