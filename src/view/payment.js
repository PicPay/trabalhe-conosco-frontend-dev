import React from 'react'
import { UserData, Button } from './user-list'

export const PaymentWindow = (props) =>  {
  const style = { display: (props.opened) ? null : 'none' }
  return (
    <div className="payment-window" style={style}>
      <Button onClick={props.onClose} content="Voltar"/>
      <UserData {...props.user} />
      <input type="text" className="payment-value" />
      <Button content="PAGAR"/>
    </div>
  )
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
