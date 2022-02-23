import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import user from './user';
import patients from './patient';

export default combineReducers({
  auth,
  message,
  user,
  patients,
});
