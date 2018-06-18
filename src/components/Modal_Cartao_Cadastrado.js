import React, {Component} from 'react';
import '../css/Modal_Cartao_Cadastrado.css';
import axios from 'axios';
import ModalEscolhaCartao from './Modal_Escolha_Cartao';
import ModalRecibo from './Modal_Recibo';
import ContainerUsuario from './Container_Usuario';
import RetanguloTitulo from './Retangulo_Titulo';
import ContainerDinheiro from './Container_Dinheiro';

class ModalCartaoCadastrado extends Component {

  constructor(props){
    super(props);

    this.state={
      isOpenModalEscolhaCartao: false,
      isOpenModalRecibo: false,
      valorPago: "R$ 0,00",
      card: "xxxx",
      cvv: null,
      validade: null,
      sucesso: false,
      mensagem: ''
    }
  }


setValores = (card, cvv, validade) => {
  this.setState({card});
  this.setState({cvv});
  this.setState({validade});
}

//Toggle modais
toggleModalEscolhaCartao = () => {
  this.setState({isOpenModalEscolhaCartao: !this.state.isOpenModalEscolhaCartao});
}

toggleModalRecibo = () => {
  this.setState({isOpenModalRecibo: !this.state.isOpenModalRecibo});
}


//Função para fazer a requisição POST da transação
  async transaction(card, cvv, value, validade, id){
    var array = card.split(" ");
    var aux = array.join('');

    const response = await axios.post('http://careers.picpay.com/tests/mobdev/transaction', {
      "card_number": aux,
      "cvv": cvv,
      "value": value,
      "expiry_date": validade,
      "destination_user_id":id
      });

      if(response.data.transaction.success){
        this.setState({mensagem: "Pagamento confirmado!"});
        this.toggleModalRecibo();
      }else {
        this.setState({mensagem: "Pagamento negado! Cartão Inválido."});
        this.toggleModalRecibo();
      }
  }

//Lida com o fechamento, faz os acertos necessários nos valores dos states
  handleClickFechar = () => {
    this.setState({card: "xxxx"});
    this.setState({valorPago: "R$ 0,00"});
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
        var carta = vetor[5];
    } else {
        carta = this.state.card;
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
      cvv={this.state.cvv}
      mensagem={this.state.mensagem}
      validade={this.state.validade}
      nTransacao={this.props.nTransacao}
      addTransaction={this.props.addTransaction}
      onClose={this.toggleModalRecibo}/>

        <div className="modalNenhumCartao">

          <RetanguloTitulo titulo={"Pagamento para "} subtitulo={this.props.sUser.nome} onClose={this.handleClickFechar}/>

          <ContainerUsuario sUser={this.props.sUser}/>

          <ContainerDinheiro handleChange={this.handleChange} />

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
                <div>Cartão de crédito com final {carta.slice(-4)}</div>
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
