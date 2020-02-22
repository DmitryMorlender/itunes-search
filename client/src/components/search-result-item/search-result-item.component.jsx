import React from 'react';
import { Link } from 'react-router-dom';
import './search-result-item.styles.scss';
const SearchItemComponent = ({ item }) => {
  const {
    trackId = '1440661545',
    artistName = 'Justin Bieber',
    artworkUrl100 = 'https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/cc/e4/f8/cce4f828-85bb-ad43-08cf-9c30447bdc50/source/100x100bb.jpg',
    releaseDate = '2012-06-15T12:00:00Z'
  } = item;
  return (
    <Link
      to={{
        pathname: '/details',
        search: `trackId=${trackId}`
      }}>
      <div className="card">
        <div className="image">
          <img src={`${artworkUrl100}`} />
        </div>
        <div className="text">
          <h3>{`${artistName}`}</h3>
          <p>{`${releaseDate}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItemComponent;
