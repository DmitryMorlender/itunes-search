import React from 'react';

import './no-top-searches.styles.scss';
const NoTopSearchesComponent = ({ text = 'No, searches' }) => {
  return (
    <div className="itunes-no-top-searches-container">
      <p>{`${text}...`}</p>
    </div>
  );
};

export default NoTopSearchesComponent;
