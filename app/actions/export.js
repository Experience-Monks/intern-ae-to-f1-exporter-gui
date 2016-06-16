export const EXPORT = 'EXPORT';
export const NOOP = 'NOOP';
export const UNSYNC = 'UNSYNC';

export function sync(state) {
	switch(state) {
		case 'Unsynched':
			return {
				type: EXPORT
			};
		case 'Synching':
			return {
				type: NOOP
			};
		case 'Synched':
			return {
				type: UNSYNC
	     	};
		default:
	}
}

export function setAESync(status) {
	// dispatch({ type: 'SYNCING' })

  return (dispatch, getState) => {
    dispatch(sync(status));
  };
}
