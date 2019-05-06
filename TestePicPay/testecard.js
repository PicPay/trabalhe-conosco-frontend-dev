/*
*   Teste de conhecimentos de desenvolvimento Front-End para a PicPay
*   Escrito por Guilherme Santana
*/

var cardArray = new Array();
var currentCard = 0;    
var currentTarget = 0;

// retorna se existe ao menos um cartão salvo na memória
function testCardsAvailable () {
    return cardArray !== null && cardArray.length > 0;
}

// checa se existem cartões gravados na memória e altera de acordo o modal
function setCardsAvailable(){
    if(testCardsAvailable()) {
        document.getElementById('card-selected-block').style.display = 'block';
        document.getElementById('no-card-block').style.display = 'none';                
    } else {
        document.getElementById('card-selected-block').style.display = 'none';
        document.getElementById('no-card-block').style.display = 'block'; 
    }
}

// popula o modal da lista de cartões disponiveis para serem escolhidos
function populateCardModal () {
    var parentDiv = document.getElementById('card-list');
    
    // limpa o modal primeiro
    var fc = parentDiv.firstChild;
    while( fc ) {
        parentDiv.removeChild( fc );
        fc = parentDiv.firstChild;
    }

    if(cardArray === null)
        return;

    // popula o modal com uma entrada para cada cartão
    for(i = 0; i < cardArray.length; i++)
    {
        var cardSelectDiv = document.createElement('div');
        cardSelectDiv.id = "card-select-item-" + i;
        cardSelectDiv.className = 'card-select-item';
        cardSelectDiv.onclick = (function(cardNumber){
            return function(){
                setCurrentCard(cardNumber);
            };
         })(i);
        parentDiv.appendChild(cardSelectDiv);
        var cardSelectImg = document.createElement('img');
        cardSelectImg.src = "/assets/blue.png";
        cardSelectImg.srcset = "/assets/blue@2x.png 2x,/assets/blue@3x.png 3x";
        cardSelectImg.className = 'card-icon';
        cardSelectDiv.appendChild(cardSelectImg);
        var cardSelectNumber = document.createElement('span');
        cardSelectNumber.className = 'card-select-item-text dark-blue-text';
        cardSelectNumber.innerHTML = cardNumberFormat(cardArray[i]["cardNumber"]);
        cardSelectDiv.appendChild(cardSelectNumber);
        var cardCheckImg = document.createElement('img');
        cardCheckImg.id = "check-icon-" + i;
        cardCheckImg.src = "/assets/check-mark.png";
        cardCheckImg.srcset = "/assets/check-mark@2x.png 2x,/assets/check-mark@3x.png 3x";
        cardCheckImg.className = 'check-icon';
        cardCheckImg.style.display = "none";
        cardSelectDiv.appendChild(cardCheckImg);
    }
}

// altera o cartão atual
function setCurrentCard (newCard) {
    currentCard = newCard;
    localStorage.setItem("currentCard",String(newCard));
    setCurrentCardValues(true);
}

// define os valores do cartão atual em todos os locais aplicáveis na tela
function setCurrentCardValues(local){
    if (!local)
        currentCard = parseInt(localStorage.getItem("currentCard"));
    
    // mudaremos os valores apenas se existirem cartões na memória
    if(testCardsAvailable())
    {
        document.getElementById('card-last-digits').innerHTML = cardArray[currentCard]['cardNumber'].substring(12,16);
        for(i = 0; i < cardArray.length; i++)
        {
            if(i === currentCard && document.getElementById("card-select-item-"+i) !== null)
            {
                document.getElementById("card-select-item-"+i).classList.add('selected-card');
                document.getElementById("check-icon-"+i).style.display = "inline-block";
            }
            else if(document.getElementById("card-select-item-"+i) !== null)
            {
                if ( document.getElementById("card-select-item-"+i).classList.contains('selected-card') )
                    document.getElementById("card-select-item-"+i).classList.remove('selected-card');
                document.getElementById("check-icon-"+i).style.display = "none";
            }
        }
    }
}

