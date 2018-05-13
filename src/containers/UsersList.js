import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import UsersList from '../components/UsersList';
import * as getUsersStore from '../store/api/getUsers';
import * as usersStore from '../store/entities/users';

function componentDidMount() {
  this.props.requestUsers();
}

export default connect(
  state => ({
    apiStatus: getUsersStore.getApiStatus(state),
    users: usersStore.getAllUsers(state),
  }),
  {
    requestUsers: getUsersStore.actions.request,
  },
)(lifecycle({ componentDidMount })(UsersList));
