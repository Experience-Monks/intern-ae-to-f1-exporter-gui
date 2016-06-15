export const ANIMATION_STATE_IDLE = 'ANIMATION_STATE_IDLE';
export const ANIMATION_STATE_HOVER = 'ANIMATION_STATE_HOVER';
export const ANIMATION_STATE_OVER = 'ANIMATION_STATE_OVER';

export function sync(type) {
  switch(type) {
  	case 'over state':
  		return { type: ANIMATION_STATE_OVER };
  	case 'hover state':
  		return { type: ANIMATION_STATE_HOVER };
  	case 'idle state':
  		return { type: ANIMATION_STATE_IDLE };
  }
}

export function setAnimationState(type) {
  return (dispatch, getState) => {
  	const {animationState} = getState();
    dispatch(sync(type));
  };
}
