import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import UsersList from '../components/UsersList';
import users from '../data/getUsers.json';
import ConfirmPaymentDialog from '../components/ConfirmPaymentDialog';
import RegisterCardDialog from './RegisterCardDialog';
import SelectCardDialog from '../components/SelectCardDialog';
import * as routes from '../constants/routes';

export default class SimpleListDialog extends React.PureComponent {
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
          <Route path="*" component={RegisterCardDialog} />
          <Route
            path="*"
            render={({ location, history }) => (
              <SelectCardDialog
                history={history}
                visible={Boolean(location.pathname.match(routes.SELECT_CARD))}
              />
            )
            }
          />
        </div>
      </BrowserRouter>
    );
  }
}
