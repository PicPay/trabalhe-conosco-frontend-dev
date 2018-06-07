import React, {Component} from 'react';
import '../css/generic.css';
import '../css/Modal_Escolha_Cartao.css';

class ModalEscolhaCartao extends Component {
  constructor(){
      super();

      this.state = {
         marcado: false,
         marcado2: false,
         marcado3: false
      }
  }

//Funções para selecionar/cancelar seleção de cartão
changeMarcado = () => {
        if(this.props.vetorCartao[5] != null){
            if (this.state.marcado === false){
              this.setState({marcado: !this.state.marcado});
              this.setState({marcado2: false});
              this.setState({marcado3: false});
            } else {
              this.setState({marcado: !this.state.marcado})
            }
        }
      }
changeMarcado2 = () => {
        if(this.props.vetorCartao[11] != null){
            if (this.state.marcado2 === false){
              this.setState({marcado: false});
              this.setState({marcado2: !this.state.marcado2});
              this.setState({marcado3: false});
            } else {
              this.setState({marcado2: !this.state.marcado2})
            }
        }
      }
changeMarcado3 = () => {
        if(this.props.vetorCartao[17] != null){
            if (this.state.marcado3 === false){
              this.setState({marcado: false});
              this.setState({marcado2: false});
              this.setState({marcado3: !this.state.marcado3});
            } else {
              this.setState({marcado3: !this.state.marcado3})
            }
        }
      }


render() {
    if(!this.props.show) {
      return null;
    }

    let container1 = this.state.marcado ? "containerMarcado" : "containerEscolha";
    let container2 = this.state.marcado2 ? "containerMarcado" : "containerEscolha";
    let container3 = this.state.marcado3 ? "containerMarcado" : "containerEscolha";

    return (
      <div className="backdrop">
        <div className="modalCadastroCartao">

          <div className="retanguloTitulo">
              <img src={require("../img/logo_menor.png")} alt="Logo da empresa." className="logo"/>
              <div className="pagamentoParaNome">Cadastro Cartão de Crédito</div>
              <input type="image" src={require('../img/shape-copy.png')} alt="Fechar janela." onClick={this.props.onClose} className="fechar" />
          </div>

          <div className="containerVoltar">
              <img src={require("../img/down_menor.png")} alt="Seta para esquerda, voltar." className="left"/>
              <div className="voltar" onClick={this.props.onClose}>Voltar</div>
          </div>

          <div className="containerEscolha">
              <span className="titleCartoes">Cartões Cadastrados</span>
          </div>

          <div className={container1} onClick={this.changeMarcado}>
              {this.props.vetorCartao[5] != null && <Child />}
              <span className="cartoesCadastrados">{this.props.vetorCartao[5]}</span>
              <img src={require("../img/check-mark.png")} alt="Check mark." className="checkMark"/>
          </div>
          <div className={container2} onClick={this.changeMarcado2}>
              {this.props.vetorCartao[11] != null && <Child />}
              <span className="cartoesCadastrados">{this.props.vetorCartao[11]}</span>
              <img src={require("../img/check-mark.png")} alt="Check mark." className="checkMark"/>
          </div>
          <div className={container3} onClick={this.changeMarcado3}>
              {this.props.vetorCartao[17] != null && <Child />}
              <span className="cartoesCadastrados">{this.props.vetorCartao[17]}</span>
              <img src={require("../img/check-mark.png")} alt="Check mark." className="checkMark"/>
          </div>
          <div className="separar" />

          <div className="containerEscolha">
              <picture className="plus">
                <source media="(min-width: 768px)" srcSet={require("../img/plus.png")} />
                <img src={require("../img/plus_green.png")} alt="Logo da empresa." />
              </picture>
              <span className="novoCartao">Cadastrar novo cartão</span>
          </div>
          <br/><br/>

          <div className="containerFlex">
              <button type="button" className="botao" >SELECIONAR</button>
          </div>

        </div>
      </div>
    );
  }
}

//Faz aparecer a imagem do cartão se houver algum cartão
const Child = () => (
  <picture>
    <source media="(min-width: 768px)" srcSet={require("../img/blue.png")} />
    <img src={require("../img/green.png")} alt="Logo da empresa." />
  </picture>
)
export default ModalEscolhaCartao;
