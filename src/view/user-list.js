import React from 'react'
import { Button } from './generics-components'
import imgPaySvg from './img/pagar.svg'
import imgDownSvg from './img/down.svg'
import './user-list.css'

export const UserData = ({
  img,
  name,
  id,
  username,
}) => {
  return (
    <div className="user-data">
      <img className="user-img" src={img} alt="" />
      <div className="user">
        <div className="user-name">{name}</div>
        <div className="user-info">
          <span>id: {id}</span>
          <span>{username}</span>
        </div></div>
    </div>
  )
}

export const PaymentButton = (props) => {
  const buttonContent = <div className="content"><span className="label">PAGAR</span><img src={imgDownSvg}  alt="" /></div>
  return (
    <div className="payment-button">
      <img src={imgPaySvg} alt="" />
      <Button onClick={props.onClick} content={buttonContent}/>
    </div>
  )
}

export const UserPanel = (props) => {
  return (
    <div className="user-panel">
      <UserData {...props.user}/>
      <PaymentButton onClick={props.togglePaymentWindow}/>
    </div>
  )
}

export const UserList = (props) => {
  return (
    <div className="user-list">
      {props.userList.map((user, index) => <UserPanel key={index} togglePaymentWindow={() => props.togglePaymentWindow(user.id)} user={user} />)}
    </div>
  )
}
