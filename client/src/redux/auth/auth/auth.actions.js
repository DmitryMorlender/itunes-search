import API from '../../../services/httpService';
import { setAlert } from '../../alert/alert.actions';
import AuthActionTypes from './auth.types';
import ALERT_TYPES from '../../../helpers/alertTypes';
import { setToken } from '../../../services/httpService';
export const loginUser = ({ email, password }) => async dispatch => {
  try {
    const newUser = { email, password };
    const body = JSON.stringify(newUser);
    const res = await API.post('/api/auth', body);
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: res.data });
    dispatch(authenticateUser());
  } catch (error) {
    const { response: { data: { errors = [] } = {} } = {} } = error || {};
    if (errors) {
      errors.forEach(error => dispatch(setAlert('Login Error', error.msg, ALERT_TYPES.ERROR, 3000)));
    }
    if (error.message.includes('Network Error')) {
      dispatch(setAlert('Network Error', 'Could not reach the server', ALERT_TYPES.ERROR, 3000));
    }
    dispatch({ type: AuthActionTypes.LOGIN_FAIL });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  try {
    const newUser = { name, email, password };
    const body = JSON.stringify(newUser);
    const res = await API.post('/api/users', body);
    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: res.data });
    dispatch(authenticateUser());
  } catch (error) {
    const { response: { data: { errors = [] } = {} } = {} } = error || {};
    if (errors) {
      errors.forEach(error => dispatch(setAlert('Register Error', error.msg, ALERT_TYPES.ERROR, 3000)));
    }
    if (error.message.includes('Network Error')) {
      dispatch(setAlert('Network Error', 'Could not reach the server', ALERT_TYPES.ERROR, 3000));
    }
    dispatch({ type: AuthActionTypes.REGISTER_FAIL });
  }
};

export const authenticateUser = () => async dispatch => {
  try {
    const res = await setToken().get('/api/auth');
    dispatch({ type: AuthActionTypes.USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AuthActionTypes.AUTH_ERROR });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: AuthActionTypes.LOGOUT });
};
