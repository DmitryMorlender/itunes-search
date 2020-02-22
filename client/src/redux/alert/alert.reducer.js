import AlertActionTypes from './alert.types';
import { removeAlert } from './alert.utils';

const INITIAL_STATE = [];
const alertReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case AlertActionTypes.SET_ALERT:
      return [...state, payload];
    case AlertActionTypes.REMOVE_ALERT:
      return removeAlert(state, payload);
    default:
      return state;
  }
};

export default alertReducer;

const selectAlertReducer = state => state.alertReducer;

export const selectAlerts = state => selectAlertReducer(state);
