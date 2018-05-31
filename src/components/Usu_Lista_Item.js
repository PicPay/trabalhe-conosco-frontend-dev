import React, {Component} from 'react';
import '../css/index.css';

class UsuListaItem extends Component{


render(){
  return(
    <div>
      <div className="itemLista">

        <div className="sep">
        </div>

        <div className="usuLista">
            <img className="foto" alt="Foto do usuário." src={this.props.imagem} />

            <div className="conjunto">
                <div className="nome">{this.props.nome}</div>
                <div className="linha">
                    <div className="id">id: {this.props.iden}</div>
                    <div className="username">{this.props.username}</div>
                </div>
            </div>

            <div className="botoesPagamento">
              <picture>
                <source media="(min-width: 768px)" srcSet={require("../img/cifrao_maior.png")} />
                <img src={require("../img/cifrao_menor.png")} alt="Símbolo de pagamento." className="cifrao"/>
              </picture>
              <div className="pagar">PAGAR</div>
              <picture>
                <source media="(min-width: 768px)" srcSet={require("../img/down_maior.png")} />
                <img src={require("../img/down_menor.png")} alt="Seta para direita, pagamento." className="down"/>
              </picture>
            </div>
        </div>
        
        <div className="sep">
        </div>

      </div>
    </div>
  );
}
}

export default UsuListaItem;
