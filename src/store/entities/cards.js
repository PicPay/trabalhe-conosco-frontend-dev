import { combineReducers } from 'redux';
import { union } from 'lodash';
import { createSelector } from 'reselect';

const NAME = 'entities/cards';

export const types = {
  REGISTER_CARD: `${NAME}/REGISTER_CARD`,
};

export const actions = {
  register: (cardFLag, name, cardNumber, expirationDate, cvvNumber, CEP) =>
    ({ type: types.REGISTER_CARD, card: { name, cardFLag, cardNumber, expirationDate, cvvNumber, CEP } }),
};

const byId = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case types.REGISTER_CARD:
      return {
        ...state,
        [action.card.cardNumber]: action.card,
      };

    default: return state;
  }
};

const allIds = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case types.REGISTER_CARD:
      return union(state, [action.card.cardNumber]);

    default: return state;
  }
};

export default combineReducers({
  byId,
  allIds,
})

export const getAllById = state => state.entities.cards.byId;

export const getAllIds = state => state.entities.cards.allIds;

export const getOneByNumber = (state, number) => getAllById(state)[number];

export const getAllCards = createSelector(
  getAllById,
  getAllIds,
  (byId, allIds) => allIds.map(id => byId[id]),
);
