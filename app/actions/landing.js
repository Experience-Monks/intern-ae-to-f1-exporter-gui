export const NOOP = 'NOOP';
export const IDLE = 'IDLE';
export const HOVER = 'HOVER';
export const OVER = 'OVER';

export function prev(previewState) {
	switch(previewState) {
		case 'idle':
			return {
				type: IDLE
			};
		case 'over':
			return {
				type: OVER
			};
		case 'hover':
			return {
				type: HOVER
			};		
		default:
			return {
				type: NOOP
			};
	}
}

export function selectPreviewState(previewState) {
	return (dispatch, getState) => {
		dispatch(prev(previewState));
	};
}