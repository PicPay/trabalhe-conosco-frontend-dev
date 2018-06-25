import React, { Component } from 'react';
import * as ContactsAPI from './utils/ContactsAPI'
import ContactList from './components/ContactList';
import Payment from './components/Payment';
import CardRegistration from './components/CardRegistration';
import CardSelect from './components/CardSelect';
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

  closeModal = () => {
    this.setState(() => ({
      paymentModalOpen: false,
      cardModalOpen: false,
      selectCardModalOpen: false,
    }))
  }

  render() {
    const { paymentModalOpen, cardModalOpen, selectCardModalOpen } = this.state
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


      </div>
    );
  }
}

export default App;
