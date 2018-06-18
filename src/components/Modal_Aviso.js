import React, {Component} from 'react';
import '../css/Modal_Aviso.css';
import RetanguloTitulo from './Retangulo_Titulo';

class ModalAviso extends Component {

  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modalAviso">

          <RetanguloTitulo titulo={"Aviso"} onClose={this.props.onClose} />

          <div className="containerAviso">
            <span>{this.props.aviso}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAviso;
