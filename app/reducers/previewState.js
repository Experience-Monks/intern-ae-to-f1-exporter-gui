import { SET_PREVIEW_STATE } from '../actions/selectState';

function previewState(state = 'idle state', action) {
	switch (action.type) {
		case SET_PREVIEW_STATE:
			state = action.state;
			return state;
		default:
			return state;
	}
}

export default previewState;
