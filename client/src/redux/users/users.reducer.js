import ProfileActionTypes from './users.types';
const INITIAL_STATE = {
  users: [],
  isLoading: true,
  error: {}
};

const usersReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ProfileActionTypes.GET_USERS:
      return { ...state, users: payload, isLoading: false };
    case ProfileActionTypes.USERS_ERROR:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

export default usersReducer;

const selectUsersState = state => state.usersReducer;

export const selectUsers = state => selectUsersState(state).users;
