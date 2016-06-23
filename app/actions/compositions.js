export const SET_COMPOSITION = 'SET_COMPOSITION';

export function setComp(state) {
    return {
        type: SET_COMPOSITION,
        state
    };
}

export function setCompositionName(state) {
  return (dispatch) => {
    dispatch(setComp(state));
  };
}
