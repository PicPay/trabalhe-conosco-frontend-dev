import React, {Component} from 'react';
import '../css/Modal_Recibo.css';
import ContainerUsuario from './Container_Usuario';

class ModalRecibo extends Component {
  constructor(props){
    super(props);

    this.state = {
      nTransacao: 1
    }
  }

handleFechar = () => {
  this.setState({nTransacao: this.state.nTransacao+1});
  this.props.onClose();
}


  render() {

    if(!this.props.show) {
      return null;
    }

    const last4 = this.props.card.slice(-4);
    var d = new Date();
    var objetoData = d.getUTCDate()+"/"+(d.getUTCMonth()+1)+"/"+d.getFullYear()+" - "+d.getHours()+":"+d.getMinutes();
    return (
      <div className="backdrop">
        <div className="modalMaior">

          <div className="retanguloTitulo">
            <img src={require("../img/logo_menor.png")} alt="Logo da empresa." className="logo"/>
            <div className="pagamentoParaNome">Pagamento para <div>{this.props.sUser.nome}</div></div>
            <input type="image" src={require('../img/shape-copy.png')} alt="Fechar janela." onClick={this.handleFechar} className="fechar" />
          </div>

          <div className="containerVoltar">
              <img src={require("../img/down_menor.png")} alt="Seta para esquerda, voltar." className="left"/>
              <div className="voltar" onClick={this.handleFechar}>Voltar</div>
          </div>

          <ContainerUsuario   sUser={this.props.sUser}/>

          <div className="pgtoConfirmado">
            <span>Pagamento confirmado!</span>
          </div>

          <div className="centroRecibo">
            <div className="containerCentro">
              <span className="descricao">Transação</span>
              <span className="valor">{this.state.nTransacao}</span>
              <div className="separacao" />

              <span className="descricao">Data</span>
              <span className="valor">{objetoData}</span>
              <div className="separacao" />

              <span className="descricao">Cartão</span>
              <span className="valor">**** **** **** {last4}</span>
              <div className="separacao" />

              <span className="descricao">Valor</span>
              <span className="valor">{this.props.valorPago}</span>
              <div className="separacao" />
            </div>
          </div>

          <div className="botoesRecibo">
              <button type="button" className="botaoVoltar" onClick={this.handleFechar}>VOLTAR</button>
              <button type="button" className="botaoPgNvm" onClick={() => this.setState({nTransacao: this.state.nTransacao+1})} >PAGAR NOVAMENTE</button>
          </div>

        </div>
      </div>
    );
  }
}

export default ModalRecibo;
