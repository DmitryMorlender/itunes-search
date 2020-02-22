import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/auth/auth/auth.actions';
import { selectIsAuthenticated, selectIsLoading } from '../../../redux/auth/auth/auth.reducer';
import { Link } from 'react-router-dom';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import SearchBar from '../../search-bar/search-bar.component';

import './nav-bar.styles.scss';
const NavBar = ({ isAuthenticated = false, isLoading, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="#!" onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <Headroom>
      <nav className="itunes-navbar itunes-bg-dark">
        <h1>
          <Link to="/">
            <div className="itunes-home-icon">
              <LibraryMusicSharpIcon fontSize="large"></LibraryMusicSharpIcon>
              <span style={{ marginLeft: '10px' }}>iTunes Search</span>
            </div>
          </Link>
        </h1>
        <SearchBar></SearchBar>
        {!isLoading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </nav>
    </Headroom>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  isLoading: selectIsLoading(state)
});

export default connect(mapStateToProps, { logout })(NavBar);
