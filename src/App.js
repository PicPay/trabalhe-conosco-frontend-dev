import React, { Component } from 'react';
import * as ContactsAPI from './utils/ContactsAPI'
import ContactList from './components/ContactList';
import Payment from './components/Payment';
import CardRegistration from './components/CardRegistration';
import CardSelect from './components/CardSelect';
import ConfirmPayment from './components/ConfirmPayment';
import Modal from 'react-modal';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {contacts:[]};
  }

  componentDidMount(){
    ContactsAPI.getAll().then((contacts) =>{
      this.setState({contacts})
    })
  }

  state = {
    paymentModalOpen: false,
    cardModalOpen: false,
    selectCardModalOpen: false,
    confirmPaymentModalOpen: false
  }

  openPaymentModal = (contact) => {
    Modal.setAppElement('div')
    this.setState(() => ({
      paymentModalOpen: true,
      cardModalOpen: false,
      selectCardModalOpen: false,
      contact: contact
    }))
  }

  openCardModal = (contact) => {
    this.setState(() => ({
      paymentModalOpen: false,
      cardModalOpen: true,
      selectCardModalOpen: false,
      contact: contact
    }))
  }

  openSelectCardModal = (contact) => {
    this.setState(() => ({
      paymentModalOpen: false,
      cardModalOpen: false,
      selectCardModalOpen: true,
      contact: contact
    }))
  }

  openConfirmPaymentModal = (contact, valuePayment) => {
    this.setState(() => ({
      paymentModalOpen: false,
      cardModalOpen: false,
      selectCardModalOpen: false,
      confirmPaymentModalOpen: true,
      contact: contact,
      valuePayment: valuePayment,
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      paymentModalOpen: false,
      cardModalOpen: false,
      selectCardModalOpen: false,
      confirmPaymentModalOpen: false,
    }))
  }

  render() {
    const { paymentModalOpen, cardModalOpen, selectCardModalOpen, confirmPaymentModalOpen, valuePayment } = this.state
    return (
      <div>
        <ContactList
          contacts={this.state.contacts}
          onPaymentContact={this.openPaymentModal}
        />

        <Modal className='modal' overlayClassName='overlay' isOpen={paymentModalOpen}>
          <Payment
            contact={this.state.contact}
            onCloseModal={this.closeModal}
            onCardModal={this.openCardModal}
            onSelectCardModal={this.openSelectCardModal}
            onConfirmPaymentModal={this.openConfirmPaymentModal}
          />
        </Modal>

        <Modal className='modal' overlayClassName='overlay' isOpen={cardModalOpen}>
            <CardRegistration
              contact={this.state.contact}
              onCloseModal={this.closeModal}
              onCardModal={this.openCardModal}
              onSelectCardModal={this.openSelectCardModal}
              onPaymentContact={this.openPaymentModal}
            />
        </Modal>

        <Modal className='modal' overlayClassName='overlay' isOpen={selectCardModalOpen}>
            <CardSelect
              contact={this.state.contact}
              onCloseModal={this.closeModal}
              onCardModal={this.openCardModal}
              onSelectCardModal={this.openSelectCardModal}
              onPaymentContact={this.openPaymentModal}
            />
        </Modal>

        <Modal className='modal' overlayClassName='overlay' isOpen={confirmPaymentModalOpen}>
            <ConfirmPayment
              contact={this.state.contact}
              onCloseModal={this.closeModal}
              onCardModal={this.openCardModal}
              onSelectCardModal={this.openSelectCardModal}
              onPaymentContact={this.openPaymentModal}
              onConfirmPaymentModal={this.openConfirmPaymentModal}
              valuePayment={valuePayment}
            />
        </Modal>


      </div>
    );
  }
}

export default App;
