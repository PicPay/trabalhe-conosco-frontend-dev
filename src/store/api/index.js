import { combineReducers } from 'redux';
import getUsers from './getUsers';
import postPayment from './postPayment';

export default combineReducers({
  getUsers,
  postPayment,
});