// ao clicar no botão de Pagar, testa se há um cartão selecionado e leva à tela apropriada
function tryPayment() {
    var paymentString = document.getElementById('payment-amount-text').value.replace(",",".");
    paymentString = paymentString.replace(",",".");
    paymentString = paymentString.replace("R$","");
    var paymentAmount = parseFloat(paymentString);
    $('#payment-modal').modal('hide');
    if(testCardsAvailable()) 
    {
        currentTarget = parseInt(localStorage.getItem("currentTarget"));
        executePayment(paymentAmount,currentTarget);
    }
    else 
    {
        toCardRegister();
    }
}

// efetua um pagamento para um usuário
function executePayment(paymentAmount,userTarget) {
    var userArray = JSON.parse(localStorage.getItem("userArray"));
    if(isNaN(paymentAmount)) {
        $('#payment-modal').modal('hide');
        $('#error-modal').modal('show');
        return;
    }
    
    var paymentData = {
        "card_number":cardArray[currentCard]["cardNumber"],
        "cvv":parseInt(cardArray[currentCard]["cardCode"]),
        "value":paymentAmount,
        "expiry_date":cardArray[currentCard]["cardExpiry"],
        "destination_user_id":parseInt(userArray[userTarget].id)
    };
    
    // faz um post via AJAX com os dados do pagamento
    $.ajax({
        url: "http://careers.picpay.com/tests/mobdev/transaction",
        data : JSON.stringify(paymentData),
        contentType : 'application/json',
        type : 'POST',
        success: function(result) {
            console.log(result);
            var parsedResult = JSON.parse(result);
            if(parsedResult["transaction"]["success"]===true)
            {
                $('#payment-modal').modal('hide');
                
                var parsedValue = "R$ " + String(parsedResult["transaction"]["value"].toFixed(2)).replace(".",",");
                
                // preenche os campos do modal de recibo
                document.getElementById('receipt-user-portrait').src = userArray[userTarget].img;
                document.getElementById('receipt-person-name').innerHTML = userArray[userTarget].name;
                document.getElementById('receipt-user-id').innerHTML = userArray[userTarget].id;
                document.getElementById('receipt-user-name').innerHTML = userArray[userTarget].username;
                
                document.getElementById('receipt-transaction').innerHTML = parsedResult["transaction"]["id"];
                document.getElementById('receipt-date').innerHTML = timeConverter(parsedResult["transaction"]["timestamp"]);
                document.getElementById('receipt-card').innerHTML = "**** **** **** " + cardArray[currentCard]["cardNumber"].substring(12,16);
                document.getElementById('receipt-value').innerHTML = parsedValue;
                
                $('#receipt-modal').modal('show');
            }
            else
            {
                $('#payment-modal').modal('hide');
                $('#error-modal').modal('show');
            }
        }
    });
}


