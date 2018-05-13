const NAME = 'api/postPayment';

export const types = {
  REQUEST: `${NAME}/REQUEST`,
  SUCCESS: `${NAME}/SUCCESS`,
  FAILURE: `${NAME}/FAILURE`,
};

export const actions = {
  request: (value, card, user, history) =>
    ({ type: types.REQUEST, value, card, user, history }),
  success: () => ({ type: types.SUCCESS }),
  failure: error => ({ type: types.FAILURE, error }),
};

const initialState = {
  isFetching: false,
  failed: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, error } = action;
  switch (type) {
    case types.REQUEST:
      return { ...state, isFetching: true };
    case types.SUCCESS:
      return { ...state, isFetching: false, failed: false };
    case types.FAILURE:
      return { ...state, isFetching: false, failed: true, error };

    default: return state;
  }
};

export const getApiStatus = state => state.api.postPayment;
