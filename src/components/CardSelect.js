import React, { Component } from 'react'
import TopBar from './TopBar'

class CardSelect extends Component{

  state = {
    active: 'false',
  }

  onCardSelect = (card) => {
    /*recupera o cartão clicado e atualiza o localStorage*/
    localStorage.setItem('selectedCard', JSON.stringify(card));
    /*altera o state do active para renderizar a pagina e alterar o cartão selecionado*/
    this.setState({ active: 'true' });
  }

  selectClick = () => {
    this.props.onPaymentContact(this.props.contact)
  }

  render(){
    const { contact, onCardModal } = this.props
    const selectedCard = JSON.parse(localStorage.getItem('selectedCard'))

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
              {/*mapeia os cartões cadastrados comparando o cartão selecionado no localStorage com o cartão atual do map*/}
              {cards.map(card => {
                {/*se o cartão selecionado for o mesmo do map, renderiza com a className active-card*/}
                return selectedCard.cardNumber === card.cardNumber ?
                  <li className='item-card active-card' key={card.cardNumber} onClick={() => this.onCardSelect(card)}>
                    <img src={require('../images/card-blue.svg')} alt="ícone cartão de crédito" />
                    <p>{card.cardNumber}</p>
                  </li>
                :
                  <li className='item-card' key={card.cardNumber} onClick={() => this.onCardSelect(card)}>
                    <img src={require('../images/card-blue.svg')} alt="ícone cartão de crédito" />
                    <p>{card.cardNumber}</p>
                  </li>
                }
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
