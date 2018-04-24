import React, { Component } from 'react'
import { UserData, Button } from './user-list'
import imgAlertSvg from './img/alert.svg'
import imgAlertPng from './img/alert.png'
import imgAlertPng2x from './img/alert@2x.png'
import imgAlertPng3x from './img/alert@3x.png'
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
        <div className="card">
          <picture>
            <source srcSet={imgAlertSvg} alt=""/>
            <img src={imgAlertPng} srcSet={`${imgAlertPng},${imgAlertPng2x} 2x, ${imgAlertPng3x} 3x`} alt="" />
          </picture>
          <div className="card-msg">
            <span>Nenhum cartão de crédito cadastrado.</span>
            <a href="#" className="card-msg-2">Cadastrar agora.</a>
          </div>
        </div>
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
