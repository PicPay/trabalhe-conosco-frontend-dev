// Geral

// Fechar modal pelo botão
$('.fechar.xis').on('click', function () {
    $('.modal').hide();
    $('body').css("overflow", "visible");
});

// Fechar modal clicando fora
var modal = document.getElementsByClassName('modal')[0];
var body = document.getElementsByTagName("BODY")[0];
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        body.style.overflow = "visible";
    }
}


// Personalizado

// Adicionar cartão
$(function () {
    $('.modalCadastroCartao select').on('click', function () {
        $(this).css("background", "white");
        $(this).css("z-index", "1");
    });
});

// Exibir lista de cartões cadastrados
$(function () {
    $('.infoCartao').on('click', function () {
        $('.modal').hide(); // Fecha outros modais
        $('.modalExibirCartoes').show();  // Abre modal de Cadastro de Cartão
    });

    $('#selecionarCartao').on('click', function () {
        $('.modal').hide(); // Fecha outros modais
        $('.modalUsuario').show();  // Abre modal de Pagamento ao Usuário
    });
});

// Recibo
$(function () {
    $('.modalRecibo').on('click', '.voltar', function () {
        $('.modal').hide(); // Fecha outros modais
        $('.modalUsuario').show(); // Abre modal de Pagamento ao Usuário
    });

    $('.modalRecibo').on('click', '.acao', function () {
        $('.modal').hide();
        $('#valor').val("");
        $('body').css("overflow", "visible");
    });
});

// Voltar Modal
$(function () {
    $('.modalCadastroCartao, .modalExibirCartoes, .modalRecibo').on('click', '.fechar.voltarModal', function () {
        $('.modal').hide(); // Fecha outros modais
        $('.modalUsuario').show();  // Abre modal de Pagamento ao Usuário
    });

    $('.modalUsuario').on('click', '.fechar.voltarModal', function () {
        $('.modal').hide(); // Fechar modal
        $('body').css("overflow", "visible");
    });
});