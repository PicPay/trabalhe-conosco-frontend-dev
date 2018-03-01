
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

$('.modalCadastroCartao select').on('click', function() {
   $(this).css("background", "white");
   $(this).css("z-index",  "1"); 
});