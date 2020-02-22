import ProfileActionTypes from './profile.types';
import { setAlert } from '../alert/alert.actions';
import API, { setToken } from '../../services/httpService';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await setToken().get('/api/profile/me');
    dispatch({ type: ProfileActionTypes.GET_PROFILE, payload: res.data });
  } catch (error) {
    const { response: { statusText = '', status = '' } = {} } = error || {};
    dispatch({ type: ProfileActionTypes.PROFILE_ERROR, payload: { msg: statusText, httpStatus: status } });
  }
};
