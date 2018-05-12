import { schema } from 'normalizr';
import { user } from './users';

const transaction = new schema.Entity('transactions', {}, { idAttribute: 'id' });

transaction.define({ destination_user: user });
