import React, { PureComponent } from 'react';
import UsersList from '../components/UsersList';
import users from '../data/getUsers.json';

export default class SimpleListDialog extends PureComponent {
  render() {
    return (
      <div>
        <UsersList users={users} />
      </div>
    );
  }
}
