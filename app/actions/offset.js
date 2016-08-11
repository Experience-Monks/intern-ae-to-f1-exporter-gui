export const OFFSET = 'OFFSET';


export function offset(offsetState) {
  return {
    type: OFFSET,
    state: offsetState
  };
}

export function setOffsetState(offsetState) {
  return (dispatch) => {
    dispatch(offset(offsetState));
  };
}
