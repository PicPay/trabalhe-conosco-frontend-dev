import React, {Component} from 'react';
import '../css/Modal_Nenhum_Cartao.css';
import IntlCurrencyInput from 'react-intl-currency-input';
import ModalCadastroCartao from './Modal_Cadastro_Cartao';

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
    isOpenModalCadastroCartao: false
    }
  }

  toggleModalCadastroCartao = () => {
      this.setState({isOpenModalCadastroCartao: !this.state.isOpenModalCadastroCartao});
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
      closeParent={this.props.onClose}
      onClose={this.toggleModalCadastroCartao}/>


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
            <img className="alert" alt="Símbolo de alerta." src={require("../img/alert.png")} />
            <div className="msgAviso">Nenhum cartão de crédito cadastrado.
                <div onClick={this.toggleModalCadastroCartao}>Cadastrar agora.</div>
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

export default ModalNenhumCartao;
