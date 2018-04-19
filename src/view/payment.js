import React from 'react'
import { UserData, Button } from './user-list'

export const PaymentWindow = (props) => {
  return (
    <div className="payment-window">
      <Button content="Voltar"/>
      <UserData {...props.user} />
      <input type="text" className="payment-value" />
      <Button content="PAGAR"/>
    </div>
  )
}
