import uuid from 'uuid';
import AlertActionTypes from './alert.types';

export const setAlert = (title, msg, type, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: AlertActionTypes.SET_ALERT,
    payload: {
      id,
      title,
      msg,
      type
    }
  });

  setTimeout(() => dispatch({ type: AlertActionTypes.REMOVE_ALERT, payload: id }), timeout);
};
