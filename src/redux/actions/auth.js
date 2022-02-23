/* eslint-disable no-console */
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  SET_MESSAGE,
} from './types';

import AuthService from '../../services/auth.service';

export const login = (email, password) => dispatch => AuthService.login(email, password).then(
  data => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });

    return Promise.resolve();
  },
  error => {
    const message = error.response.status === 400 ? 'Inavlid Credentials' : (error.response
      && error.response.data
      && error.response.data.message)
    || error.message
    || error.toString();

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

export const refreshLogin = token => dispatch => AuthService.refreshLogin(token).then(
  data => {
    dispatch({
      type: REFRESH_SUCCESS,
      payload: { user: data },
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
      type: REFRESH_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

export const logout = () => dispatch => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
