import React, { Component } from 'react'
import TopBar from './TopBar'


class CardSelect extends Component{

  onCardSelect = (card, e) => {
    localStorage.setItem('selectedCard', JSON.stringify(card));
  }

  selectClick = () => {
    this.props.onPaymentContact(this.props.contact)
  }

  render(){
    const { contact, onCardModal } = this.props

    /* Recupera os cartões cadastrados do localStorage */
    function getCards(){
      const cards = [];
      let cardCount = localStorage.getItem('cardCount')

      for (let i = 1; i <= cardCount; i++) {
        cards[i] = JSON.parse(localStorage.getItem('card'+i));
      }
      return cards;
    }

    const cards = getCards();


    return(
      <div className="backdrop">
        <div className="modal-box modal-card">
          <TopBar text={"Selecione o cartão"} CloseModal={this.props.onCloseModal}/>

          <div className="container-cards">
            <p>Cartões Cadastrados</p>
            <ul className="box-cards">
              {cards.map(card =>
                <li className="item-card" key={card.cardNumber} onClick={(e) => this.onCardSelect(card, e)}>
                  <img src={require('../images/card-blue.svg')} alt="ícone cartão de crédito" />
                  <p>{card.cardNumber}</p>
                </li>
              )}
            </ul>
            <p className="btn-add-card" onClick={() => onCardModal(contact)}>
              <img src={require('../images/icon-add.svg')} alt="ícone cartão de crédito" />
              Cadastrar novo cartão
            </p>
          </div>

          <button className="btn-action-user" onClick={() => this.selectClick()}>
            Selecionar
          </button>

        </div>
      </div>
    )
  }
}

export default CardSelect;
