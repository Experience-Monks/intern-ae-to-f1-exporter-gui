import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import status from './exporter';
import animationState from './animationState';
import preview from './preview';

const rootReducer = combineReducers({
  status,
  animationState,
  preview,
  routing
});

export default rootReducer;
