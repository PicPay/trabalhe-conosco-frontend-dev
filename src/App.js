import React, { Component } from 'react'
import './App.css'
import { UserList } from './view/user-list'
import { PaymentWindow, ConfirmationWindow, CreditCardForm } from './view/payment'
import { sendPayment, timestampToDate } from './engine/payment'
import { fetchUsers } from './engine/users'

// const userList = [
//   {
//     id: 1001,
//     name: 'Eduardo Santos',
//     img: 'https://randomuser.me/api/portraits/men/9.jpg',
//     username: '@eduardo.santos',
//   },
//   {
//     id: 1002,
//     name: 'Israel Lima',
//     img: 'https://randomuser.me/api/portraits/men/6.jpg',
//     username: '@israel.lima',
//   },
//   {
//     id: 1003,
//     name: 'Joao Santos',
//     img: 'https://randomuser.me/api/portraits/men/5.jpg',
//     username: '@joao.santos',
//   },
// ]

const card = {
  card_number: '1111111111111111',
  cvv: 789,
  expiry_date: '01/18',
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      paymentWindowIsOpen: false,
      confirmationWindowIsOpen: false,
      creditCardForm: false,
      chosenUser: {},
      userList: [],
    }
    this.recipe = {}
  }

  togglePaymentWindow = (user) => {
    this.setState({
      paymentWindowIsOpen: !this.state.paymentWindowIsOpen,
      modalIsOpen: true,
      confirmationWindowIsOpen: false,
      chosenUser: user,
    })
  }

  closePaymentWindow = () => {
    this.setState({
      modalIsOpen: false,
      paymentWindowIsOpen: false,
    })
  }

  closeConfirmationWindow = () => {
    this.setState({
      modalIsOpen: false,
      confirmationWindowIsOpen: false,
    })
  }

  openCreditCardForm = () => {
    this.setState({
      creditCardForm: true,
      paymentWindowIsOpen: false,
    })
  }

  closeCreditCardForm = () => {
    this.setState({
      creditCardForm: false,
      paymentWindowIsOpen: true,
    })
  }

  componentDidMount =  () => {
    fetchUsers()
      .then((result) => {
        this.setState({
          userList: result,
        })
      })
  }

  sendPayment = (userId, value) => {
    const payload = {
      ...card,
      value,
      destination_user_id: userId,
    }
    sendPayment('http://careers.picpay.com/tests/mobdev/transaction', payload)
      .then((result) => {
        const status = result.transaction.success
        if (status) {
          const date = timestampToDate(result.transaction.timestamp)
          this.recipe = {
            confirmationMsg: 'Pagamento Confirmado!',
            transaction: result.transaction.id,
            date: `${date.day}/${date.month}/${date.year}`,
            card: `**** **** **** ${payload.card_number.substring(12)}`,
            value: value,
          }
        }
        this.setState({
          paymentWindowIsOpen: !status,
          confirmationWindowIsOpen: status,
          chosenUser: result.transaction.destination_user,
        })
      })
  }

  render() {
    const style = (this.state.modalIsOpen) ? { position: 'fixed' } : { position: 'static' }
    return (
      <div style={style}>
        <CreditCardForm opened={this.state.creditCardForm} onClose={this.closeCreditCardForm} />
        <ConfirmationWindow togglePaymentWindow={this.togglePaymentWindow} onClose={this.closeConfirmationWindow} opened={this.state.confirmationWindowIsOpen} user={this.state.chosenUser} paymentData={this.recipe}/>
        <PaymentWindow onPay={this.sendPayment} onClose={this.closePaymentWindow} opened={this.state.paymentWindowIsOpen} user={this.state.chosenUser} addCard={this.openCreditCardForm}/>
        <UserList togglePaymentWindow={this.togglePaymentWindow} paymentWindowIsOpen={this.state.paymentWindowIsOpen} userList={this.state.userList} />
      </div>
    )
  }
}

export default App
