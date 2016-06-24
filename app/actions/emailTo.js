export const SET_EMAIL_TO = 'SET_EMAIL_TO';

export function email(state) {
    return {
        type: SET_EMAIL_TO,
        state
    };
}

export function setEmailTo(state) {
  return (dispatch) => {
    dispatch(email(state));
  };
}
