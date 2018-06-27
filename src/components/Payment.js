import React, { Component } from 'react'
import TopBar from './TopBar';
import ContainerUser from './ContainerUser'
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

class Payment extends Component{

  state = {
    money: '',
    errorMoney: '',
    errorCard: '',
  }

  handleMoney = (event) => {
    this.setState({money: event.target.value});
    this.setState({errorMoney: ''});
  }

  submitPayment = () => {
    if (this.state.money === ''){
      this.setState({errorMoney: 'Digite o valor que deseja pagar.'});
    } else if (localStorage.cardCount === undefined){
      this.setState({errorCard: 'Cadastre um cartão de crédito'});
    }
    else {
      this.props.onConfirmPaymentModal(this.props.contact, this.state.money)
    }
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
              type='tel'
              value={this.state.money}
              onChange={this.handleMoney}
            />
          </div>
          <p className="erro-msg">{this.state.errorMoney}</p>
          <p className="erro-msg">{this.state.errorCard}</p>

          <div className="line-divider"></div>
          {/* se houver, exibe o final do cartão cadastrado */}
          { localStorage.cardCount !== undefined &&
            <div className="box-credit-card" onClick={() => onSelectCardModal(contact)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" className="card-icon">
                  <path fill="#474971" fill-rule="nonzero" d="M9.234 21.049H25.2a.835.835 0 0 0 .592-.24.81.81 0 0 0 .24-.59V6.773a.801.801 0 0 0-.238-.583.832.832 0 0 0-.596-.239H2.8a.835.835 0 0 0-.592.24.81.81 0 0 0-.24.59v13.446a.801.801 0 0 0 .238.583c.156.155.37.241.596.239h6.432zm0 .95H2.806a1.806 1.806 0 0 1-1.286-.519A1.74 1.74 0 0 1 1 20.22V6.786a1.75 1.75 0 0 1 .521-1.265A1.81 1.81 0 0 1 2.802 5h22.392c.482-.004.946.183 1.286.52.34.337.528.794.52 1.26v13.433a1.75 1.75 0 0 1-.521 1.265 1.81 1.81 0 0 1-1.281.522H9.234zM1.484 8.686h25.032v3.21H1.484v-3.21zm2.177 9.764a.48.48 0 0 1-.484-.476.48.48 0 0 1 .484-.475h2.176a.48.48 0 0 1 .484.475.48.48 0 0 1-.484.476H3.661zm4.353 0a.48.48 0 0 1-.484-.476.48.48 0 0 1 .484-.475h7.619a.48.48 0 0 1 .483.475.48.48 0 0 1-.483.476H8.014z"/>
              </svg>
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
