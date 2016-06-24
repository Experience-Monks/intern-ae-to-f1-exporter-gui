export const SET_CONTACTS = 'SET_CONTACTS';

export function cont(state) {
    return {
        type: SET_CONTACTS,
        state
    };
}

export function setContacts(state) {
  return (dispatch) => {
    dispatch(cont(state));
  };
}
