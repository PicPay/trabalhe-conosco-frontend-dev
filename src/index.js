import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/generic.css';
import './css/index.css';
import axios from 'axios';
import UsuLista from './components/Usu_Lista';
import ModalNenhumCartao from './components/Modal_Nenhum_Cartao';

class App extends Component{
  constructor(props){
      super(props);

      this.state={
        usuarios: [],
        isOpenModalNenhumCartao: false,
        selectedUser: null
        };

        this.getUsuarios();
      }

  async getUsuarios(){
    const response = await axios.get('http://careers.picpay.com/tests/mobdev/users');
    this.setState({usuarios: response.data});
  }

  toggleModalNenhumCartao = (isOpen) => {
      this.setState({isOpenModalNenhumCartao: !this.state.isOpenModalNenhumCartao});
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
            onUserSelect={selectedUser => this.setState({selectedUser})}
            pessoas={this.state.usuarios}/>

          <ModalNenhumCartao
            sUser={this.state.selectedUser}
            show={this.state.isOpenModalNenhumCartao}
            onClose={this.toggleModalNenhumCartao}/>

        </div>
      )
    }
}

ReactDOM.render(<App />,document.getElementById('root'));
