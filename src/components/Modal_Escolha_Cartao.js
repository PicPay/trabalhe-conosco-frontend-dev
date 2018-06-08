import React, {Component} from 'react';
import '../css/generic.css';
import '../css/Modal_Escolha_Cartao.css';
import ModalCadastroCartao from './Modal_Cadastro_Cartao';

class ModalEscolhaCartao extends Component {
  constructor(props){
      super(props);

      this.state = {
         marcado: false,
         marcado2: false,
         marcado3: false,
         isOpenModalCadastroCartao: false,
      }
  }

toggleModalCadastroCartao = () => {
      this.setState({isOpenModalCadastroCartao: !this.state.isOpenModalCadastroCartao});
  }

handleClick = (vetor) => {
  if(this.state.marcado === true){
    this.props.setCartao(vetor[5]);
  } else if(this.state.marcado2 === true){
    this.props.setCartao(vetor[11]);
  } else if(this.state.marcado3 === true){
    this.props.setCartao(vetor[17]);
  }
  this.props.onClose();
}

//Funções para selecionar/cancelar seleção de cartão
changeMarcado = (vetor5) => {
        if(vetor5 != null){
            if (this.state.marcado === false){
              this.setState({marcado: !this.state.marcado});
              this.setState({marcado2: false});
              this.setState({marcado3: false});
            } else {
              this.setState({marcado: !this.state.marcado})
            }
        }
      }

changeMarcado2 = (vetor11) => {
        if(vetor11 != null){
            if (this.state.marcado2 === false){
              this.setState({marcado: false});
              this.setState({marcado2: !this.state.marcado2});
              this.setState({marcado3: false});
            } else {
              this.setState({marcado2: !this.state.marcado2})
            }
        }
      }

changeMarcado3 = (vetor17) => {
        if(vetor17 != null){
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
    var aux = localStorage.getItem(this.props.nome);
    var vetor = aux.split(',');

    return (
      <div className="backdrop">

      <ModalCadastroCartao
      show={this.state.isOpenModalCadastroCartao}
      nome={this.props.nome}
      pai={"escolha"}
      closeParent={this.props.onClose}
      onClose={this.toggleModalCadastroCartao}/>

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

          <div className={container1} onClick={() => this.changeMarcado(vetor[5])}>
              {vetor[5] != null && <Child />}
              <span className="cartoesCadastrados">{vetor[5]}</span>
              <img src={require("../img/check-mark.png")} alt="Check mark." className="checkMark"/>
          </div>
          <div className={container2} onClick={() => this.changeMarcado2(vetor[11])}>
              {vetor[11] != null && <Child />}
              <span className="cartoesCadastrados">{vetor[11]}</span>
              <img src={require("../img/check-mark.png")} alt="Check mark." className="checkMark"/>
          </div>
          <div className={container3} onClick={() => this.changeMarcado3(vetor[17])}>
              {vetor[17] != null && <Child />}
              <span className="cartoesCadastrados">{vetor[17]}</span>
              <img src={require("../img/check-mark.png")} alt="Check mark." className="checkMark"/>
          </div>
          <div className="separar" />

          <div className="containerEscolha">
              <picture className="plus">
                <source media="(min-width: 768px)" srcSet={require("../img/plus.png")} />
                <img src={require("../img/plus_green.png")} alt="Logo da empresa." />
              </picture>
              <span className="novoCartao" onClick={this.toggleModalCadastroCartao}>Cadastrar novo cartão</span>
          </div>
          <br/><br/>

          <div className="containerFlex">
              <button type="button" className="botao" onClick={() => this.handleClick(vetor)}>SELECIONAR</button>
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
