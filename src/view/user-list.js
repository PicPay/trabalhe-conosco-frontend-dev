import React from 'react'
import imgPaySvg from './img/pagar.svg'
import imgPayPng from './img/pagar.png'
import imgPayPng2x from './img/pagar@2x.png'
import imgPayPng3x from './img/pagar@3x.png'
import imgDownSvg from './img/down.svg'
import imgDownPng from './img/down.png'
import imgDownPng2x from './img/down@2x.png'
import imgDownPng3x from './img/down@3x.png'
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

export const Button = (props) => {
  return (
    <button className="btn">
      <picture>
        <source srcSet={imgDownSvg}/>
        <img src={imgDownPng} srcSet={`${imgDownPng},${imgDownPng2x} 2x, ${imgDownPng3x} 3x`} alt="" />
      </picture>
    </button>
  )
}

export const PaymentButton = (props) => {
  return (
    <div className="payment-button">
      <picture>
        <source srcSet={imgPaySvg} alt=""/>
        <img src={imgPayPng} srcSet={`${imgPayPng},${imgPayPng2x} 2x, ${imgPayPng3x} 3x`} alt="" />
      </picture>
      <Button />
    </div>
  )
}

export const UserPanel = (props) => {
  return (
    <div className="user-panel">
      <UserData {...props.user}/>
      <PaymentButton />
    </div>
  )
}

export const UserList = (props) => {
  return (
    props.userList.map((user, index) => <UserPanel key={index} user={user} />)
  )
}
