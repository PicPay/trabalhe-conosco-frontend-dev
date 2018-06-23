import React, { Component } from 'react';
import * as ContactsAPI from './utils/ContactsAPI'
import ContactList from './components/ContactList';
import Payment from './components/Payment';
import CardRegistration from './components/CardRegistration';
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
  }

  openPaymentModal = (contact) => {
    Modal.setAppElement('div')
    this.setState(() => ({
      paymentModalOpen: true,
      contact: contact
    }))
  }

  openCardModal = () => {
    this.setState(() => ({
      paymentModalOpen: false,
      cardModalOpen: true,
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      paymentModalOpen: false,
      cardModalOpen: false,
    }))
  }

  render() {
    const { paymentModalOpen, cardModalOpen } = this.state
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
          />
        </Modal>


        <Modal className='modal' overlayClassName='overlay' isOpen={cardModalOpen}>
            <CardRegistration onCloseModal={this.closeModal}/>
        </Modal>


      </div>
    );
  }
}

export default App;
