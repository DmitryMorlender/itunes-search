import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './search-result-item.styles.scss';
const SearchItemComponent = ({ item }) => {
  const { trackId = '', artistName = '', artworkUrl100 = '', releaseDate = '' } = item;
  return (
    <Link
      to={{
        pathname: '/details',
        search: `trackId=${trackId}`
      }}>
      <div className="itunes-card">
        <div className="itunes-image">
          <img src={`${artworkUrl100}`} />
        </div>
        <div className="itunes-text">
          <h3>{`${artistName}`}</h3>
          <p>{`${moment(new Date(releaseDate)).format('ll')}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItemComponent;
