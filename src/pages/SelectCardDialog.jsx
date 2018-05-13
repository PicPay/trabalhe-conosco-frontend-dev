import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as profileStore from '../store/ui/profile';
import * as cardsStore from '../store/entities/cards';
import SelectCardDialog from '../components/SelectCardDialog';
import * as routes from '../constants/routes';

const SelectCardPage = ({ history, location, selectedCardNumber, cards, selectCard }) => {
  const registerNewCard = () => history.push(routes.REGISTER_CARD, location.state);
  const handleSelectSubmit = () => history.push(routes.CONFIRM_PAYMENT, location.state);
  return (
    <SelectCardDialog
      selectedCardNumber={selectedCardNumber}
      cards={cards}
      onHide={() => history.push('/')}
      registerNewCard={registerNewCard}
      selectCard={selectCard}
      onSelectSubmit={handleSelectSubmit}
      visible={Boolean(location.pathname.match(routes.SELECT_CARD))}
    />
  );
};

const mapStateToProps = state => ({
  selectedCardNumber: profileStore.getSelectedCard(state),
  cards: cardsStore.getAllCards(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      selectCard: profileStore.actions.selectCard,
    },
  )(SelectCardPage),
);
