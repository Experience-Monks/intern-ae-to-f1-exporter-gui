import { SET_COMPOSITION } from '../actions/compositions';

export default function compositionName(state = '', action) {
	switch(action.type) {
		case SET_COMPOSITION: 
			state = action.state;
			return state;
		default:
			return state;
	}
}
