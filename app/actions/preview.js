export const NOOP = 'NOOP';
export const IDLE = 'IDLE';
export const HOVER = 'HOVER';
export const OVER = 'OVER';

export function prev(animationState) {
	switch(animationState) {
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

export function selectPreviewState(animationState) {
	return (dispatch, getState) => {
		dispatch(prev(animationState));
	};
}