import React, { Component } from 'react'
import TopBar from './TopBar'


class CardSelect extends Component{

  render(){
    const { contact, onCardModal, onSelectCardModal } = this.props
    return(
      <div className="backdrop">
        <div className="modal-box modal-card">
          <TopBar text={"Selecione o cartão"} CloseModal={this.props.onCloseModal}/>

          <div>
            <p>Cartões Cadastrados</p>
            <p onClick={() => onCardModal(contact)}>Cadastrar novo cartão</p>
          </div>

          <div>
            <p></p>
          </div>

        </div>
      </div>
    )
  }
}

export default CardSelect;
