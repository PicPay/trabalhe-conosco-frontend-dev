import { normalize } from 'normalizr';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as usersApi from '../../api/users';
import * as getUsersStore from '../../store/api/getUsers';
import * as usersStore from '../../store/entities/users';
import users from '../../data/getUsers.json';

function* getUsers() {
  try {
    // const response = yield call(usersApi.getUsers);
    const response = users;
    console.log(response);
    const normalized = normalize(response, [usersApi.user]);
    console.log(normalized);
    yield all([
      normalized.entities.users && put(usersStore.actions.receive(normalized.entities.users)),
      put(getUsersStore.actions.success()),
    ].filter(x => x));
  } catch (error) {
    console.log(error);
    yield put(getUsersStore.actions.failure(error));
  }
}

export default function* getUsersWatch() {
  yield takeEvery(getUsersStore.types.REQUEST, getUsers);
}
