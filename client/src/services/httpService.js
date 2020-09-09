import axios from 'axios';

export const setToken = () => {
  const token = localStorage.getItem('token');
  if (!!token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }

  return axios.create({
    baseURL: `http://localhost:9999/`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export default axios.create({
  baseURL: `http://localhost:9999/`,
  headers: {
    'Content-Type': 'application/json'
  }
});
