import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './exporter';
import previewState from './previewState';
import download from './download';
import filter from './filter';
import previewType from './toggle';
import errors from './errors';
import compState from './compState';
import compName from './compName';
import compDownload from './compDownload';
import emailContacts from './emailContacts';
import emailTo from './emailTo';
import emailFocus from './emailFocus';
import wiki from './wiki';
import scale from './scale';
import offset from './offset';

const rootReducer = combineReducers({
	status,
	previewState,
	download,
	filter, 
	previewType,
	errors,
	compState,
	compName,
	compDownload,
	emailContacts,
	emailTo,
	wiki,
	emailFocus,
	offset,
	scale,
	routing
});

export default rootReducer;
