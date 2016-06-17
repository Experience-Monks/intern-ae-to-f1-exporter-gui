import { FILTER } from '../actions/filter';

export default function filters(state = [], action) {
	switch(action.type) {
		case FILTER: 
			state = action.filters;
			return state;
		default:
			return state;
	}
}
