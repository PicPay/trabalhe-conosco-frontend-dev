import React, {Component} from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';
import '../css/Modal_Cartao_Cadastrado.css';

const currencyConfig = {
    locale: "pt-BR",
    formats: {
    number: {
    BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        },
      },
    },
};

class ModalCartaoCadastrado extends Component {

  render() {

    if(!this.props.show) {
      return null;
    }

    var aux = localStorage.getItem(this.props.sUser.nome);
    var vetor = aux.split(',');
    var elemento = vetor[5].slice(-4);

    return (
      <div className="backdrop">
        <div className="modalNenhumCartao">

          <div className="retanguloTitulo">
            <img src={require("../img/logo_menor.png")} alt="Logo da empresa." className="logo"/>
            <div className="pagamentoParaNome">Pagamento para <div>{this.props.sUser.nome}</div></div>
            <input type="image" src={require('../img/shape-copy.png')} alt="Fechar janela." onClick={this.props.onClose} className="fechar" />
          </div>

          <div className="containerVoltar">
              <img src={require("../img/down_menor.png")} alt="Seta para esquerda, voltar." className="left"/>
              <div className="voltar" onClick={this.props.onClose}>Voltar</div>
          </div>

          <div className="containerUsuario">
          <img className="foto" alt="Foto do usuário." src={this.props.sUser.imagem} />
          <div className="conjunto">
              <div className="nome">{this.props.sUser.nome}</div>
              <br />
              <div className="id">id: {this.props.sUser.iden}</div>
              <div className="username">{this.props.sUser.username}</div>
          </div>
          </div>

          <div className="containerDinheiro">
              <IntlCurrencyInput currency="BRL" config={currencyConfig} className="R-000" />
          </div>

          <div className="containerFlex">
            <div className="divisoria"></div>
          </div>
          <div className="containerFlex">
            <div className="divisoria-2"></div>
          </div>

          <div className="avisoCadastro">
            <picture className="imgCartao">
              <source media="(min-width: 768px)" srcSet={require("../img/blue.png")} />
              <img src={require("../img/green.png")} alt="Logo da empresa." />
            </picture>
            <div className="formaPagamento">Forma de pagamento:
                <div>Cartão de crédito com final {elemento}</div>
            </div>
          </div>

          <div className="containerFlex">
              <button type="button" className="botao" >PAGAR</button>
          </div>

        </div>
      </div>
    );
  }
}

export default ModalCartaoCadastrado;
