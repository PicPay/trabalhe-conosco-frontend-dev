import React, {Component} from 'react';
import '../css/Retangulo_Titulo.css';

class RetanguloTitulo extends Component {

  render() {
    return (
        <div>
          <div className="retanguloTitulo">
            <img src={require("../img/logo_menor.png")} alt="Logo da empresa." className="logo"/>
            <div className="pagamentoParaNome">{this.props.titulo}<div>{this.props.subtitulo}</div></div>
            <input type="image" src={require('../img/shape-copy.png')} alt="Fechar janela." onClick={this.props.onClose} className="fechar" />
          </div>
          <div className="containerVoltar">
              <img src={require("../img/down_menor.png")} alt="Seta para esquerda, voltar." className="left"/>
              <div className="voltar" onClick={this.props.onClose}>Voltar</div>
          </div>
        </div>
      );
  }
}

export default RetanguloTitulo;
