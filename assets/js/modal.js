
// Fechar modal pelo botão
$('.close').on('click', function () {
    $('.modal').hide();
});

// Fechar modal clicando fora
var modal = document.getElementsByClassName('modalUsuario')[0];
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}