import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REFRESH_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };

    case REFRESH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
