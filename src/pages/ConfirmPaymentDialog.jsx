import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as profileStore from '../store/ui/profile';
import * as cardsStore from '../store/entities/cards';
import * as usersStore from '../store/entities/users';
import * as postPaymentStore from '../store/api/postPayment';
import ConfirmPaymentDialog from '../components/ConfirmPaymentDialog';
import * as routes from '../constants/routes';

const ConfirmPaymentPage = ({ history, location, selectedCard, user, userId, apiStatus, request }) => (
  !userId && Boolean(location.pathname.match(routes.CONFIRM_PAYMENT))
    ? <Redirect to="/" />
    : <ConfirmPaymentDialog
      selectedCard={selectedCard}
      user={user}
      apiStatus={apiStatus}
      onHide={() => history.push('/')}
      visible={Boolean(location.pathname.match(routes.CONFIRM_PAYMENT))}
      history={history}
      request={request}
    />
);

const mapStateToProps = (state, { location }) => {
  const cardNumber = profileStore.getSelectedCard(state);
  const { userId } = location.state || {};
  return {
    userId,
    selectedCard: cardsStore.getOneByNumber(state, cardNumber),
    user: usersStore.getOneById(state, userId),
    apiStatus: postPaymentStore.getApiStatus(state),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      request: postPaymentStore.actions.request,
    },
  )(ConfirmPaymentPage),
);
