import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ALERT_TYPES from '../../../helpers/alertTypes';
import { selectIsAuthenticated } from '../../../redux/auth/auth/auth.reducer';
import { setAlert } from '../../../redux/alert/alert.actions';
import { loginUser } from '../../../redux/auth/auth/auth.actions';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: 'Concert One',
    fontSize: '1.2rem'
  }
}));

const LoginPage = ({ setAlert, loginUser, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email = '', password = '' } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (email && password) {
      loginUser({ email, password });
    } else {
      setAlert('Login Error', 'The fields cant be empty', ALERT_TYPES.ERROR, 3000);
    }
  };

  // Redirect if the user is logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontFamily: 'Concert One', fontSize: '4rem' }}>
          Log in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            error={email === ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
            value={email}
            onChange={onChange}
          />
          <TextField
            error={password === ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
            value={password}
            onChange={onChange}
          />
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Link href="/register" variant="body2" style={{ fontFamily: 'Concert One', fontSize: '1rem' }}>
                {"Don't have an account? Register"}
              </Link>
            </Grid>
            <Grid item>
              <Button type="submit" size="large" variant="contained" color="secondary" className={classes.submit}>
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state)
});

export default connect(mapStateToProps, { setAlert, loginUser })(LoginPage);
