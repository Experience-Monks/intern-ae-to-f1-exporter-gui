import { IDLE, HOVER, OVER, NOOP } from '../actions/preview';

function currentAnimation(state = 'none', action) {
	switch(action.type) {
		case IDLE:
			state = 'idle';
			return state;
		case HOVER:
			state = 'hover';
			return state;
		case OVER:
			state = 'over';
			return state;
		case NOOP:
			return state;
	}
}