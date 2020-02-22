import React from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { selectAlerts } from '../../redux/alert/alert.reducer';
import PropTypes from 'prop-types';

import './alert.styles.scss';
const AlertComponent = ({ alerts }) => {
  return (
    <div className="alert-container">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => {
          const { id, title = '', msg = '', type } = alert;
          if (!alert) return null;
          return (
            <Alert key={id} severity={type} className="alert">
              {title !== '' && <AlertTitle className="alert-title">{`${title}`}</AlertTitle>}
              <p>{`${msg}`}</p>
            </Alert>
          );
        })}
    </div>
  );
};

AlertComponent.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: selectAlerts(state)
});

export default connect(mapStateToProps)(AlertComponent);
