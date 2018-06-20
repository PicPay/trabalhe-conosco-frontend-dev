import React, { Component } from 'react'
import TopBar from './TopBar';
import ContainerUser from './ContainerUser'
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

class Payment extends Component{

  render(){
    const { contact } = this.props

    return(

      <div className="backdrop">
        <div className="modal-box">

          <TopBar name={contact.name} CloseModal={this.props.onCloseModal}/>

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
              decimalScale={'2'}
              fixedDecimalScale={true}
            />
          </div>

          <div className="line-divider"></div>

          <div className="box-credit-card">
            <img src={require('../images/card-blue.svg')} alt="logo Picpay" />
            <div>
              <p>Forma de pagamento</p>
              <p>Cartão de crédito com final xxxx</p>
            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default Payment;
