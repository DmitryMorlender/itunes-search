import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
import PropTypes from 'prop-types';

import ALERT_TYPES from '../../../helpers/alertTypes';
import { selectIsAuthenticated } from '../../../redux/auth/auth/auth.reducer';
import { setAlert } from '../../../redux/alert/alert.actions';
import { register } from '../../../redux/auth/auth/auth.actions';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: 'Concert One',
    fontSize: '1.2rem'
  }
}));

const RegisterPage = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { firstName = '', lastName = '', email = '', password = '' } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      const newUser = { name: `${firstName} ${lastName}`, email, password };
      register(newUser);
    } else {
      setAlert('Error', 'All fields are required', ALERT_TYPES.ERROR, 1000);
    }
  };

  // Redirect if the user registered successfully
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline></CssBaseline>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontFamily: 'Concert One', fontSize: '4rem' }}>
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={firstName === ''}
                autoComplete="fname"
                value={firstName}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                color="secondary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={lastName === ''}
                variant="outlined"
                value={lastName}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                color="secondary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={email === ''}
                variant="outlined"
                value={email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="secondary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={password === ''}
                variant="outlined"
                value={password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                onChange={onChange}
              />
            </Grid>
          </Grid>

          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Link href="/login" variant="body2" style={{ fontFamily: 'Concert One', fontSize: '1rem' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="secondary" size="large" className={classes.submit}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

RegisterPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state)
});

export default connect(mapStateToProps, { setAlert, register })(RegisterPage);
