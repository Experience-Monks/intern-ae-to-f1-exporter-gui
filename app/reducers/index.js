import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './exporter';
import previewState from './previewState';
import download from './download';
import filter from './filter';
import previewType from './toggle';
import errors from './errors';
import compState from './compState';

const rootReducer = combineReducers({
	status,
	previewState,
	download,
	filter, 
	previewType,
	errors,
	compState,
	routing
});

export default rootReducer;
