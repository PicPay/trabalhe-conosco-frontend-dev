import React from 'react'
import './generics-components.css'

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className="btn">
      {props.content}
    </button>
  )
}

export const Modal = (props) => {
  const buttonContent = <div><span className="button-icon">&lsaquo;</span><span>Voltar</span></div>
  return (
    <div className="modal">
      <span className="back-button">
        <Button onClick={props.onClose} content={buttonContent}/>
      </span>
      {props.content}
    </div>
  )
}
