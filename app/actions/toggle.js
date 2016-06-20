export const TOGGLE = 'TOGGLE';

export function tog(state) {
	return {
		type: TOGGLE,
		state
	};
}

export function setType(state) {
	return (dispatch) => {
		dispatch(tog(state));
	};
}
