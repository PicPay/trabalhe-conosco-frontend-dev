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
          <div className="main-toolbar">
            <div><h4>Front-End Test</h4></div>
          </div>
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
