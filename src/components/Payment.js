import React, { Component } from 'react'
import TopBar from './TopBar';
import ContainerUser from './ContainerUser'
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

class Payment extends Component{

  render(){
    const { contact, onCardModal, onSelectCardModal } = this.props

    return(

      <div className="backdrop">
        <div className="modal-box modal-payment">

          <TopBar text={"Pagamento para "} name={contact.name} CloseModal={this.props.onCloseModal}/>

          <div className="container-user">
            <ContainerUser contact={contact} />
          </div>

          <div className="input-money">
            <NumberFormat
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

          { localStorage.cardCount !== undefined &&
            <div className="box-credit-card" onClick={() => onSelectCardModal(contact)}>
              <img src={require('../images/card-blue.svg')} alt="logo Picpay" />
              <div>
                <p>Forma de pagamento</p>
                <p>Cartão de crédito com final xxxx</p>
              </div>
            </div>
          }

          { localStorage.cardCount === undefined &&
            <div className="box-credit-card" onClick={() => onCardModal(contact)}>
              <img src={require('../images/card-blue.svg')} alt="logo Picpay" />
              <div>
                <p>Nenhum cartão de crédito cadastrado</p>
                <p>Cadastrar agora</p>
              </div>
            </div>
          }

          <button className="btn-action-user">
            Pagar
          </button>


        </div>
      </div>
    )
  }
}

export default Payment;
