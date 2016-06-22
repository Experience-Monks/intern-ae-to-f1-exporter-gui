import { SET_MULTI_COMP } from '../actions/multiComp';

export default function multiComp(state = false, action) {
	switch (action.type) {
		case SET_MULTI_COMP:
			state = action.state;
			return state;
		default:
			return state;
	}
}
