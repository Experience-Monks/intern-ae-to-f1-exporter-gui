import { TOGGLE } from '../actions/toggle';

export default function toggle(state = 'f1Dom', action) {
	switch(action.type) {
		case TOGGLE:
			state = action.state;
			return state;
		default:
			return state;
	}
}
