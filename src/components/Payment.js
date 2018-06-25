import React, { Component } from 'react'
import TopBar from './TopBar';
import ContainerUser from './ContainerUser'
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

class Payment extends Component{

  submitPayment = () => {
    let valuePayment = document.getElementById("valuePayment").value;
    this.props.onConfirmPaymentModal(this.props.contact, valuePayment)
  }

  render(){
    const { contact, onCardModal, onSelectCardModal } = this.props
    const selectedCard = JSON.parse(localStorage.getItem('selectedCard'))

    return(

      <div className="backdrop">
        <div className="modal-box modal-payment">

          <TopBar text={"Pagamento para "} name={contact.name} CloseModal={this.props.onCloseModal}/>

          <div className="container-user">
            <ContainerUser contact={contact} />
          </div>

          <div className="input-money">
            <NumberFormat
              id="valuePayment"
              customInput={TextField}
              placeholder="R$ 0,00"
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'R$ '}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </div>



          <div className="line-divider"></div>
          {/* se houver, exibe o final do cartão cadastrado */}
          { localStorage.cardCount !== undefined &&
            <div className="box-credit-card" onClick={() => onSelectCardModal(contact)}>
              <img src={require('../images/card-blue.svg')} alt="ícone cartão de crédito" />
              <div>
                <p>Forma de pagamento:</p>
                <p>Cartão de crédito com final {selectedCard.cardNumber.slice(-4)}</p>
              </div>
            </div>
          }

          {/* se não houver cartão cadastrado, exibe o link para cadastrar */}
          { localStorage.cardCount === undefined &&
            <div className="box-credit-card alert-card" onClick={() => onCardModal(contact)}>
              <img src={require('../images/alert.svg')} alt="ícone cartão de crédito" />
              <div>
                <p>Nenhum cartão de crédito cadastrado.</p>
                <p>Cadastrar agora</p>
              </div>
            </div>
          }

          <button className="btn-action-user" onClick={this.submitPayment}>
            Pagar
          </button>


        </div>
      </div>
    )
  }
}

export default Payment;
