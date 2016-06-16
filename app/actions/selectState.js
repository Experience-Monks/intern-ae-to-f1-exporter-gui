export const SET_PREVIEW_STATE = 'SET_PREVIEW_STATE';
//export const ANIMATION_STATE_IDLE = 'ANIMATION_STATE_IDLE';
//export const ANIMATION_STATE_HOVER = 'ANIMATION_STATE_HOVER';
//export const ANIMATION_STATE_OVER = 'ANIMATION_STATE_OVER';

export function sync(state) {
    return {
        type: SET_PREVIEW_STATE,
        state: state
    };
  //  switch (type) {
  //  case 'over state':
  //    return { type: ANIMATION_STATE_OVER };
  //  case 'hover state':
  //    return { type: ANIMATION_STATE_HOVER };
  //  case 'idle state':
  //    return { type: ANIMATION_STATE_IDLE };
  //  default:
  //    return { type: ANIMATION_STATE_IDLE };
  //}
}

export function setAnimationState(state) {
  return (dispatch) => {
    dispatch(sync(state));
  };
}
