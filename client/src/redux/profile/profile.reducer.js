import ProfileActionTypes from './profile.types';
const INITIAL_STATE = {
  profile: null,
  profiles: [],
  isLoading: true,
  error: {}
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ProfileActionTypes.GET_PROFILE:
      return { ...state, profile: payload, isLoading: false };
    case ProfileActionTypes.PROFILE_ERROR:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

export default profileReducer;

const selectProfileState = state => state.profileReducer;

export const selectProfile = state => selectProfileState(state).profile;
