import { WIKI } from '../actions/wiki';

export default function wiki(state = '', action) {
  switch(action.type) {
    case WIKI:
      state = action.state;
      return state;
    default:
      return state;
  }
}
