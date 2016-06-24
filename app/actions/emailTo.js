export const SET_EMAIL_TO = 'SET_EMAIL_TO';

export function emailTo(state) {
    return {
        type: SET_EMAIL_TO,
        state
    };
}

export function setEmailTo(state) {
  return (dispatch) => {
    dispatch(emailTo(state));
  };
}
