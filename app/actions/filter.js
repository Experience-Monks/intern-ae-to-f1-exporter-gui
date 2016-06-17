export const FILTER = 'FILTER';

export function filt(filters) {
	return {
		type: FILTER,
		filters
	};
}

export function setFilters(filters) {
	return (dispatch) => {
		dispatch(filt(filters));
	};
}
