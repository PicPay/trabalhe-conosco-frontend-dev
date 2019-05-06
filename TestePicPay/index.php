<!DOCTYPE html>
<!--
Teste de conhecimentos de desenvolvimento Front-End para a PicPay
Escrito por Guilherme Santana
-->
<html>
    <head>
        <title>Front-End Test</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/custom.css">
        <script src="testecard.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">
        <link rel="shortcut icon" href="/img/graphic/favicon.ico" type="image/x-icon" />
    </head>
    <body>
        <div class="container-fluid" id="header-base">
            <div class="header-container">
                <img id="site-logo" src="/assets/logo.png" srcset="/assets/logo@2x.png 2x, /assets/logo@3x.png 3x" alt="Site logo">
                <div class="vertical-line"></div>
                <p id="page-title" class="dark-blue-text">Front-End Test</p>
            </div>
        </div>
        <div class="page-contents">
        <?php
            $data = json_decode(file_get_contents('http://careers.picpay.com/tests/mobdev/users'), true);
            $id = 0;
            foreach($data as $row) {
                echo '<div class="container-fluid user-block">';
                echo '<img src="'. $row["img"] .'" class="user-portrait">';
                echo '<div class="id-texts">';
                echo '<p class="person-name white-text">'. $row["name"] .'</p>';
                echo '<p class="user-id white-text">id: '. $row["id"] .'</p>';
                echo '<p class="user-name white-text">'. $row["username"] .'</p>';
                echo '</div>';
                echo '<div class="pay-button-block" data-toggle="modal" data-target="#payment-modal" onClick="setAndLoad('. $id .')">';
                echo '<img class="pay-icon" src="/assets/pagar.png" srcset="/assets/pagar@2x.png 2x,/assets/pagar@3x.png 3x">';
                echo '<p class="pay-text white-text">PAGAR</p>';
                echo '<img class="arrow-icon" src="/assets/down.png" srcset="/assets/down@2x.png 2x,/assets/down@3x.png 3x">';
                echo '</div>';
                echo '</div>';
                $id = $id + 1;
            }
        ?>
        </div>
        
        <!-- modal de inserir valor do pagamento e ver o alvo do pagamento -->
        <div id="payment-modal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                      <img src="/assets/shape-copy.png" srcset="/assets/shape-copy@2x.png 2x, /assets/shape-copy@3x.png 3x" class="modal-close-img">
                  </button>
                    <h4 class="modal-title"><span class="white-text">Pagamento para </span><span id="modal-header-name" class="cyan-text">Nome do Usuário</span></h4>
                </div>
                <div class="modal-body">
                    <div class="modal-user-data">
                        <img src="https://randomuser.me/api/portraits/men/9.jpg" id="modal-user-portrait" class="modal-user-portrait">
                        <div class="modal-id-texts">
                            <p id="modal-person-name" class="person-name dark-blue-text">Nome do Usuário</p>
                            <p id="modal-user-id" class="user-id dark-blue-text">id: 8888</p>
                            <p id="modal-user-name" class="user-name dark-blue-text">@username</p>
                        </div>
                    </div>
                    <div class="modal-payment-amount">
                        <input type="text" class="form-control dark-blue-text" id="payment-amount-text" placeholder="R$0,00">
                        <div class="payment-amount-underscore"></div>
                        <div class="modal-divider"></div>
                    </div>
                    <div id="no-card-block">
                        <img src="/assets/alert.png" srcset="/assets/alert@2x.png 2x,/assets/alert@3x.png 3x" class="alert-icon">
                        <div class="no-card-text-block inline-block">
                            <p class="no-card-text pink-text">Nenhum cartão de crédito cadastrado.</p>
                            <p class="no-card-register-card-text pink-text" onClick="toCardRegister()">Cadastrar agora.</p>
                        </div>
                    </div>
                    <div id="card-selected-block">
                        <img src="/assets/blue.png" srcset="/assets/blue@2x.png 2x,/blue/alert@3x.png 3x" class="card-icon">
                        <div class="card-selected-text-block inline-block" onClick="swapToCardSelectModal()">
                            <p class="payment-type-text dark-blue-text">Forma de Pagamento:</p>
                            <p class="card-selected-text dark-blue-text">Cartão de Crédito com final <span id="card-last-digits">1111</span></p>
                        </div>
                    </div>
                    <div class="payment-button" onClick="tryPayment()">
                        <p class="payment-button-text dark-blue-text">PAGAR</p>
                    </div>
                </div>
              </div>
            </div>
        </div>
        
        <!-- modal de inserir valor do pagamento e ver o alvo do pagamento -->
        <div id="register-card-modal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                      <img src="/assets/shape-copy.png" srcset="/assets/shape-copy@2x.png 2x, /assets/shape-copy@3x.png 3x" class="modal-close-img">
                  </button>
                    <h4 class="modal-title white-text">Cadastro Cartão de Crédito</h4>
                </div>
                <div class="modal-body left-aligned">
                    <select class="form-control" id="input-card-flag">
                        <option class="light-grey-text" value="0">Selecione a bandeira</option>
                        <option value="visa">VISA</option>
                        <option value="mastercard">MASTERCARD</option>
                        <option value="amex">AMERICAN EXPRESS</option>
                    </select>
                    <input type="text" class="form-control black-text" id="input-name-on-card" placeholder="Nome escrito no cartão">
                    <div class="form-group">
                        <label class="input-label dark-blue-text" for="input-card-number">Número do Cartão</label>
                        <input type="text" class="form-control black-text" id="input-card-number" placeholder="Número do cartão">
                    </div>
                    <input type="text" class="form-control black-text" id="input-expiry-date" placeholder="Validade (mm/aaaa)">
                    <input type="text" class="form-control black-text" id="input-security-code" placeholder="Código de segurança">
                    <input type="text" class="form-control black-text" id="input-cep-code" placeholder="CEP do endereço da fatura">
                    <p class="pink-text" id="card-info-error">Um ou mais dados foram inseridos incorretamente. Cheque os valores e tente novamente.</p>
                    <div class="register-card-button" onClick="tryRegisterCard()">
                        <p class="payment-button-text dark-blue-text">CADASTRAR</p>
                    </div>
                </div>
              </div>
            </div>
        </div>
        
        <!-- modal de selecionar cartões -->
        <div id="select-card-modal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                      <img src="/assets/shape-copy.png" srcset="/assets/shape-copy@2x.png 2x, /assets/shape-copy@3x.png 3x" class="modal-close-img">
                  </button>
                    <h4 class="modal-title white-text">Selecionar Cartão de Crédito</h4>
                </div>
                <div class="modal-body no-side-padding left-aligned">
                    <div class="select-card-title dark-blue-text">Cartões Cadastrados</div>
                    <div id="card-list">
                        <!-- lista de cartões entra aqui -->
                    </div>
                    <div class="card-select-divider"></div>
                    <div class="card-select-item" onClick="toCardRegister()">
                        <img src="/assets/plus.png" srcset="/assets/plus@2x.png 2x,/assets/plus@3x.png 3x" class="plus-icon">
                        <span class="card-select-item-text dark-blue-text">Cadastrar novo cartão</span>
                    </div>
                    <div class="select-card-button" onClick="toPaymentModal()">
                        <p class="payment-button-text dark-blue-text">SELECIONAR</p>
                    </div>
                </div>
              </div>
            </div>
        </div>
        
        <!-- modal de recibo -->
        <div id="receipt-modal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                      <img src="/assets/shape-copy.png" srcset="/assets/shape-copy@2x.png 2x, /assets/shape-copy@3x.png 3x" class="modal-close-img">
                  </button>
                    <h4 class="modal-title white-text">Recibo de Pagamento</h4>
                </div>
                <div class="modal-body">
                    <div class="modal-user-data">
                        <img src="https://randomuser.me/api/portraits/men/9.jpg" id="receipt-user-portrait" class="modal-user-portrait">
                        <div class="modal-id-texts">
                            <p id="receipt-person-name" class="person-name dark-blue-text">Nome do Usuário</p>
                            <p id="receipt-user-id" class="user-id dark-blue-text">id: 8888</p>
                            <p id="receipt-user-name" class="user-name dark-blue-text">@username</p>
                        </div>
                    </div>
                    <div class="receipt-title dark-blue-text">Pagamento confirmado!</div>
                    <div class="receipt-item">
                        <p class="receipt-left-text dark-blue-text">Transação</p>
                        <p class="receipt-right-text dark-blue-text" id="receipt-transaction">8888888</p>
                    </div>
                    <div class="receipt-item">
                        <p class="receipt-left-text dark-blue-text">Data</p>
                        <p class="receipt-right-text dark-blue-text" id="receipt-date">88/88/88 - 88:88</p>
                    </div>
                    <div class="receipt-item">
                        <p class="receipt-left-text dark-blue-text">Cartão</p>
                        <p class="receipt-right-text dark-blue-text" id="receipt-card">**** **** **** 1111</p>
                    </div>
                    <div class="receipt-item">
                        <p class="receipt-left-text dark-blue-text">Valor</p>
                        <p class="receipt-right-text dark-blue-text" id="receipt-value">R$8080,88</p>
                    </div>
                    <div class="receipt-return-button" data-dismiss="modal">
                        <p class="payment-button-text dark-blue-text">VOLTAR</p>
                    </div>
                    <div class="receipt-repay-button" onClick="toPaymentModal()">
                        <p class="payment-button-text dark-blue-text">PAGAR NOVAMENTE</p>
                    </div>
                </div>
              </div>
            </div>
        </div>
        
        <!-- modal de erro -->
        <div id="error-modal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <img src="/assets/shape-copy.png" srcset="/assets/shape-copy@2x.png 2x, /assets/shape-copy@3x.png 3x" class="modal-close-img">
                    </button>
                    <h4 class="modal-title white-text">Erro</h4>
                </div>
                <div class="modal-body">
                    <div class="receipt-title dark-blue-text">Erro ao efetuar o pagamento. Por favor, confira o valor do pagamento e os dados do cartão e tente novamente.</div>
                    <div class="receipt-return-button" onClick="toPaymentModal()">
                        <p class="payment-button-text dark-blue-text">VOLTAR</p>
                    </div>
                </div>
              </div>
            </div>
        </div>
        
        <script src="Masker-master/src/masker.js"></script>
    </body>
    <script>
        var userArray = JSON.parse(<?php echo "'".file_get_contents('http://careers.picpay.com/tests/mobdev/users')."'"; ?>);
        var currentTarget = 0;
        
        // muda o usuário selecionado e carrega os dados dele no modal
        function setAndLoad(entry) {
            localStorage.setItem("currentTarget",String(entry));
            currentTarget = entry;
            loadModal(entry);
        }
        
        // carrega todos os dados do usuário selecionado no modal que será aberto
        function loadModal(entry) {
            setCardsAvailable();
            setCurrentCardValues(false);
            document.getElementById('modal-user-portrait').src = userArray[entry].img;
            document.getElementById('modal-header-name').innerHTML = userArray[entry].name;
            document.getElementById('modal-person-name').innerHTML = userArray[entry].name;
            document.getElementById('modal-user-id').innerHTML = userArray[entry].id;
            document.getElementById('modal-user-name').innerHTML = userArray[entry].username;
        }
        
        // troca para o modal de seleção de cartões
        function swapToCardSelectModal() {
            $('#payment-modal').modal('hide');
            setCurrentCardValues(false);
            $('#select-card-modal').modal('show');
        }
        
        // aplica máscaras de input nos campos
        function applyMasks() {
            var valueMask = new Masker(
                'R$_________',
                /^[0-9,]$/ // máscara bem básica e suja, pra não ter que envolver libraries mais pesadas, é tratada no submit
            );
            var valueInput = document.getElementById('payment-amount-text');
            valueMask.mask(valueInput);
        
            var cardMask = new Masker(
                '____ ____ ____ ____',
                /^[0-9]$/ // allowed chars
            );
            var cardInput = document.getElementById('input-card-number');
            cardMask.mask(cardInput);
            
            var expiryMask = new Masker(
                '__/____',
                /^[0-9]$/ // allowed chars
            );
            var expiryInput = document.getElementById('input-expiry-date');
            expiryMask.mask(expiryInput);
            
            var codeMask = new Masker(
                '___',
                /^[0-9]$/ // allowed chars
            );
            var codeInput = document.getElementById('input-security-code');
            codeMask.mask(codeInput);
            
            var cepMask = new Masker(
                '_____-___',
                /^[0-9]$/ // allowed chars
            );
            var cepInput = document.getElementById('input-cep-code');
            cepMask.mask(cepInput);
        }
        // jQuery para pegar os cartões da memória local quando a página carregar
        $(document).ready(function() {
            loadCardsFromMemory();
            populateCardModal();
            localStorage.setItem("userArray",JSON.stringify(userArray));
            
            applyMasks();
        });
    </script>
</html>
