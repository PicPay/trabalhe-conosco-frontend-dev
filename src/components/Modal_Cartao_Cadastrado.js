import React, {Component} from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';
import '../css/Modal_Cartao_Cadastrado.css';
import axios from 'axios';
import ModalEscolhaCartao from './Modal_Escolha_Cartao';
import ModalRecibo from './Modal_Recibo';
import ModalAviso from './Modal_Aviso';
import ContainerUsuario from './Container_Usuario';

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
      isOpenModalEscolhaCartao: false,
      isOpenModalRecibo: false,
      isOpenModalAviso: false,
      valorPago: null,
      card: "xxxx",
      cvv: null,
      validade: null,
      sucesso: false
    }
  }

setValores = (card, cvv, validade) => {
  this.setState({card});
  this.setState({cvv});
  this.setState({validade});
}


  toggleModalEscolhaCartao = () => {
      this.setState({isOpenModalEscolhaCartao: !this.state.isOpenModalEscolhaCartao});
      }

  toggleModalRecibo = () => {
      this.setState({isOpenModalRecibo: !this.state.isOpenModalRecibo});
      }

  toggleModalAviso = () => {
      this.setState({isOpenModalAviso: !this.state.isOpenModalAviso});
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

      if(response.data.transaction.success){
        this.toggleModalRecibo();
      }else {
        this.toggleModalAviso();
      }
  }

  handleClickFechar = (vetor) => {
    this.setState({card: "xxxx"});
    this.props.onClose();
  }

//Execução da função transaction ao clicar no botão PAGAR
  handleClickPagar = (vetor) => {
    if(this.state.card === "xxxx"){
      this.transaction(vetor[5], this.state.cvv, this.state.valorPago, this.state.validade, this.props.sUser.iden);
    }else {
      this.transaction(this.state.card, this.state.cvv, this.state.valorPago, this.state.validade, this.props.sUser.iden);
    }
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
    if(this.state.card === "xxxx"){
        var carta = vetor[5].slice(-4);
    } else {
        carta = this.state.card.slice(-4);
    }

    return (
      <div className="backdrop">

      <ModalEscolhaCartao
      show={this.state.isOpenModalEscolhaCartao}
      nome={this.props.sUser.nome}
      setValores={this.setValores}
      onClose={this.toggleModalEscolhaCartao}/>

      <ModalRecibo
      show={this.state.isOpenModalRecibo}
      sUser={this.props.sUser}
      valorPago={this.state.valorPago}
      card={carta}
      onClose={this.toggleModalRecibo}/>

      <ModalAviso
      show={this.state.isOpenModalAviso}
      aviso={"Este cartão não é aceito. Favor utilizar um cartão válido."}
      onClose={this.toggleModalAviso}/>

        <div className="modalNenhumCartao">

          <div className="retanguloTitulo">
            <img src={require("../img/logo_menor.png")} alt="Logo da empresa." className="logo"/>
            <div className="pagamentoParaNome">Pagamento para <div>{this.props.sUser.nome}</div></div>
            <input type="image" src={require('../img/shape-copy.png')} alt="Fechar janela." onClick={this.handleClickFechar} className="fechar" />
          </div>

          <div className="containerVoltar">
              <img src={require("../img/down_menor.png")} alt="Seta para esquerda, voltar." className="left"/>
              <div className="voltar" onClick={this.props.onClose}>Voltar</div>
          </div>

          <ContainerUsuario sUser={this.props.sUser}/>

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
            <div className="formaPagamento" onClick={this.toggleModalEscolhaCartao}>Forma de pagamento:
                <div>Cartão de crédito com final {carta}</div>
            </div>
          </div>

          <div className="containerFlex">
              <button type="button" className="botao" onClick={() => this.handleClickPagar(vetor)}>PAGAR</button>
          </div>

        </div>
      </div>
    );
  }
}

export default ModalCartaoCadastrado;
