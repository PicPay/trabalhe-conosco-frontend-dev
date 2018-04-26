import React, { Component } from 'react'
import { UserData, Button } from './user-list'
import imgAlertSvg from './img/alert.svg'
import imgAlertPng from './img/alert.png'
import imgAlertPng2x from './img/alert@2x.png'
import imgAlertPng3x from './img/alert@3x.png'
import imgGreenSvg from './img/green.svg'
import imgGreenPng from './img/green.png'
import imgGreenPng2x from './img/green@2x.png'
import imgGreenPng3x from './img/green@3x.png'
import './payment.css'

export class PaymentWindow extends Component  {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    const style = { display: (this.props.opened) ? null : 'none' }
    const buttonContent = <div><span className="button-icon">&lsaquo;</span><span>Voltar</span></div>
    return (
      <div className="payment-window" style={style}>
        <span className="back-button">
          <Button onClick={this.props.onClose} content={buttonContent}/>
        </span>
        <UserData {...this.props.user} />
        <input type="text" className="payment-value" value={this.state.value} onChange={this.handleChange} placeholder="R$ 0,00" />
        <span className="rectangle-1"></span>
        <span className="rectangle-2"></span>
        {(this.props.card) ? (
          <div className="card">
            <picture>
              <source srcSet={imgGreenSvg} alt=""/>
              <img src={imgGreenPng} srcSet={`${imgGreenPng},${imgGreenPng2x} 2x, ${imgGreenPng3x} 3x`} alt="" />
            </picture>
            <div className="card-msg">
              <span>Forma de pagamento:</span>
              <a href="#" className="card-msg-2" onClick={this.props.addCard} >
                Cartão de crédito com final {this.props.card.number.substring(12)}
              </a>
            </div></div>
        ) : (
          <div className="no-card">
            <picture>
              <source srcSet={imgAlertSvg} alt=""/>
              <img src={imgAlertPng} srcSet={`${imgAlertPng},${imgAlertPng2x} 2x, ${imgAlertPng3x} 3x`} alt="" />
            </picture>
            <div className="no-card-msg">
              <span>Nenhum cartão de crédito cadastrado.</span>
              <a href="#" className="no-card-msg-2" onClick={this.props.addCard} >Cadastrar agora.</a>
            </div></div>
        )}
        <span className="pay-button">
          <Button onClick={() => { this.props.onPay(this.props.user.id, this.state.value) }} content="PAGAR"/>
        </span>
      </div>
    )
  }
}

export const PaymentConfirmation = ({
  confirmationMsg,
  transaction,
  date,
  card,
  value,
}) => {
  return (
    <div className="payment-confirmation">
      <span className="confirmation-msg">{confirmationMsg}</span>
      <div className="recipe">
        <div className="recipe-row"><span className="recipe-label">Transação</span><span className="recipe-data">{transaction}</span></div>
        <div className="rectangle-2"></div>
        <div className="recipe-row"><span className="recipe-label">Data</span><span className="recipe-data">{date}</span></div>
        <div className="rectangle-2"></div>
        <div className="recipe-row"><span className="recipe-label">Cartão</span><span className="recipe-data">{card}</span></div>
        <div className="rectangle-2"></div>
        <div className="recipe-row"><span className="recipe-label">Valor</span><span className="recipe-data">{value}</span></div>
        <div className="rectangle-2"></div>
      </div>

    </div>
  )
}

export const ConfirmationWindow = (props) =>  {
  const style = { display: (props.opened) ? null : 'none' }
  const buttonContent = <div><span className="button-icon">&lsaquo;</span><span>Voltar</span></div>
  return (
    <div className="confirmation-window" style={style}>
      <span className="back-button">
        <Button onClick={props.onClose} content={buttonContent}/>
      </span>
      <UserData {...props.user} />
      <PaymentConfirmation {...props.paymentData} />
      <div className="recipe-buttons">
        <span className="back-button-2"><Button onClick={props.onClose} content="VOLTAR"/></span>
        <Button onClick={() => props.togglePaymentWindow(props.user)} content="PAGAR NOVAMENTE"/>
      </div>
    </div>
  )
}

export class CreditCardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSelected: Array(5).fill(0),
      card: {},
    }
    this.className = ['rectangle-1', 'rectangle-2']
  }

  handleClick(id) {
    const inputSelected = this.state.inputSelected.slice()
    inputSelected.fill(0)
    inputSelected[id] = 1
    this.setState({
      inputSelected: inputSelected,
    })
  }

  handleInputChange = (event) => {
    const target = event.target
    const value =  target.value
    const name = target.name
    const card = this.state.card
    card[name] = value
    this.setState({
      card: card,
    })
  }

  render() {
    const style = { display: (this.props.opened) ? null : 'none' }
    const buttonContent = <div><span className="button-icon">&lsaquo;</span><span>Voltar</span></div>
    return (
      <div className="credit-card-form" style={style}>
        <span className="back-button">
          <Button onClick={this.props.onClose} content={buttonContent}/>
        </span>
        <select name="flag" onChange={this.handleInputChange} required>
          <option value="" disabled selected>Selecione a bandeira</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Visa">Visa</option>
        </select>
        <div className="rectangle-1"></div>
        <span className="label" style={(this.state.inputSelected[0]) ? {} : { display: 'none' } }>Nome escrito no cartão</span>
        <input type="text" name="name" placeholder="Nome escrito no cartão" onClick={() => this.handleClick(0)} onChange={this.handleInputChange} />
        <div className={(this.state.inputSelected[0]) ? this.className[1] : this.className[0]}></div>
        <span className="label" style={(this.state.inputSelected[1]) ? {} : { display: 'none' } }>Número do cartão</span>
        <input type="text" name="number" placeholder="Número do cartão" onClick={() => this.handleClick(1)} onChange={this.handleInputChange} />
        <div className={(this.state.inputSelected[1]) ? this.className[1] : this.className[0]}></div>
        <span className="label" style={(this.state.inputSelected[2]) ? {} : { display: 'none' } }>Validade (mm/aaaa)</span>
        <input type="text" name="expiryDate" placeholder="Validade (mm/aaaa)" onClick={() => this.handleClick(2)} onChange={this.handleInputChange} />
        <div className={(this.state.inputSelected[2]) ? this.className[1] : this.className[0]}></div>
        <span className="label" style={(this.state.inputSelected[3]) ? {} : { display: 'none' } }>Código de segurança</span>
        <input type="text" name="cvv" placeholder="Código de segurança" onClick={() => this.handleClick(3)} onChange={this.handleInputChange} />
        <div className={(this.state.inputSelected[3]) ? this.className[1] : this.className[0]}></div>
        <span className="label" style={(this.state.inputSelected[4]) ? {} : { display: 'none' } }>CEP do endereço da fatura</span>
        <input type="text" name="cep" placeholder="CEP do endereço da fatura" onClick={() => this.handleClick(4)} onChange={this.handleInputChange} />
        <div className={(this.state.inputSelected[4]) ? this.className[1] : this.className[0]}></div>
        <span className="register-button">
          <Button onClick={() => this.props.registerCard(this.state.card)} content="CADASTRAR"/>
        </span>
      </div>
    )
  }
}
