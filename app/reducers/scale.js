import { SCALE } from '../actions/scale';

export default function status(state = 'scale(1, 1)', action) {
  switch (action.type) {
    case SCALE:
      state = action.state;
      return state;
    default:
      return state;
  }
}
