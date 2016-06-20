export const SET_PREVIEW_STATE = 'SET_PREVIEW_STATE';

export function sync(state) {
    return {
        type: SET_PREVIEW_STATE,
        state
    };
}

export function setAnimationState(state) {
  return (dispatch) => {
    dispatch(sync(state));
  };
}
