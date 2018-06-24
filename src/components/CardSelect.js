import React, { Component } from 'react'
import TopBar from './TopBar'


class CardSelect extends Component{

  render(){
    const { contact, onCardModal, onSelectCardModal } = this.props

    function getCards(){
      const cards = [];
      let cardCount = window.localStorage.getItem('cardCount')

      for (let i = 1; i <= cardCount; i++) {
        cards[i] = JSON.parse(window.localStorage.getItem('card'+i));
      }
      return cards;
    }

    const cards = getCards();


    return(
      <div className="backdrop">
        <div className="modal-box modal-card">
          <TopBar text={"Selecione o cartão"} CloseModal={this.props.onCloseModal}/>

          <div>
            <p>Cartões Cadastrados</p>
            {cards.map(card =>
              <div key={card.cardNumber}>
                <p>{card.cardNumber}</p>
              </div>
            )}
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
