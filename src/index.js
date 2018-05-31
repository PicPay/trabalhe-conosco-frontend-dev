import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import axios from 'axios';
import UsuLista from './components/Usu_Lista';

class App extends Component{
  constructor(props){
      super(props);

      this.state={
        usuarios: [],
        };

        axios.get('http://careers.picpay.com/tests/mobdev/users').then(response => this.setState({usuarios: response.data}));
      }

    render(){
      return(
        <div>

          <div className="navBar">
            <picture>
              <source media="(min-width: 768px)" srcSet={require("./img/logo_maior.png")} />
              <img src={require("./img/logo_menor.png")} alt="Logo da empresa." className="logo"/>
            </picture>

          </div>

          <UsuLista
            pessoas={this.state.usuarios}/>

        </div>
      )
    }
}

ReactDOM.render(<App />,document.getElementById('root'));
