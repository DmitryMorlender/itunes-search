import UsersActionTypes from './users.types';
import { setAlert } from '../alert/alert.actions';
import API, { setToken } from '../../services/httpService';

export const getUsers = () => async dispatch => {
  try {
    const res = await setToken().get('/api/users');
    dispatch({ type: UsersActionTypes.GET_USERS, payload: res.data });
  } catch (error) {
    const { response: { statusText = '', status = '' } = {} } = error || {};
    dispatch({ type: UsersActionTypes.USERS_ERROR, payload: { msg: statusText, httpStatus: status } });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const res = await setToken().delete(`/api/users/${id}`);
    console.log('delete user response: ', res);
    // dispatch({ type: UsersActionTypes.GET_USERS, payload: res.data });
  } catch (error) {
    const { response: { statusText = '', status = '' } = {} } = error || {};
    dispatch({ type: UsersActionTypes.USERS_ERROR, payload: { msg: statusText, httpStatus: status } });
  }
};
