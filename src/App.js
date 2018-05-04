import React, { Component } from 'react'
import './App.css'
import { UserList } from './view/user-list'
import { PaymentWindow, ConfirmationWindow, CreditCardForm, CreditCardList } from './view/payment'
import { sendPayment, timestampToDate } from './engine/payment'
import { fetchUsers } from './engine/users'
import { Modal } from './view/generics-components'

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
      navigationPath: ['userList'],
      // paymentWindowIsOpen: false,
      // confirmationWindowIsOpen: false,
      // creditCardForm: false,
      // creditCardList: false,
      chosenUser: {},
      userList: [],
      cardList: [],
      // cards: [],
    }
    // this.recipe = {}
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

  //
  // closePaymentWindow = () => {
  //   this.setState({
  //     modalIsOpen: false,
  //     paymentWindowIsOpen: false,
  //   })
  // }
  //
  // closeConfirmationWindow = () => {
  //   this.setState({
  //     modalIsOpen: false,
  //     confirmationWindowIsOpen: false,
  //   })
  // }
  //
  // openCreditCardForm = () => {
  //   this.setState({
  //     creditCardForm: true,
  //     paymentWindowIsOpen: false,
  //   })
  // }
  //
  // closeCreditCardForm = () => {
  //   this.setState({
  //     creditCardForm: false,
  //     paymentWindowIsOpen: true,
  //   })
  // }
  //
  // closeCreditCardList = () => {
  //   this.setState({
  //     creditCardList: false,
  //     paymentWindowIsOpen: true,
  //   })
  // }
  //
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

  //
  // editCard = (cards) => {
  //   const defaultCard = cards.filter(card => card.default)[0]
  //   this.setState({
  //     card: defaultCard,
  //   })
  //   localStorage.setItem('cards', JSON.stringify(cards))
  //   this.setState({
  //     cards: cards,
  //   })
  //   this.closeCreditCardList()
  // }
  //
  // openCreditCardList = () => {
  //   this.setState({
  //     creditCardList: true,
  //     paymentWindowIsOpen: false,
  //   })
  // }
  //
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
        // this.setState({
        //   paymentWindowIsOpen: !status,
        //   confirmationWindowIsOpen: status,
        //   chosenUser: result.transaction.destination_user,
        // })
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
    const style = (this.state.modalIsOpen) ? { position: 'fixed' } : { position: 'static' }
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
      <div className="App" style={style}>
        { this.state.modalIsOpen && (<Modal onClose={this.backNavigation} title={components[this.state.activeComponent].header} content={components[this.state.activeComponent].content}/>)}
        <UserList togglePaymentWindow={this.togglePaymentWindow} paymentWindowIsOpen={this.state.paymentWindowIsOpen} userList={this.state.userList} />
        {/* <CreditCardList editCard={this.editCard} addCard={this.openCreditCardForm} opened={this.state.creditCardList} onClose={this.closeCreditCardList} cards={this.state.cards} />
        <CreditCardForm registerCard={this.registerCard} opened={this.state.creditCardForm} onClose={this.closeCreditCardForm} />
        <ConfirmationWindow togglePaymentWindow={this.togglePaymentWindow} onClose={this.closeConfirmationWindow} opened={this.state.confirmationWindowIsOpen} user={this.state.chosenUser} paymentData={this.recipe}/>
        <PaymentWindow card={this.state.card} editCard={this.openCreditCardList} onPay={this.sendPayment} onClose={this.closePaymentWindow} opened={this.state.paymentWindowIsOpen} user={this.state.chosenUser} openCreditCardList={this.openCreditCardList} addCard={this.openCreditCardForm}/>
        <UserList togglePaymentWindow={this.togglePaymentWindow} paymentWindowIsOpen={this.state.paymentWindowIsOpen} userList={this.state.userList} />*/}
      </div>
    )
  }
}

export default App
