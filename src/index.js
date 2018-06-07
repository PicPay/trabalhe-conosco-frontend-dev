import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/generic.css';
import './css/index.css';
import axios from 'axios';
import UsuLista from './components/Usu_Lista';
import ModalNenhumCartao from './components/Modal_Nenhum_Cartao';
import ModalCartaoCadastrado from './components/Modal_Cartao_Cadastrado';

class App extends Component{
  constructor(props){
      super(props);

      this.state={
        usuarios: [],
        isOpenModalNenhumCartao: false,
        isOpenModalCartaoCadastrado:false,
        selectedUser: null
        };

        this.getUsuarios();
      }

  async getUsuarios(){
    const response = await axios.get('http://careers.picpay.com/tests/mobdev/users');
    this.setState({usuarios: response.data});
  }

  toggleModalNenhumCartao = () => {
      this.setState({isOpenModalNenhumCartao: !this.state.isOpenModalNenhumCartao});
      }

  toggleModalCartaoCadastrado = () => {
      this.setState({isOpenModalCartaoCadastrado: !this.state.isOpenModalCartaoCadastrado});
      }

    render(){
      return(
        <div>

          <div className="navBar">
            <picture>
              <source media="(min-width: 768px)" srcSet={require("./img/logo_maior.png")} />
              <img src={require("./img/logo_menor.png")} alt="Logo da empresa." />
            </picture>

          </div>

          <UsuLista
            tModalNenhumCartao={this.toggleModalNenhumCartao}
            tModalCartaoCadastrado={this.toggleModalCartaoCadastrado}
            onUserSelect={selectedUser => this.setState({selectedUser})}
            pessoas={this.state.usuarios}/>

          <ModalNenhumCartao
            sUser={this.state.selectedUser}
            show={this.state.isOpenModalNenhumCartao}
            tModalCartaoCadastrado={this.toggleModalCartaoCadastrado}
            onClose={this.toggleModalNenhumCartao}/>

          <ModalCartaoCadastrado
            sUser={this.state.selectedUser}
            show={this.state.isOpenModalCartaoCadastrado}
            onClose={this.toggleModalCartaoCadastrado}></ModalCartaoCadastrado>

        </div>
      )
    }
}

ReactDOM.render(<App />,document.getElementById('root'));
