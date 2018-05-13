import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as profileStore from '../store/ui/profile';
import * as cardsStore from '../store/entities/cards';
import * as usersStore from '../store/entities/users';
import ConfirmPaymentDialog from '../components/ConfirmPaymentDialog';
import * as routes from '../constants/routes';

const ConfirmPaymentPage = ({ history, location, selectedCard, user, userId }) => (
  !userId && Boolean(location.pathname.match(routes.CONFIRM_PAYMENT))
    ? <Redirect to="/" />
    : <ConfirmPaymentDialog
      selectedCard={selectedCard}
      user={user}
      onHide={() => history.push('/')}
      visible={Boolean(location.pathname.match(routes.CONFIRM_PAYMENT))}
    />
);

const mapStateToProps = (state, { location }) => {
  const cardNumber = profileStore.getSelectedCard(state);
  const { userId } = location.state || {};
  return {
    userId,
    selectedCard: cardsStore.getOneByNumber(state, cardNumber),
    user: usersStore.getOneById(state, userId),
  };
};

export default withRouter(
  connect(mapStateToProps)(ConfirmPaymentPage),
);
