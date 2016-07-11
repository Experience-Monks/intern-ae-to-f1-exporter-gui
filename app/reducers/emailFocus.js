import { SET_EMAIL_FOCUS } from '../actions/emailFocus';

export default function email(state = false, action) {
  switch (action.type) {
    case SET_EMAIL_FOCUS:
      state = action.state;
      return state;
    default:
      return state;
  }
}
