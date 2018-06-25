import React, { Component } from 'react';
import TopBar from './TopBar';
import ContainerUser from './ContainerUser';

class ConfirmPayment extends Component{

  componentDidMount(){
    const selectedCard = JSON.parse(localStorage.getItem('selectedCard'))

    const data = {
      card_number: selectedCard.cardNumber,
      cvv: selectedCard.cvv,
      value: this.props.valuePayment,
      expiry_date: selectedCard.expirationDate,
      destination_user_id: this.props.contact.id,
    }

    console.log(data)

    function enviar(data){
      (async () => {
        const rawResponse = await fetch('http://careers.picpay.com/tests/mobdev/transaction', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const content = await rawResponse.json();

        console.log(content);
      })();

    }

    enviar(data);
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

          <div className="container-transaction">
            <p className="confirm-transaction">Pagamento Confirmado!</p>
            <div className="item-transaction">
              <p>Transação</p>
              <p>8888888</p>
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
        </div>
      </div>
    )
  }
}

export default ConfirmPayment;
