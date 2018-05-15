import { schema } from 'normalizr';
import { user } from './users';
import { post } from './apiFetch';

const transaction = new schema.Entity('transactions', {}, { idAttribute: 'id' });

transaction.define({ destination_user: user });

export const postTransaction = body =>
  post('http://careers.picpay.com/tests/mobdev/transaction', body);
