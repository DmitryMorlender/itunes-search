import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/profile/profile.actions';
import { selectProfile } from '../../redux/profile/profile.reducer';
import PropTypes from 'prop-types';

const DashboardPage = ({ getCurrentProfile, auth: { isAuthenticated, isLoading }, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return <div>asdfasf</div>;
};

DashboardPage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.authReducer,
  profile: selectProfile(state)
});

export default connect(mapStateToProps, { getCurrentProfile })(DashboardPage);
