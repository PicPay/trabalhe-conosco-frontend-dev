import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as usersStore from '../store/entities/users';
import PaymentReceiptDialog from '../components/PaymentReceiptDialog';
import * as routes from '../constants/routes';

const ConfirmPaymentPage = ({ history, location, userId, user, cardNumber, transaction }) => {
  const payAgain = () => history.push(routes.CONFIRM_PAYMENT, { userId });
  return (
    !transaction && Boolean(location.pathname.match(routes.PAYMENT_RECEIPT))
      ? <Redirect to="/" />
      : <PaymentReceiptDialog
        user={user}
        cardNumber={cardNumber}
        transaction={transaction}
        payAgain={payAgain}
        onHide={() => history.push('/')}
        visible={Boolean(location.pathname.match(routes.PAYMENT_RECEIPT))}
      />
  );
};

const mapStateToProps = (state, { location }) => {
  const { userId, cardNumber, transaction } = location.state || {};
  return {
    userId,
    cardNumber,
    user: usersStore.getOneById(state, userId),
    transaction,
  };
};

export default withRouter(
  connect(mapStateToProps)(ConfirmPaymentPage),
);
