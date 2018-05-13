import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import UsersList from '../containers/UsersList';
import ConfirmPaymentDialog from './ConfirmPaymentDialog';
import RegisterCardDialog from './RegisterCardDialog';
import SelectCardDialog from './SelectCardDialog';
import PaymentReceiptDialog from './PaymentReceiptDialog';
// import * as routes from '../constants/routes';

export default class SimpleListDialog extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div>
          <UsersList />
          <Route path="*" component={ConfirmPaymentDialog} />
          <Route path="*" component={RegisterCardDialog} />
          <Route path="*" component={SelectCardDialog} />
          <Route path="*" component={PaymentReceiptDialog} />
        </div>
      </BrowserRouter>
    );
  }
}
