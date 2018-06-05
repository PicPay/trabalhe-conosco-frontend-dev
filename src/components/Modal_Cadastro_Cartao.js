import React, {Component} from 'react';
import '../css/Modal_Cadastro_Cartao.css';


class ModalCadastroCartao extends Component {
  constructor(props){
    super(props);

    this.state={
        numero: '',
        isHiddenNome: true,
        isHiddenNumero: true,
        isHiddenValidade: true,
        isHiddenCodigo: true,
        isHiddenCEP: true
      };

    this.handleClick = this.handleClick.bind(this);
    }


  handleClick(){
      this.props.onClose();
  }

//Funções para mostrar/apagar as legendas no cadastro
  toggleHiddenNome () {
      this.setState({isHiddenNome: !this.state.isHiddenNome});
  }
  toggleHiddenNumero () {
      this.setState({isHiddenNumero: !this.state.isHiddenNumero});
  }
  toggleHiddenValidade () {
      this.setState({isHiddenValidade: !this.state.isHiddenValidade});
  }
  toggleHiddenCodigo () {
      this.setState({isHiddenCodigo: !this.state.isHiddenCodigo});
  }
  toggleHiddenCEP () {
      this.setState({isHiddenCEP: !this.state.isHiddenCEP});
  }



  render() {
    if(!this.props.show) {
      return null;
    }

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

          <div className="containerCadastro">
            <select name="cartao" className="Field-Label">
              <option value="Selecione a bandeira" disabled selected hidden>Selecione a bandeira</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Visa">Visa</option>
              <option value="American Express">American Express</option>
              <option value="Elo">Elo</option>
            </select>
            <div className="line"></div>
          </div>

          <div className="containerCadastro">
            {!this.state.isHiddenNome && <ChildNome />}
            <input type="text" className="Field-Label" placeholder="Nome escrito no cartão" onClick={this.toggleHiddenNome.bind(this)} />
            <div className="line"></div>
          </div>

          <div className="containerCadastro">
            {!this.state.isHiddenNumero && <ChildNumero />}
            <input type="text" className="numeroCartao" placeholder="Número do cartão"
             maxLength="16" onClick={this.toggleHiddenNumero.bind(this)}
             onChange={event => this.setState({numero: event.target.value})} />
            <div className="line2"></div>
          </div>

          <div className="containerCadastro">
            {!this.state.isHiddenValidade && <ChildValidade />}
            <input type="text" className="Field-Label" placeholder="Validade(mm/aaaa)" onClick={this.toggleHiddenValidade.bind(this)}/>
            <div className="line"></div>
          </div>

          <div className="containerCadastro">
            {!this.state.isHiddenCodigo && <ChildCodigo />}
            <input type="text" className="Field-Label" placeholder="Código de segurança" maxLength="3" onClick={this.toggleHiddenCodigo.bind(this)}/>
            <div className="line"></div>
          </div>

          <div className="containerCadastro">
            {!this.state.isHiddenCEP && <ChildCEP />}
            <input type="text" className="Field-Label" placeholder="CEP do endereço da fatura" onClick={this.toggleHiddenCEP.bind(this)}/>
            <div className="line"></div>
          </div>

          <div className="containerFlex">
            <button type="button" className="botao" onClick={this.handleClick}>CADASTRAR</button>
          </div>

        </div>
      </div>
    );
  }
}

//Constantes contendo as legendas no cadastro
const ChildNome = () => (
  <div className="labelCadastro">Nome escrito no cartão</div>
)

const ChildNumero = () => (
  <div className="labelCadastro">Número do cartão</div>
)

const ChildValidade = () => (
  <div className="labelCadastro">Validade</div>
)

const ChildCodigo = () => (
  <div className="labelCadastro">Código de segurança</div>
)

const ChildCEP = () => (
  <div className="labelCadastro">CEP</div>
)



export default ModalCadastroCartao;
