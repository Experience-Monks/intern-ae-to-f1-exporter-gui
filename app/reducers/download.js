import { DOWNLOAD } from '../actions/download';

export default function status(state = false, action) {
	switch (action.type) {
		case DOWNLOAD:
            state = action.state;
            return state;
		default:
			return state;
	}
}
