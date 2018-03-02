// Geral

// Fechar modal pelo botão
$('.fechar').on('click', function () {
    $('.modal').hide();
});

// Fechar modal clicando fora
var modal = document.getElementsByClassName('modal')[0];
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Personalizado

// Adicionar cartão
$('.modalCadastroCartao select').on('click', function() {
   $(this).css("background", "white");
   $(this).css("z-index",  "1"); 
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
        $('#valor').val("");
    });

});