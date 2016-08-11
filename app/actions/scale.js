export const SCALE = 'SCALE';

export function scale(scaleState) {
  return {
    type: SCALE,
    state: scaleState
  };
}

export function setScaleState(scaleState) {
  return (dispatch) => {
    dispatch(scale(scaleState));
  };
}
