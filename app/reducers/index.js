import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './exporter';
import previewState from './previewState';
import landing from './landing';

const rootReducer = combineReducers({
  status,
  previewState,
  landing,
  routing
});

export default rootReducer;
