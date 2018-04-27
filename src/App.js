import React, { Component } from 'react'
import './App.css'
import { UserList } from './view/user-list'
import { PaymentWindow, ConfirmationWindow, CreditCardForm, CreditCardList } from './view/payment'
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      paymentWindowIsOpen: false,
      confirmationWindowIsOpen: false,
      creditCardForm: false,
      creditCardList: false,
      chosenUser: {},
      userList: [],
      cards: [],
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

  closeCreditCardList = () => {
    this.setState({
      creditCardList: false,
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
    const cards = JSON.parse(localStorage.getItem('cards'))
    if (cards) {
      const defaultCard = cards.filter(card => card.default)[0]
      this.setState({
        cards: cards,
        card: defaultCard,
      })
    }
  }

  registerCard = (card) => {
    const existCard = localStorage.getItem('cards')
    const cards = (existCard) ? JSON.parse(existCard) : [{ ...card, default: true }]
    if (existCard) {
      cards.push({ ...card, default: false })
    }
    const defaultCard = cards.filter(card => card.default)[0]
    this.setState({
      cards: cards,
      card: defaultCard,
    })
    localStorage.setItem('cards', JSON.stringify(cards))
    this.closeCreditCardForm()
  }

  editCard = (cards) => {
    const defaultCard = cards.filter(card => card.default)[0]
    this.setState({
      card: defaultCard,
    })
    localStorage.setItem('cards', JSON.stringify(cards))
    this.setState({
      cards: cards,
    })
    this.closeCreditCardList()
  }

  openCreditCardList = () => {
    this.setState({
      creditCardList: true,
      paymentWindowIsOpen: false,
    })
  }

  sendPayment = (userId, value) => {
    const payload = {
      card_number: this.state.card.number,
      cvv: this.state.card.cvv,
      expiry_date: this.state.card.expiry_date,
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
        <CreditCardList editCard={this.editCard} addCard={this.openCreditCardForm} opened={this.state.creditCardList} onClose={this.closeCreditCardList} cards={this.state.cards} />
        <CreditCardForm registerCard={this.registerCard} opened={this.state.creditCardForm} onClose={this.closeCreditCardForm} />
        <ConfirmationWindow togglePaymentWindow={this.togglePaymentWindow} onClose={this.closeConfirmationWindow} opened={this.state.confirmationWindowIsOpen} user={this.state.chosenUser} paymentData={this.recipe}/>
        <PaymentWindow card={this.state.card} editCard={this.openCreditCardList} onPay={this.sendPayment} onClose={this.closePaymentWindow} opened={this.state.paymentWindowIsOpen} user={this.state.chosenUser} openCreditCardList={this.openCreditCardList} addCard={this.openCreditCardForm}/>
        <UserList togglePaymentWindow={this.togglePaymentWindow} paymentWindowIsOpen={this.state.paymentWindowIsOpen} userList={this.state.userList} />
      </div>
    )
  }
}

export default App
