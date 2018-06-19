import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
              <div>
                <div className="user-avatar" style={{
                  backgroundImage: `url(${contact.img})`}}></div>
                <div className="user-info">
                  <p className="user-title">{contact.name}</p>
                  <div className="user-id">
                    <p>id: {contact.id}</p>
                    <p>{contact.username}</p>
                  </div>
                </div>
              </div>

              <div className="user-pay">
                <span className="add-payment"></span>

                <button onClick={() => onPaymentContact(contact) }>Pagar</button>

              </div>

            </div>
          )}

        </div>
      </div>
    );
  }
}

export default ContactList;
