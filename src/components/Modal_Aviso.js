import React, {Component} from 'react';
import '../css/Modal_Aviso.css';

class ModalAviso extends Component {

  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modalAviso">

          <div className="retanguloTitulo">
            <img src={require("../img/logo_menor.png")} alt="Logo da empresa." className="logo"/>
            <div className="pagamentoParaNome">Aviso</div>
            <input type="image" src={require('../img/shape-copy.png')} alt="Fechar janela." onClick={this.props.onClose} className="fechar" />
          </div>

          <div className="containerVoltar">
              <img src={require("../img/down_menor.png")} alt="Seta para esquerda, voltar." className="left"/>
              <div className="voltar" onClick={this.props.onClose}>Voltar</div>
          </div>
          <div className="containerAviso">
            <span>{this.props.aviso}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAviso;
