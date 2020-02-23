import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/users/users.actions';
import PropTypes from 'prop-types';
import UsersTableComponent from '../../containers/users-table.component';

import './dashboard-page.styles.scss';
const DashboardPage = ({ getUsers, auth: { isAuthenticated, isLoading } }) => {
  // _id: "5e4d40d8e9a81f5386af19b4"
  // name: "Dima Mor"
  // email: "test@test.com"
  // avatar: "//www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=200&r=pg&d=mm"
  // date: "2020-02-19T14:06:16.227Z"

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="itunes-dashboard-container">
      <div className="itunes-dashboard-table-container">
        <h1 className="itunes-main-title">User Managment</h1>
        <UsersTableComponent />
      </div>
    </div>
  );
};

DashboardPage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps, { getUsers })(DashboardPage);
