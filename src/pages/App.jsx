import React, { PureComponent } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import UsersList from '../components/UsersList';
import users from '../data/getUsers.json';
import ConfirmPaymentDialog from '../components/ConfirmPaymentDialog';
import RegisterCardDialog from '../components/RegisterCardDialog';
import * as routes from '../constants/routes';

export default class SimpleListDialog extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div>
          <UsersList users={users} />
          <Route
            path="*"
            render={({ location }) =>
              <ConfirmPaymentDialog visible={Boolean(location.pathname.match(routes.CONFIRM_PAYMENT))} />
            }
          />
          <Route
            path="*"
            render={({ location }) =>
              <RegisterCardDialog visible={Boolean(location.pathname.match(routes.REGISTER_CARD))} />
            }
          />
        </div>
      </BrowserRouter>
    );
  }
}
