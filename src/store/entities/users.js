import { createSelector } from 'reselect';

const NAME = 'entities/users';

export const types = {
  RECEIVE_USERS: `${NAME}/RECEIVE_USERS`,
};

export const actions = {
  receive: byId => ({ type: types.RECEIVE_USERS, byId }),
};

const initialState = {};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.RECEIVE_USERS:
      return {
        ...state,
        ...action.byId,
      };

    default: return state;
  }
};

const getAllById = state => state.entities.users;

export const getOneById = (state, id) => getAllById(state)[id];

export const getAllUsers = createSelector(
  getAllById,
  byId => Object.values(byId),
);
