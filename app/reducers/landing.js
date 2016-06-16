import { DOWNLOAD, NOOP } from '../actions/landing';

export default function downloadState(state = false, action) {
	switch(action.type) {
		case DOWNLOAD:
			state = action.state;
			return state;
		case NOOP:
			return state;
		default:
			return state;
	}
}
