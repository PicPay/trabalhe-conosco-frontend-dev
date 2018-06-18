import React, {Component} from 'react';
import '../css/Container_Usuario.css';


class ContainerUsuario extends Component {

  render() {
    return (
          <div className="containerUsuario">
            <img className="foto" alt="Foto do usuário." src={this.props.sUser.imagem} />
            <div className="conjunto">
              <div className="nome">{this.props.sUser.nome}</div>
              <div className="linha"/>
              <div className="id">id: {this.props.sUser.iden}</div>
              <div className="username">{this.props.sUser.username}</div>
            </div>
          </div>
    );
  }
}

export default ContainerUsuario;
