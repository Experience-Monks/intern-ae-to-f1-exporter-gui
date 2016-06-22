export const SET_MULTI_COMP = 'SET_MULTI_COMP';


export function comp(compState) {
	return {
		type: SET_MULTI_COMP,
		state: compState
	};
}

export function setMultiCompState(compState) {
	return (dispatch) => {
		dispatch(comp(compState));
	};
}
