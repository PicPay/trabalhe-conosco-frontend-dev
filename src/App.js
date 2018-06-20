import React, { Component } from 'react';
import * as ContactsAPI from './utils/ContactsAPI'
import ContactList from'./components/ContactList';
import Payment from'./components/Payment';
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
  }

  openPaymentModal = (contact) => {
    Modal.setAppElement('div')
    this.setState(() => ({
      paymentModalOpen: true,
      contact: contact
    }))
  }

  closePaymentModal = () => {
    this.setState(() => ({
      paymentModalOpen: false,
    }))
  }

  render() {
    const { paymentModalOpen } = this.state
    return (
      <div>
        <ContactList
          contacts={this.state.contacts}
          onPaymentContact={this.openPaymentModal}
        />

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={paymentModalOpen}
          onRequestClose={this.closePaymentModal}
          contentLabel='Modal'
        >
          <Payment
            contact={this.state.contact}
            onCloseModal={this.closePaymentModal}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
