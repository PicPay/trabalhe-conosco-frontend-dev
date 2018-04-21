import React, { Component } from 'react'
import './App.css'
import { UserList } from './view/user-list'
import { PaymentWindow } from './view/payment'

const userList = [
  {
    id: 1001,
    name: 'Eduardo Santos',
    img: 'https://randomuser.me/api/portraits/men/9.jpg',
    username: '@eduardo.santos',
  },
  {
    id: 1002,
    name: 'Israel Lima',
    img: 'https://randomuser.me/api/portraits/men/6.jpg',
    username: '@israel.lima',
  },
  {
    id: 1003,
    name: 'Joao Santos',
    img: 'https://randomuser.me/api/portraits/men/5.jpg',
    username: '@joao.santos',
  },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentWindowIsOpen: false,
      chosenUser: {},
    }
  }

  togglePaymentWindow = (user) => {
    this.setState({
      paymentWindowIsOpen: !this.state.paymentWindowIsOpen,
      chosenUser: user,
    })
  }

  render() {
    return (
      <div>
        <PaymentWindow onClose={() => this.togglePaymentWindow({})} opened={this.state.paymentWindowIsOpen} user={this.state.chosenUser}/>
        <UserList togglePaymentWindow={this.togglePaymentWindow} paymentWindowIsOpen={this.state.paymentWindowIsOpen} userList={userList} />
      </div>
    )
  }
}

export default App
