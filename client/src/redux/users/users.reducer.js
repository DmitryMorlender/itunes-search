import UsersActionTypes from './users.types';
const INITIAL_STATE = {
  users: [],
  areUsersLoading: true,
  error: {}
};

const usersReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UsersActionTypes.GET_USERS:
      return { ...state, users: [], areUsersLoading: true };
    case UsersActionTypes.GET_USERS_SUCCESS:
      return { ...state, users: payload, areUsersLoading: false };
    case UsersActionTypes.USERS_ERROR:
      return { ...state, error: payload, areUsersLoading: false };
    case UsersActionTypes.REMOVE_USER:
      const currentUsers = [...state.users];
      return { ...state, users: currentUsers.filter(user => user._id !== payload.removedUser._id) };
    default:
      return state;
  }
};

export default usersReducer;

const selectUsersState = state => state.usersReducer;

export const selectUsers = state => selectUsersState(state).users;

export const selectAreUsersLoading = state => selectUsersState(state).areUsersLoading;
