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
      lastPage: 'userList',
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
    this.setState({
      chosenUserId: userId,
      activeComponent: 'paymentWindow',
      lastPage: 'userList',
    }, this.showModal)
  }

  editCard = () => {
    if (this.state.cardList.length !== 0) {
      this.setState({
        lastPage: 'paymentWindow',
        activeComponent: 'creditCardList',
      }, this.showModal)
    } else {
      this.setState({
        lastPage: 'paymentWindow',
        activeComponent: 'creditCardForm',
      }, this.showModal)
    }
  }

  addCard = () => {
    this.setState({
      lastPage: 'creditCardList',
      activeComponent: 'creditCardForm',
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
    }, this.closeModal)
  }

  editCardList = (cardList) => {
    localStorage.setItem('cardList', JSON.stringify(cardList))
    this.setState({
      cardList: cardList,
    }, this.closeModal)
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
  // sendPayment = (userId, value) => {
  //   const payload = {
  //     card_number: this.state.card.number,
  //     cvv: this.state.card.cvv,
  //     expiry_date: this.state.card.expiry_date,
  //     value,
  //     destination_user_id: userId,
  //   }
  //   sendPayment('http://careers.picpay.com/tests/mobdev/transaction', payload)
  //     .then((result) => {
  //       const status = result.transaction.success
  //       if (status) {
  //         const date = timestampToDate(result.transaction.timestamp)
  //         this.recipe = {
  //           confirmationMsg: 'Pagamento Confirmado!',
  //           transaction: result.transaction.id,
  //           date: `${date.day}/${date.month}/${date.year}`,
  //           card: `**** **** **** ${payload.card_number.substring(12)}`,
  //           value: value,
  //         }
  //       }
  //       this.setState({
  //         paymentWindowIsOpen: !status,
  //         confirmationWindowIsOpen: status,
  //         chosenUser: result.transaction.destination_user,
  //       })
  //     })
  // }

  showModal = () => {
    this.setState({
      modalIsOpen: true,
    })
  }

  closeModal = () => {
    if (this.state.lastPage === 'userList' || this.state.lastPage === this.state.activeComponent) {
      this.setState({
        activeComponent: 'userList',
        modalIsOpen: false,
      })
    } else {
      this.setState({
        activeComponent: this.state.lastPage,
      })
    }
  }

  render() {
    const style = (this.state.modalIsOpen) ? { position: 'fixed' } : { position: 'static' }
    const defaultCard = this.state.cardList.find(card => card.default)
    const components = {
      paymentWindow: <PaymentWindow editCard={this.editCard} user={this.state.userList.find(user => user.id === this.state.chosenUserId)} defaultCard={defaultCard} />,
      creditCardForm: <CreditCardForm registerCard={this.registerCard} onClose={this.closeCreditCardForm} />,
      creditCardList: <CreditCardList editCardList={this.editCardList} addCard={this.addCard} cards={this.state.cardList} />,
    }
    return (
      <div className="App" style={style}>
        { this.state.modalIsOpen && (<Modal onClose={this.closeModal} content={components[this.state.activeComponent]}/>)}
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
