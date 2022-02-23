import {
  PATIENT_SUCCESS,
  PATIENT_FAIL,
  SET_MESSAGE,
} from './types';

import UserService from '../../services/user.service';

export default () => async dispatch => UserService.getPatients().then(
  response => {
    dispatch({
      type: PATIENT_SUCCESS,
      payload: { patients: response.data },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
    dispatch({
      type: PATIENT_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);
