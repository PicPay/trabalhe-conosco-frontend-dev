# Leia-me

Pensando que cada empresa trabalha com frameworks preferidos, eu optei por escrever o código de maneira simples, sem a utilização de uma biblioteca como Bootstrap, ou pré-processadores como Less/Sass para CSS. Usei jQuery para escrever o JavaScript por acreditar que ele facilita a leitura.

Segui uma interface simples, que cumpre a meta de responsividade, embora não tenha muitas adaptações. Inspirado na identidade do PicPay, mas sem a preocupação de fidelidade.

As instruções do teste foram para criação de um fluxo bem direto e, por pouca experiência em dinâmicas parecidas, eu não soube se deveria incrementar outras/muitas ações na interface. Optei por apenas colocar botões simples com ação para o usuário voltar no fluxo, caso o mesmo queira alterar o destinatário da transação, uma vez que salvo esses dados na sessão, para que ele não os perca durante o cadastro do cartão ou mesmo em uma hipotética interrupção de conexão. Pensando em não exagerar, acabei optando por não salvar esses dados localmente, como feito com o cartão de crédito, e não coloquei uma opção para o usuário editar/apagar o cartão cadastrado.
