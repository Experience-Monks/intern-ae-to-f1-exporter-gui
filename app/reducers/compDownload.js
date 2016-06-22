import { SET_COMPOSITION_NAME } from '../actions/compositionDownloads';

export default function compositionDownloads(state = [], action) {
	switch(action.type) {
		case SET_COMPOSITION_NAME: 
			state = action.state;
			return state;
		default:
			return state;
	}
}
