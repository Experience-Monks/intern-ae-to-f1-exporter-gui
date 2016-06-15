import { ANIMATION_STATE_IDLE, ANIMATION_STATE_HOVER, ANIMATION_STATE_OVER } from '../actions/selectState';

function previewState(state = 'idle state', action) {
	switch (action.type) {
		case ANIMATION_STATE_IDLE:
			state = 'idle state'
			return state;
		case ANIMATION_STATE_HOVER:
			state = 'hover state';
			return state;
		case ANIMATION_STATE_OVER:
			state = 'over state';
			return state;
		default:
			return state;
	}
}

export default previewState;
