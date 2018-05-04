import React, { Component } from 'react'
import './App.css'
import { UserList } from './view/user-list'
import { PaymentWindow, ConfirmationWindow, CreditCardForm, CreditCardList } from './view/payment'
import { sendPayment, timestampToDate } from './engine/payment'
import { fetchUsers } from './engine/users'
import { Modal } from './view/generics-components'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      navigationPath: ['userList'],
      chosenUser: {},
      userList: [],
      cardList: [],
    }
  }

  togglePaymentWindow = (userId) => {
    const activeComponent = 'paymentWindow'
    const navigationPath = [...this.state.navigationPath, activeComponent]
    this.setState({
      chosenUserId: userId,
      activeComponent: activeComponent,
      navigationPath: navigationPath,
    }, this.showModal)
  }

  editCard = () => {
    if (this.state.cardList.length !== 0) {
      this.setState({
        activeComponent: 'creditCardList',
        navigationPath: [...this.state.navigationPath, 'creditCardList'],
      }, this.showModal)
    } else {
      this.setState({
        activeComponent: 'creditCardForm',
        navigationPath: [...this.state.navigationPath, 'creditCardForm'],
      }, this.showModal)
    }
  }

  addCard = () => {
    const activeComponent = 'creditCardForm'
    const navigationPath = [...this.state.navigationPath, activeComponent]
    this.setState({
      activeComponent: activeComponent,
      navigationPath: navigationPath,
    }, this.showModal)
  }

  componentDidMount =  () => {
    fetchUsers()
      .then((result) => {
        this.setState({
          userList: result,
        })
      })
    const cardList = JSON.parse(localStorage.getItem('cardList'))
    if (cardList) {
      this.setState({
        cardList: cardList,
      })
    }
  }

  registerCard = (card) => {
    const newCardList = (this.state.cardList.length !== 0) ? [...this.state.cardList, { ...card, default: false }] : [{ ...card, default: true }]
    localStorage.setItem('cardList', JSON.stringify(newCardList))
    this.setState({
      cardList: newCardList,
    }, this.backNavigation)
  }

  editCardList = (cardList) => {
    localStorage.setItem('cardList', JSON.stringify(cardList))
    this.setState({
      cardList: cardList,
    }, this.backNavigation)
  }

  sendPayment = (userId, value) => {
    const card = this.state.cardList.find(card => card.default)
    const payload = {
      card_number: card.number,
      cvv: card.cvv,
      expiry_date: card.expiry_date,
      value,
      destination_user_id: userId,
    }
    sendPayment('http://careers.picpay.com/tests/mobdev/transaction', payload)
      .then((result) => {
        const status = result.transaction.success
        if (status) {
          const date = timestampToDate(result.transaction.timestamp)
          const year = date.year.toString().substring(2, 4)
          const month = (date.month >= 10) ? date.month : `0${date.month.toString()}`
          const day = (date.day >= 10) ? date.day : `0${date.day.toString()}`
          const hour = (date.hour >= 10) ? date.hour : `0${date.hour.toString()}`
          const minute = (date.minute >= 10) ? date.minute : `0${date.minute.toString()}`
          this.recipe = {
            confirmationMsg: 'Pagamento confirmado!',
            transaction: result.transaction.id,
            date: `${day}/${month}/${year} - ${hour}:${minute}`,
            card: `**** **** **** ${payload.card_number.substring(12)}`,
            value: Number(value).toFixed(2).replace('.', ','),
          }
        }
        const activeComponent = 'confirmationWindow'
        const navigationPath = [...this.state.navigationPath, activeComponent]
        this.setState({
          activeComponent: activeComponent,
          navigationPath: navigationPath,
        }, this.showModal)
      })
  }

  showModal = () => {
    this.setState({
      modalIsOpen: true,
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      navigationPath: ['userList'],
      activeComponent: 'userList',
    })
  }

  backNavigation = () => {
    const activeComponent = this.state.navigationPath.slice(-2)[0]
    const navigationPath = this.state.navigationPath.slice(0, this.state.navigationPath.length - 1)

    if (activeComponent === 'userList') {
      this.closeModal()
      return
    }

    this.setState({
      activeComponent: activeComponent,
      navigationPath: navigationPath,
    })
  }

  render() {
    const className = (this.state.modalIsOpen) ? 'hidden' : 'container'
    const defaultCard = this.state.cardList.find(card => card.default)
    const user = (this.state.userList.find(user => user.id === this.state.chosenUserId))
    const components = {
      paymentWindow: {
        content: <PaymentWindow onPay={this.sendPayment} editCard={this.editCard} user={user} defaultCard={defaultCard} />,
        header: <div><span>Pagamento para </span><span style={{ color: '#7de6c6' }}>{(user) ? user.name : ''}</span></div>,
      },
      creditCardForm: {
        content: <CreditCardForm registerCard={this.registerCard} onClose={this.closeCreditCardForm} />,
        header: 'Cadastro Cartão de Crédito',
      },
      creditCardList: {
        content: <CreditCardList editCardList={this.editCardList} addCard={this.addCard} cards={this.state.cardList} />,
        header: 'Cadastro Cartão de Crédito',
      },
      confirmationWindow: {
        content: <ConfirmationWindow togglePaymentWindow={this.backNavigation} onClose={this.closeModal} user={this.state.userList.find(user => user.id === this.state.chosenUserId)} paymentData={this.recipe}/>,
        header: 'Recibo',
      },
    }
    return (
      <div className="App" >
        <div className="app-header"><span className="picpay-logo">PicPay</span><span className="header-rectangle"></span><span className="app-title">Front-End Test</span></div>
        { this.state.modalIsOpen && (<Modal onClose={this.backNavigation} title={components[this.state.activeComponent].header} content={components[this.state.activeComponent].content}/>)}
        <div className={className}><UserList togglePaymentWindow={this.togglePaymentWindow} paymentWindowIsOpen={this.state.paymentWindowIsOpen} userList={this.state.userList} /></div>
      </div>
    )
  }
}

export default App
