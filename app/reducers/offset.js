import { OFFSET } from '../actions/offset';

export default function status(state = {x: 0, y: 0}, action) {
  switch (action.type) {
    case OFFSET:
      state = action.state;
      return state;
    default:
      return state;
  }
}
