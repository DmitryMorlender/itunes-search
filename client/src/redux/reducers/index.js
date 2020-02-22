import { combineReducers } from 'redux';
import alertReducer from '../alert/alert.reducer';
import authReducer from '../auth/auth/auth.reducer';
import profileReducer from '../profile/profile.reducer';
import searchReducer from '../search/search.reducer';

export default combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
  searchReducer
});
