import { all, fork } from 'redux-saga/effects';
import getUsers from './getUsers';

export default function* () {
  yield all([
    fork(getUsers),
  ]);
}
