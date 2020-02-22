import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Header from './components/layout/header/header.component';
import PrivateRoute from './routing/private-route';
// pages
import HomePage from './pages/Home/home-page.component';
import LoginPage from './pages/auth/login/login-page.component';
import RegisterPage from './pages/auth/register/register-page.component';
import DashboardPage from './pages/dashboard/dashboard-page.component';
import DetailsPage from './pages/details/details-page.component';
// components
import AlertComponent from './components/alert/alert.component';
import { authenticateUser } from './redux/auth/auth/auth.actions';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(authenticateUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Header></Header>
          <Route exact path="/" component={HomePage}></Route>
          <section className="itunes-container">
            <AlertComponent></AlertComponent>
            <Switch>
              <Route exact path="/register" component={RegisterPage}></Route>
              <Route exact path="/login" component={LoginPage}></Route>
              <Route exact path="/details" component={DetailsPage}></Route>
              <PrivateRoute exact path="/dashboard" component={DashboardPage}></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
