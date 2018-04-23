import React, { Component } from 'react'
import { UserData, Button } from './user-list'
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
    return (
      <div className="payment-window" style={style}>
        <span className="back-button">
          <Button onClick={this.props.onClose} content="Voltar"/>
        </span>
        <UserData {...this.props.user} />
        <input type="text" className="payment-value" value={this.state.value} onChange={this.handleChange} placeholder="R$ 0,00" />
        <span className="pay-button">
          <Button onClick={() => this.props.onPay(this.props.user.id, this.state.value)} content="PAGAR"/>
        </span>
      </div>
    )
  }
}

export const PaymentConfirmation = ({
  transaction,
  date,
  card,
  value,
}) => {
  return (
    <div className="payment-confirmation">
      <span>Transação: {transaction}</span>
      <span>Data: {date}</span>
      <span>Cartão: {card}</span>
      <span>Valor: {value}</span>
    </div>
  )
}

export const ConfirmationWindow = (props) =>  {
  const style = { display: (props.opened) ? null : 'none' }
  return (
    <div className="confirmation-window" style={style}>
      <UserData {...props.user} />
      <PaymentConfirmation {...props.paymentData} />
      <Button onClick={props.onClose} content="VOLTAR"/>
      <Button content="PAGAR NOVAMENTE"/>
    </div>
  )
}
