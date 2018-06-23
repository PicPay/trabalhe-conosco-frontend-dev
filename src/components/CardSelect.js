import React, { Component } from 'react'
import TopBar from './TopBar'


class CardRegistration extends Component{

  render(){
    const { onCardModal, onSelectCardModal } = this.props
    return(
      <div className="backdrop">
        <div className="modal-box modal-card">
          <TopBar text={"Selecione o cartão"} CloseModal={this.props.onCloseModal}/>

          <div>
            <p>Cartões Cadastrados</p>
          </div>

          <div>
            <p></p>
          </div>

        </div>
      </div>
    )
  }
}

export default CardRegistration;
