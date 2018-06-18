import React, {Component} from 'react';
import '../css/Modal_Cadastro_Cartao.css';
import RetanguloTitulo from './Retangulo_Titulo';

class ModalCadastroCartao extends Component {
  constructor(props){
    super(props);

    this.state={
        bandeira: null,
        nomeC: null,
        validade: null,
        codigo: null,
        CEP: null,
        numero: '',
        isHiddenNome: true,
        isHiddenNumero: true,
        isHiddenValidade: true,
        isHiddenCodigo: true,
        isHiddenCEP: true,
      };
  }

/*Função para lidar com o clique no botão "Cadastrar"
Analisa se o modal foi aberto por escolha cartão ou nenhum cartão e faz as devidas ações*/

  handleClick = () => {
      if (this.props.pai==="escolha"){
        this.armazenaCartao();
        this.props.onClose();
      } else {
        this.armazenaCartao();
        this.props.closeParent();
        this.props.onClose();
        this.props.tModalCartaoCadastrado();
    }
  }


//Função para armazenar os dados de cartões cadastrados nas variáveis locais(cookies), máximo de 3 cartões
  armazenaCartao = () => {
    if (localStorage.getItem(this.props.nome) === null) {
        localStorage.setItem(this.props.nome, this.state.bandeira+','+this.state.nomeC+','+this.state.validade+','+
        this.state.codigo+','+this.state.CEP+','+this.state.numero+',');
    } else {
      var teste = localStorage.getItem(this.props.nome);
      var array = teste.split(',');
      if(array.length > 6 && array.length < 11){
          array.splice(6,1);
          var aux = this.state.bandeira+','+this.state.nomeC+','+this.state.validade+','+
          this.state.codigo+','+this.state.CEP+','+this.state.numero+',';
          array.push(aux);
          localStorage.setItem(this.props.nome, array);
      } else if(array.length > 11 && array.length < 17){
          array.splice(12,1);
          aux = this.state.bandeira+','+this.state.nomeC+','+this.state.validade+','+
          this.state.codigo+','+this.state.CEP+','+this.state.numero;
          array.push(aux);
          localStorage.setItem(this.props.nome, array);
      }
    }
  }

//Ao fechar o modal, esconde novamente as legendas no cadastro
handleFechar = () => {
  this.setState({isHiddenCodigo: true});
  this.setState({isHiddenNumero: true});
  this.setState({isHiddenNome: true});
  this.setState({isHiddenCEP: true});
  this.setState({isHiddenValidade: true});
  this.props.onClose();
}

//Funções para mostrar/apagar as legendas no cadastro
  toggleHiddenNome = () => {
      this.setState({isHiddenNome: !this.state.isHiddenNome});
  }
  toggleHiddenNumero = () => {
      this.setState({isHiddenNumero: !this.state.isHiddenNumero});
  }
  toggleHiddenValidade = () => {
      this.setState({isHiddenValidade: !this.state.isHiddenValidade});
  }
  toggleHiddenCodigo = () => {
      this.setState({isHiddenCodigo: !this.state.isHiddenCodigo});
  }
  toggleHiddenCEP = () => {
      this.setState({isHiddenCEP: !this.state.isHiddenCEP});
  }


  render() {
    if(!this.props.show) {
      return null;
    }

    let containerNome = this.state.isHiddenNome ? "containerCadastro" : "containerCadastro2";
    let containerNumero = this.state.isHiddenNumero ? "containerCadastro" : "containerCadastro2";
    let containerValidade = this.state.isHiddenValidade ? "containerCadastro" : "containerCadastro2";
    let containerCodigo = this.state.isHiddenCodigo ? "containerCadastro" : "containerCadastro2";
    let containerCEP = this.state.isHiddenCEP ? "containerCadastro" : "containerCadastro2";

    return (
      <div className="backdrop">

        <div className="modalCadastroCartao">

          <RetanguloTitulo titulo={"Cadastro Cartão de Crédito"} onClose={this.handleFechar} />

          <div className="containerCadastro">
            <select name="cartao" className="Field-Label" onChange={event => this.setState({bandeira: event.target.value})}>
              <option value="Selecione a bandeira" disabled selected hidden>Selecione a bandeira</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Visa">Visa</option>
              <option value="American Express">American Express</option>
              <option value="Elo">Elo</option>
            </select>
            <div className="line"></div>
          </div>

          <div className={containerNome}>
            {!this.state.isHiddenNome && <ChildNome />}
            <input type="text" className="Field-Label" placeholder="Nome escrito no cartão"
            onChange={event => this.setState({nomeC: event.target.value})} onClick={this.toggleHiddenNome} />
            <div className="line"></div>
          </div>

          <div className={containerNumero}>
            {!this.state.isHiddenNumero && <ChildNumero />}
            <input type="text" className="numeroCartao" placeholder="Número do cartão" onClick={this.toggleHiddenNumero}
             onChange={event => this.setState({numero: event.target.value})} />
            <div className="line2"></div>
          </div>

          <div className={containerValidade}>
            {!this.state.isHiddenValidade && <ChildValidade />}
            <input type="text" className="Field-Label" placeholder="Validade(mm/aaaa)"
            onChange={event => this.setState({validade: event.target.value})} onClick={this.toggleHiddenValidade}/>
            <div className="line"></div>
          </div>

          <div className={containerCodigo}>
            {!this.state.isHiddenCodigo && <ChildCodigo />}
            <input type="text" className="Field-Label" placeholder="Código de segurança" maxLength="3"
            onChange={event => this.setState({codigo: event.target.value})} onClick={this.toggleHiddenCodigo}/>
            <div className="line"></div>
          </div>

          <div className={containerCEP}>
            {!this.state.isHiddenCEP && <ChildCEP />}
            <input type="text" className="Field-Label" placeholder="CEP do endereço da fatura"
            onChange={event => this.setState({CEP: event.target.value})} onClick={this.toggleHiddenCEP}/>
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
