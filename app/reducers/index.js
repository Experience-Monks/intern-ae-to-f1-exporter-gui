import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './exporter';
import previewState from './previewState';
import download from './download';
import filter from './filter';
import previewType from './toggle';

const rootReducer = combineReducers({
	status,
	previewState,
	download,
	filter, 
	previewType,
	routing
});

export default rootReducer;
