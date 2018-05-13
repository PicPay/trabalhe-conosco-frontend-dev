import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import UsersList from '../components/UsersList';
import users from '../data/getUsers.json';
import ConfirmPaymentDialog from './ConfirmPaymentDialog';
import RegisterCardDialog from './RegisterCardDialog';
import SelectCardDialog from './SelectCardDialog';
// import * as routes from '../constants/routes';

export default class SimpleListDialog extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div>
          <UsersList users={users} />
          <Route path="*" component={ConfirmPaymentDialog} />
          <Route path="*" component={RegisterCardDialog} />
          <Route path="*" component={SelectCardDialog} />
        </div>
      </BrowserRouter>
    );
  }
}
