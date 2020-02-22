import AuthActionTypes from './auth.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, isLoading: false };
    case AuthActionTypes.USER_LOADED:
      return { ...state, isAuthenticated: true, isLoading: false, user: payload };
    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('token');
      return { ...state, isAuthenticated: false, isLoading: false, user: null, token: null };

    default:
      return state;
  }
};

const selectAuthState = state => state.authReducer;

export const selectIsAuthenticated = state => selectAuthState(state).isAuthenticated;

export const selectIsLoading = state => selectAuthState(state).isLoading;

export default authReducer;
