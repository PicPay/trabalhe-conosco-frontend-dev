import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContainerUser from './ContainerUser'


class ContactList extends Component{

  static propTypes = {
    contacts: PropTypes.array.isRequired
  }

  render(){
    const { contacts, onPaymentContact } = this.props

    return(
      <div>
        <div className="top-header">
          <div className="wrap">
            <div className="line-divider"></div>
            <p className="title-text">Front-End Test</p>
          </div>
        </div>

        <div className="wrap">
          {contacts.map(contact =>
            <div className="user-box" key={contact.id}>

              <ContainerUser contact={contact} />

              <div className="user-pay">
                <span className="add-payment"></span>
                <button className="btn-select-contact" onClick={() => onPaymentContact(contact) }>Pagar<div className="icon-arrow"></div></button>
              </div>

            </div>
          )}

        </div>
      </div>
    );
  }
}

export default ContactList;
