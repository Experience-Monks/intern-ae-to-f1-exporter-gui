import { SET_EMAIL_TO } from '../actions/emailTo';

export default function emailTo(state = [], action) {
	switch (action.type) {
		case SET_EMAIL_TO:
			state = action.state;
			return state;
		default:
			return state;
	}
}
