import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { connect } from 'react-redux';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { getCurrentProfile } from '../../redux/profile/profile.actions';
import { selectProfile } from '../../redux/profile/profile.reducer';
import PropTypes from 'prop-types';

import './dashboard-page.styles.scss';
const DashboardPage = ({ getCurrentProfile, auth: { isAuthenticated, isLoading }, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <div className="itunes-dashboard-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
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
