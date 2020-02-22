import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, isLoading }, ...rest }) => (
  <Route {...rest} render={props => (!isAuthenticated && !isLoading ? <Redirect to="/login"></Redirect> : <Component {...props}></Component>)}></Route>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);
