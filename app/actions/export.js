export const EXPORT = 'EXPORT';
export const NOOP = 'NOOP';
export const UNSYNC = 'UNSYNC';

export function sync(state) {
	switch(state) {
		case 'Synchronize':
			return {
				type: EXPORT
			};
		case 'Synching':
			return {
				type: EXPORT
			};
		case 'Synchronized':
			return {
				type: UNSYNC
			};
		default:
	}
}

export function setAESync(status) {
  return (dispatch) => {
    dispatch(sync(status));
  };
}
