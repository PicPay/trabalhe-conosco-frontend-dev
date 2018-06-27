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
                /*se o cartão selecionado for o mesmo do map, renderiza com a className active-card*/
                return selectedCard.cardNumber === card.cardNumber ?
                  <li className='item-card active-card' key={card.cardNumber} onClick={() => this.onCardSelect(card)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" className="card-icon">
                      <path fill="#474971" fill-rule="nonzero" d="M9.234 21.049H25.2a.835.835 0 0 0 .592-.24.81.81 0 0 0 .24-.59V6.773a.801.801 0 0 0-.238-.583.832.832 0 0 0-.596-.239H2.8a.835.835 0 0 0-.592.24.81.81 0 0 0-.24.59v13.446a.801.801 0 0 0 .238.583c.156.155.37.241.596.239h6.432zm0 .95H2.806a1.806 1.806 0 0 1-1.286-.519A1.74 1.74 0 0 1 1 20.22V6.786a1.75 1.75 0 0 1 .521-1.265A1.81 1.81 0 0 1 2.802 5h22.392c.482-.004.946.183 1.286.52.34.337.528.794.52 1.26v13.433a1.75 1.75 0 0 1-.521 1.265 1.81 1.81 0 0 1-1.281.522H9.234zM1.484 8.686h25.032v3.21H1.484v-3.21zm2.177 9.764a.48.48 0 0 1-.484-.476.48.48 0 0 1 .484-.475h2.176a.48.48 0 0 1 .484.475.48.48 0 0 1-.484.476H3.661zm4.353 0a.48.48 0 0 1-.484-.476.48.48 0 0 1 .484-.475h7.619a.48.48 0 0 1 .483.475.48.48 0 0 1-.483.476H8.014z"/>
                    </svg>
                    <p>{card.cardNumber}</p>
                  </li>
                :
                  <li className='item-card' key={card.cardNumber} onClick={() => this.onCardSelect(card)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" className="card-icon">
                      <path fill="#474971" fill-rule="nonzero" d="M9.234 21.049H25.2a.835.835 0 0 0 .592-.24.81.81 0 0 0 .24-.59V6.773a.801.801 0 0 0-.238-.583.832.832 0 0 0-.596-.239H2.8a.835.835 0 0 0-.592.24.81.81 0 0 0-.24.59v13.446a.801.801 0 0 0 .238.583c.156.155.37.241.596.239h6.432zm0 .95H2.806a1.806 1.806 0 0 1-1.286-.519A1.74 1.74 0 0 1 1 20.22V6.786a1.75 1.75 0 0 1 .521-1.265A1.81 1.81 0 0 1 2.802 5h22.392c.482-.004.946.183 1.286.52.34.337.528.794.52 1.26v13.433a1.75 1.75 0 0 1-.521 1.265 1.81 1.81 0 0 1-1.281.522H9.234zM1.484 8.686h25.032v3.21H1.484v-3.21zm2.177 9.764a.48.48 0 0 1-.484-.476.48.48 0 0 1 .484-.475h2.176a.48.48 0 0 1 .484.475.48.48 0 0 1-.484.476H3.661zm4.353 0a.48.48 0 0 1-.484-.476.48.48 0 0 1 .484-.475h7.619a.48.48 0 0 1 .483.475.48.48 0 0 1-.483.476H8.014z"/>
                    </svg>
                    <p>{card.cardNumber}</p>
                  </li>
                }
              )}


            </ul>
            <p className="btn-add-card" onClick={() => onCardModal(contact)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" className="icon-add">
                  <path fill="#474971" fill-rule="evenodd" d="M13 13V6h2v7h7v2h-7v7h-2v-7H6v-2h7z"/>
              </svg>
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
