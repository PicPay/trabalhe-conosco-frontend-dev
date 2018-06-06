import React, {Component} from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';
import '../css/Modal_Cartao_Cadastrado.css';
import axios from 'axios';

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

  constructor(props){
    super(props);

    this.state={
      valorPago: null
    }
  }

//Função para fazer a requisição POST da transação
  async transaction(card, cvv, value, validade, id){
    const response = await axios.post('http://careers.picpay.com/tests/mobdev/transaction', {
      "card_number": card,
      "cvv": cvv,
      "value": value,
      "expiry_date": validade,
      "destination_user_id":id
      });

     console.log(response);
  }

//Execução da função transaction ao clicar no botão PAGAR
  handleClick = (vetor) => {
    this.transaction(vetor[5], vetor[3], this.state.valorPago, vetor[2], this.props.sUser.iden);
  }

//Função para pegar o valor digitado a ser pago e guardar em valorPago
  handleChange = (event, value, maskedValue) => {
    event.preventDefault();
    this.setState({valorPago: maskedValue})
  };

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
              <IntlCurrencyInput currency="BRL" config={currencyConfig} className="R-000" onChange={this.handleChange}/>
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
              <button type="button" className="botao" onClick={() => this.handleClick(vetor)}>PAGAR</button>
          </div>

        </div>
      </div>
    );
  }
}

export default ModalCartaoCadastrado;
