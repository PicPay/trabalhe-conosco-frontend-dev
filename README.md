![PicPay](https://user-images.githubusercontent.com/1765696/26998603-711fcf30-4d5c-11e7-9281-0d9eb20337ad.png)

# Teste Frontend - Nicole Rizzi Nunes

## Tecnologias Utilizadas:

[Angular JS](https://angular.io/) version 5.2.0
[Angular Material](https://material.angular.io/) version 5.2.0
[Angular CLI](https://cli.angular.io/) version 1.7.4.

## Utilização:

Caso não possua as tecnologias mencionadas acima, visite a aba "Get Started" do (https://angular.io/)
Para utilizar a aplicação basta rodar neste diretório o comando `ng serve` e acesse no navegador o endereço `http://localhost:4200/`.

A aplicação simula o comportamento do aplicativo da PicPay permitindo que um usuário (já pré-logado) cadastre cartões de crédito e efetue pagamentos a amigos.

A lista de amigos é retirada via json de `http://careers.picpay.com/tests/mobdev/users `

Quando um pagamento é feito, a aplicação faz uma requisição POST para `para http://careers.picpay.com/tests/mobdev/transaction` contendo no corpo da requisição um JSON com os seguintes atributos:

+ ID do usuário que irá receber o pagamento
+ Número do cartão
+ Vencimento do cartão
+ CVV
+ Valor total

Exemplo de requisição:

``` json
{  
   "card_number":"1111111111111111",
   "cvv":789,
   "value":79.9,
   "expiry_date":"01/18",
   "destination_user_id":1002
}
```

### Para fins de teste, o número de cartão 1111111111111111 aprova a transação, qualquer outro recusa. 
