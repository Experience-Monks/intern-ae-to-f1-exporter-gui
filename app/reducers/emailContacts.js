import { SET_CONTACTS } from '../actions/setContacts';

export default function contacts(state = [], action) {
	switch (action.type) {
		case SET_CONTACTS:
			state = action.state;
			return state;
		default:
			return state;
	}
}
