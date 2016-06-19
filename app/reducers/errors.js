import { DISPLAY_ERROR, CLEAR_ERROR, INTERNAL_ERROR } from '../actions/errors';

const defaultState = {
  history: [],
  message: null
};

export default function errors(state = defaultState, action) {
  switch (action.type) {
    case DISPLAY_ERROR:
      return {
        history: state.history.concat([action.message]),
        message: action.message
      };
    case CLEAR_ERROR:
      return {
        ...state,
        message: null
      };
    case INTERNAL_ERROR:
      return {
        ...state,
        history: state.history.concat([{
          internalError: action.errMsg
        }])
      };
    default:
      return state;
  }
}