// testa os inputs e salva um cartão na memória local
function tryRegisterCard(){
    var valid = true;
    var cardNumberEntry = document.getElementById("input-card-number").value;
    
    var flagOption = document.getElementById("input-card-flag");
    var flag = flagOption.options[flagOption.selectedIndex].value;
    var name = document.getElementById("input-name-on-card").value;
    
    // usa regex para extrair o número do cartão
    var number = cardNumberEntry.match(/\d+/g)?cardNumberEntry.match(/\d+/g):[];
    var parsedNumber = "";
    for(var i=0;i<number.length;i++){
        parsedNumber+=number[i];
    }
    
    var expiry = document.getElementById("input-expiry-date").value;
    var code = document.getElementById("input-security-code").value;
    var cep = document.getElementById("input-cep-code").value;
    
    if(flag === "0")
    {
        console.log("Bandeira do cartão não selecionada");
        valid = false;
    }
    if(name.length === 0)
    {
        console.log("Nome do usuário não inserido");
        valid = false;
    }
    var numberPattern = new RegExp("[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]");
    if(!numberPattern.test(parsedNumber))
    {
        console.log("Número do cartão incorreto");
        valid = false;
    }
    var expiryPattern = new RegExp("[0-9][0-9]\/[0-9][0-9][0-9][0-9]");
    if(!expiryPattern.test(expiry))
    {
        console.log("Validade incorreta");
        valid = false;
    }
    var codePattern = new RegExp("[0-9][0-9][0-9]");
    if(!codePattern.test(code))
    {
        console.log("Código de segurança incorreto");
        valid = false;
    }
    var cepPattern = new RegExp("[0-9][0-9][0-9][0-9][0-9]\-?[0-9][0-9][0-9]");
    if(!cepPattern.test(cep))
    {
        console.log("Cep incorreto");
        valid = false;
    }
    if (valid) {
        // removemos os dois primeiros dígitos do ano, pois a entrada do formulário é mm/aaaa e o dado guardado/enviado é mm/aa
        expiry = expiry.substring(0,3) + expiry.substring(3,5);
        document.getElementById("card-info-error").style.display = "none";
        var card = {
            cardFlag : flag,
            cardName : name,
            cardNumber : parsedNumber,
            cardExpiry : expiry,
            cardCode : code,
            cardCep : cep.replace(/\-/g, '')
        };
        saveCardsToMemory(card);
        populateCardModal();
        $('#register-card-modal').modal('hide');
        $('#payment-modal').modal('show');
    } else {
        document.getElementById("card-info-error").style.display = "block";
    }
}

// salva os cartões na memória local
function saveCardsToMemory(card) {
    if(cardArray === null)
        cardArray = new Array();
    cardArray.push(card);
    localStorage.setItem("cardArray",JSON.stringify(cardArray));
    setCurrentCard(cardArray.length - 1);
    setCardsAvailable();
}

// carrega os cartões da memória local
function loadCardsFromMemory() {
    cardArray = JSON.parse(localStorage.getItem("cardArray"));
}

// muda para a tela de cadastrar um novo cartão
function toCardRegister() {
    $('#payment-modal').modal('hide');
    $('#select-card-modal').modal('hide');
    
    // limpa os campos
    document.getElementById("input-card-flag").value = 0;
    document.getElementById("input-name-on-card").value = "";
    document.getElementById("input-card-number").value = "";
    document.getElementById("input-expiry-date").value = "";
    document.getElementById("input-security-code").value = "";
    document.getElementById("input-cep-code").value = "";
    
    $('#register-card-modal').modal('show');
}

// muda para a tela de pagamento
function toPaymentModal() {
    $('#select-card-modal').modal('hide');
    $('#register-card-modal').modal('hide');
    $('#receipt-modal').modal('hide');
    $('#error-modal').modal('hide');
    document.getElementById('payment-amount-text').value = "";
    $('#payment-modal').modal('show');
}

// converte a data de uma timestamp UNIX pra uma data legível
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth();
  var convMonth = String(month);
  if(convMonth.length === 1)
      convMonth = "0" + convMonth;
  var date = a.getDate();
  var convDate = String(date);
  if(convDate.length === 1)
      convDate = "0" + convDate;
  var hour = a.getHours();
  var convHour = String(hour);
  if(convHour.length === 1)
      convHour = "0" + convHour;
  var min = a.getMinutes();
  var convMin = String(min);
  if(convMin.length === 1)
      convMin = "0" + convMin;
  var time = convDate + '/' + convMonth + '/' + String(year).substring(2,4) + ' - ' + convHour + ':' + convMin;
  return time;
}

// converte uma string de numero de cartão em uma string formatada com espaços
function cardNumberFormat(cardNumber) {
    var formatted = new String();
    formatted += cardNumber.substring(0,4) + " ";
    formatted += cardNumber.substring(4,8) + " ";
    formatted += cardNumber.substring(8,12) + " ";
    formatted += cardNumber.substring(12,16);
    return formatted;
}