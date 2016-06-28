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
import wiki from './wiki';

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
	routing
});

export default rootReducer;
