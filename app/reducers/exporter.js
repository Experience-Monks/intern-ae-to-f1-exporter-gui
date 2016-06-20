import { EXPORT, UNSYNC } from '../actions/export';

function status(state = 'Synchronize', action) {
	switch (action.type) {
		case EXPORT:
			if(state === 'Synchronize') {
				state = 'Synching';
				return state;
			}
			else if(state !== 'Synched') {
				state = 'Synchronize';
				return state;
			}
			else {
				return state;
			}
			case UNSYNC:
				state = 'Synchronize';
				return state;
			default:
				return state;
	}
}

export default status;
