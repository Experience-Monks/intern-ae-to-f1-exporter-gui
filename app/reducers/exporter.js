import { EXPORT, UNSYNC, NOOP } from '../actions/export';

function status(state = 'Unsynched', action) {
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
    case NOOP: 
      return state
    case UNSYNC:
      state = 'Unsynched'
      return state;
		default:
			return state;
			
	}
}

export default status;
