import React, { Component } from 'react';
import axios from 'axios';
import logoPicPay from './assets/logo.svg'
import './App.css';
import { UserRow } from './components/UserRow';

class App extends Component {

  state = { users: [] }

  componentDidMount = () => {
    axios.get('http://careers.picpay.com/tests/mobdev/users')
      .then(res => {
        const users = res.data
        this.setState({ users })
      })
  }

  renderUser = ({ img, name, id, username }) => (
    <div key={id} className="Row">
      <UserRow img={img} name={name} id={id} username={username} />
    </div>
  )

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Row">
            <div className="App-header-content">
              <img src={logoPicPay} className="App-logo" alt="logo" />
              <div className="App-header-divider" />
              <h1 className="App-title">Front-End Test</h1>
            </div>
          </div>
        </header>
        <div className="App-content-wrap">
          {this.state.users.map(this.renderUser)}
        </div>
      </div>
    );
  }
}

export default App;
