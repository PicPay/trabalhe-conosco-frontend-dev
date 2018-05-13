const NAME = 'ui/profile';

export const types = {
  SELECT_CARD: `${NAME}/SELECT_CARD`,
};

export const actions = {
  selectCard: number => ({ type: types.SELECT_CARD, number }),
};

const initialState = {
  selectedCard: '',
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.SELECT_CARD:
      return {
        ...state,
        selectedCard: action.number,
      };

    default: return state;
  }
};

export const getSelectedCard = state => state.ui.profile.selectedCard;

