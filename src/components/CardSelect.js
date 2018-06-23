import React, { Component } from 'react'
import TopBar from './TopBar'


class CardRegistration extends Component{
  render(){
    return(
      <div className="backdrop">
        <div className="modal-box modal-card">
          <TopBar text={"Selecione o cartão"} CloseModal={this.props.onCloseModal}/>
        </div>
      </div>
    )
  }
}

export default CardRegistration;
