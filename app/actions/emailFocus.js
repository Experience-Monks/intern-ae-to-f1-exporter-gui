export const SET_EMAIL_FOCUS = 'SET_EMAIL_FOCUS';

export function email(state) {
    return {
        type: SET_EMAIL_FOCUS,
        state
    };
}

export function setEmailFocus(state) {
  return (dispatch) => {
    dispatch(email(state));
  };
}
