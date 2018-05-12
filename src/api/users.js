import { schema } from 'normalizr';
import { get } from './apiFetch';

export const getUsers = () => get('http://careers.picpay.com/tests/mobdev/users');

export const user = new schema.Entity('users', {}, { idAttribute: 'id' });
