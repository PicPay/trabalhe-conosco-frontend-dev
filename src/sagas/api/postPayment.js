import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as transactionsApi from '../../api/transactions';
import * as postPaymentStore from '../../store/api/postPayment';
import { unmaskCurrency2Float, shortExpirationDate } from '../../utils/masks';
import * as routes from '../../constants/routes';

function* postPayment(action) {
  try {
    const { value, card, user, history } = action;
    const body = {
      card_number: card.cardNumber,
      cvv: card.cvvNumber,
      value: unmaskCurrency2Float(value),
      expiry_date: shortExpirationDate(card.expirationDate),
      destination_user_id: user.id,
    };
    const { transaction } = yield call(transactionsApi.postTransaction, body);
    yield all([
      put(postPaymentStore.actions.success()),
    ].filter(x => x));
    history.push(routes.PAYMENT_RECEIPT, { userId: user.id, cardNumber: card.cardNumber, transaction });
  } catch (error) {
    console.log(error);
    yield put(postPaymentStore.actions.failure(error));
  }
}

export default function* postPaymentWatch() {
  yield takeEvery(postPaymentStore.types.REQUEST, postPayment);
}
