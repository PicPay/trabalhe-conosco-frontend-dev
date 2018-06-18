import React, {Component} from 'react';
import '../css/Modal_Nenhum_Cartao.css';
import ModalCadastroCartao from './Modal_Cadastro_Cartao';
import ContainerUsuario from './Container_Usuario';
import ModalAviso from './Modal_Aviso';
import RetanguloTitulo from './Retangulo_Titulo';
import ContainerDinheiro from './Container_Dinheiro';

class ModalNenhumCartao extends Component {

  constructor(props){
  super(props);

  this.state={
    isOpenModalCadastroCartao: false,
    isOpenModalAviso: false
    }
  }


//Toggle modais necessários
toggleModalCadastroCartao = () => {
  this.setState({isOpenModalCadastroCartao: !this.state.isOpenModalCadastroCartao});
}

toggleModalAviso = () => {
  this.setState({isOpenModalAviso: !this.state.isOpenModalAviso});
}



  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">

      <ModalCadastroCartao
      show={this.state.isOpenModalCadastroCartao}
      nome={this.props.sUser.nome}
      tModalCartaoCadastrado={this.props.tModalCartaoCadastrado}
      closeParent={this.props.onClose}
      onClose={this.toggleModalCadastroCartao}/>

      <ModalAviso
      show={this.state.isOpenModalAviso}
      aviso={"Nenhum cartão cadastrado. Favor cadastrar um cartão antes de pagar."}
      onClose={this.toggleModalAviso}/>


        <div className="modalNenhumCartao">

          <RetanguloTitulo titulo={"Pagamento para "} subtitulo={this.props.sUser.nome} onClose={this.props.onClose}/>

          <ContainerUsuario sUser={this.props.sUser}/>

          <ContainerDinheiro />

          <div className="containerFlex">
            <div className="divisoria"></div>
          </div>
          <div className="containerFlex">
            <div className="divisoria-2"></div>
          </div>

          <div className="avisoCadastro">
            <img className="alert" alt="Símbolo de alerta." src={require("../img/alert.png")} />
            <div className="msgAviso">Nenhum cartão de crédito cadastrado.
                <div onClick={this.toggleModalCadastroCartao}>Cadastrar agora.</div>
            </div>
          </div>

          <div className="containerFlex">
              <button type="button" className="botao" onClick={this.toggleModalAviso}>PAGAR</button>
          </div>

        </div>
      </div>
    );
  }
}


export default ModalNenhumCartao;
