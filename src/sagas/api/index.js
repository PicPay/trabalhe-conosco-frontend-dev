import { all, fork } from 'redux-saga/effects';
import getUsers from './getUsers';
import postPayment from './postPayment';

export default function* () {
  yield all([
    fork(getUsers),
    fork(postPayment),
  ]);
}
