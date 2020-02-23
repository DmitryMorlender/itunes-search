import UsersActionTypes from './users.types';
import ALERT_TYPES from '../../helpers/alertTypes';
import { setAlert } from '../alert/alert.actions';
import { setToken } from '../../services/httpService';

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
    dispatch({ type: UsersActionTypes.REMOVE_USER, payload: res.data });
  } catch (error) {
    dispatch(setAlert('Error', error.message, ALERT_TYPES.ERROR, 3000));
    dispatch({ type: UsersActionTypes.USERS_ERROR, payload: error.message });
  }
};
