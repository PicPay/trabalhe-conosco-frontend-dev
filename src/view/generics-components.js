import React from 'react'
import './css/generics-components.css'
import imgCloseSvg from './img/shape-copy.svg'

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className="btn">
      {props.content}
    </button>
  )
}

export const Modal = (props) => {
  const buttonContent = <div><span className="button-icon">&lsaquo;</span><span>Voltar</span></div>
  const buttonClose = <img src={imgCloseSvg} alt="" />
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="header">
          <div className="header-title">{props.title}</div>
          <span className="close-button">
            <Button onClick={props.onClose} content={buttonClose}/>
          </span>
        </div>
        <span className="back-button">
          <Button onClick={props.onClose} content={buttonContent}/>
        </span>
        {props.content}
      </div>
    </div>
  )
}
