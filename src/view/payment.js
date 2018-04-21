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
