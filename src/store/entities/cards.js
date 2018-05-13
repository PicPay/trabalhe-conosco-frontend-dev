import { createSelector } from 'reselect';

const NAME = 'entities/cards';

export const types = {
  REGISTER_CARD: `${NAME}/REGISTER_CARD`,
};

export const actions = {
  register: (cardFLag, name, cardNumber, expirationDate, cvvNumber, CEP) =>
    ({ type: types.REGISTER_CARD, card: { name, cardFLag, cardNumber, expirationDate, cvvNumber, CEP } }),
};

const initialState = {};

export default (state = initialState, action) => {
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

export const getAllById = state => state.entities.cards;

export const getOneByNumber = (state, number) => getAllById(state)[number];

export const getAllCards = createSelector(
  getAllById,
  byId => Object.values(byId),
);
