import { TOGGLE } from '../actions/toggle';

export default function toggle(state = 'react', action) {
	switch(action.type) {
		case TOGGLE:
			state = action.state;
			return state;
		default:
			return state;
	}
}
