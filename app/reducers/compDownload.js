import { SET_COMPOSITION_DOWNLOAD } from '../actions/compositionDownloads';

export default function compositionDownloads(state = [], action) {
	switch(action.type) {
		case SET_COMPOSITION_DOWNLOAD: 
			state = action.state;
			return state;
		default:
			return state;
	}
}
