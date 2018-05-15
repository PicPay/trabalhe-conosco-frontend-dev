import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import UsersList from '../containers/UsersList';
import ConfirmPaymentDialog from './ConfirmPaymentDialog';
import RegisterCardDialog from './RegisterCardDialog';
import SelectCardDialog from './SelectCardDialog';
import PaymentReceiptDialog from './PaymentReceiptDialog';
// import * as routes from '../constants/routes';

export default class SimpleListDialog extends React.PureComponent {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service worker registration succeeded:', registration);
      }).catch((error) => {
        console.log('Service worker registration failed:', error);
      });
    } else {
      console.log('Service workers are not supported.');
    }
  }
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
