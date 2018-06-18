import React, {Component} from 'react';
import '../css/Modal_Nenhum_Cartao.css';
import IntlCurrencyInput from 'react-intl-currency-input';
import ModalCadastroCartao from './Modal_Cadastro_Cartao';
import ContainerUsuario from './Container_Usuario';
import ModalAviso from './Modal_Aviso';

//Constante para configurar o intl-currency-input
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

class ModalNenhumCartao extends Component {

  constructor(props){
  super(props);

  this.state={
    isOpenModalCadastroCartao: false,
    isOpenModalAviso: false
    }
  }


//Toggle modais necessários
toggleModalCadastroCartao = () => {
  this.setState({isOpenModalCadastroCartao: !this.state.isOpenModalCadastroCartao});
}

toggleModalAviso = () => {
  this.setState({isOpenModalAviso: !this.state.isOpenModalAviso});
}



  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">

      <ModalCadastroCartao
      show={this.state.isOpenModalCadastroCartao}
      nome={this.props.sUser.nome}
      tModalCartaoCadastrado={this.props.tModalCartaoCadastrado}
      closeParent={this.props.onClose}
      onClose={this.toggleModalCadastroCartao}/>

      <ModalAviso
      show={this.state.isOpenModalAviso}
      aviso={"Nenhum cartão cadastrado. Favor cadastrar um cartão antes de pagar."}
      onClose={this.toggleModalAviso}/>


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

          <ContainerUsuario sUser={this.props.sUser}/>

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
            <img className="alert" alt="Símbolo de alerta." src={require("../img/alert.png")} />
            <div className="msgAviso">Nenhum cartão de crédito cadastrado.
                <div onClick={this.toggleModalCadastroCartao}>Cadastrar agora.</div>
            </div>
          </div>

          <div className="containerFlex">
              <button type="button" className="botao" onClick={this.toggleModalAviso}>PAGAR</button>
          </div>

        </div>
      </div>
    );
  }
}

export default ModalNenhumCartao;
