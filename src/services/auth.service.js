import axios from 'axios';

const login = (email, password) => axios
  .post(`${process.env.REACT_APP_BASE_URL}/rest/v2/oauth/token`, null, {
    params: {
      // eslint-disable-next-line
      'grant_type': 'password',
      // eslint-disable-next-line
      'username': email,
      // eslint-disable-next-line
      'password': password,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // eslint-disable-next-line
      'Authorization': process.env.REACT_APP_LOGIN_BASE_KEY,
    },

  })
  .then(response => {
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const refreshLogin = token => axios
  .post(`${process.env.REACT_APP_BASE_URL}/rest/v2/oauth/token`, null, {
    params: {
      // eslint-disable-next-line
      "grant_type": "refresh_token",
      // eslint-disable-next-line
      "refresh_token": token,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // eslint-disable-next-line
      'Authorization': process.env.REACT_APP_LOGIN_BASE_KEY,
    },

  })
  .then(response => {
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
  refreshLogin,
};
