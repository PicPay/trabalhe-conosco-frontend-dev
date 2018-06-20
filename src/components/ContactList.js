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
            <img src={require('../images/logo-picpay.svg')} alt="logo Picpay" />
          </div>
        </div>

        <div className="wrap">
          {contacts.map(contact =>
            <div className="user-box" key={contact.id}>

              <ContainerUser contact={contact} />

              <div className="user-pay">

                <button className="btn-select-contact" onClick={() => onPaymentContact(contact) }>
                  <img className="icon-dollar" src={require('../images/pagar.svg')} alt="Ícone Cifrão" />
                  <span>Pagar</span>
                  <img className="icon-arrow" src={require('../images/down.svg')} alt="Ícone Seta" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    );
  }
}

export default ContactList;
