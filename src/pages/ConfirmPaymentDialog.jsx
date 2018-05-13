import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as profileStore from '../store/ui/profile';
import * as cardsStore from '../store/entities/cards';
import ConfirmPaymentDialog from '../components/ConfirmPaymentDialog';
import * as routes from '../constants/routes';

const ConfirmPaymentPage = ({ history, location, selectedCard }) => {
  return (
    <ConfirmPaymentDialog
      selectedCard={selectedCard}
      onHide={() => history.push('/')}
      visible={Boolean(location.pathname.match(routes.CONFIRM_PAYMENT))}
    />
  );
};

const mapStateToProps = (state) => {
  const cardNumber = profileStore.getSelectedCard(state);
  return {
    selectedCard: cardsStore.getOneByNumber(state, cardNumber),
  };
};

export default withRouter(
  connect(mapStateToProps)(ConfirmPaymentPage),
);
