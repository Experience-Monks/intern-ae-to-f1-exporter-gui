import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './exporter';
import previewState from './previewState';
import download from './landing';

const rootReducer = combineReducers({
  status,
  previewState,
  download,
  routing
});

export default rootReducer;
