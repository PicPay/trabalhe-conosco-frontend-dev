import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as cardsStore from '../store/entities/cards';
import * as profileStore from '../store/ui/profile';
import RegisterCardDialog from '../components/RegisterCardDialog';
import * as routes from '../constants/routes';

const RegisterCardPage = ({ history, location, registerCard, selectCard }) => {
  const handleSubmit = (cardFLag, name, cardNumber, expirationDate, cvvNumber, CEP) => {
    registerCard(name, cardFLag, cardNumber, expirationDate, cvvNumber, CEP);
    selectCard(cardNumber);
    history.push(routes.CONFIRM_PAYMENT, location.state);
  };
  return (
    <RegisterCardDialog
      onSubmit={handleSubmit}
      onHide={() => history.push('/')}
      visible={Boolean(location.pathname.match(routes.REGISTER_CARD))}
    />
  );
};

export default withRouter(connect(
  null,
  {
    registerCard: cardsStore.actions.register,
    selectCard: profileStore.actions.selectCard,
  },
)(RegisterCardPage));
