import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './exporter';
import previewState from './previewState';
import download from './download';
import filter from './filter';

const rootReducer = combineReducers({
  status,
  previewState,
  download,
  filter, 
  routing
});

export default rootReducer;
