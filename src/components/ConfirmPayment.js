import React, { Component } from 'react';
import * as TransactionAPI from '../utils/TransactionAPI'
import TopBar from './TopBar';
import ContainerUser from './ContainerUser';

class ConfirmPayment extends Component{

  constructor(props){
    super(props);
    this.state = {res:[]};
  }

  componentWillMount(){
    const selectedCard = JSON.parse(localStorage.getItem('selectedCard'))

    const data = {
      card_number: selectedCard.cardNumber,
      cvv: selectedCard.cvv,
      value: this.props.valuePayment,
      expiry_date: selectedCard.expirationDate,
      destination_user_id: this.props.contact.id,
    }

    {/* enviando a requisição do pagamento para fetchAPI */}
    TransactionAPI.sendTransaction(data).then((res) =>{
      this.setState(() => ({
        res: res.transaction
      }))
    })

  }

  render(){
    const { contact } = this.props
    const selectedCard = JSON.parse(localStorage.getItem('selectedCard'))

    return(
      <div className="backdrop">
        <div className="modal-box modal-confirm">
          <TopBar text={"Pagamento para"} name={contact.name} CloseModal={this.props.onCloseModal}/>

          <div className="container-user">
            <ContainerUser contact={contact} />
          </div>

          <div id="spinner" className="spinner">
            <div></div>
          </div>
          <div className="container-transaction" id="container-transaction">
            {this.state.res.success &&
              <p className="confirm-transaction">Pagamento Confirmado!</p>
            }
            {!this.state.res.success &&
              <p className="denied-transaction">Pagamento Negado!</p>
            }
            <div className="item-transaction">
              <p>Transação</p>
              <p>{this.state.res.id}</p>
            </div>
            <div className="item-transaction">
              <p>Data</p>
              <p>8888888</p>
            </div>
            <div className="item-transaction">
              <p>Cartão</p>
              <p>**** **** **** {selectedCard.cardNumber.slice(-4)}</p>
            </div>
            <div className="item-transaction">
              <p>Valor</p>
              <p>{this.props.valuePayment}</p>
            </div>
          </div>

          <div className="container-btn">
            <button className="btn-back" onClick={() => this.props.onPaymentContact(contact)}>Voltar</button>
            <button className="btn-action-user" onClick={() => this.props.onPaymentContact(contact)} >Pagar novamente</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmPayment;
