import { combineReducers } from 'redux';
import alertReducer from '../alert/alert.reducer';
import authReducer from '../auth/auth/auth.reducer';
import usersReducer from '../users/users.reducer';
import searchReducer from '../search/search.reducer';

export default combineReducers({
  alertReducer,
  authReducer,
  usersReducer,
  searchReducer
});
