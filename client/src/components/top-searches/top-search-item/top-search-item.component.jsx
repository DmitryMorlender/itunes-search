import React from 'react';

import './top-search-item.styles.scss';
const TopSearchItemComponent = ({ searchTerm, numberOfSearches, onTopSearchTermClick }) => {
  return (
    <li>
      <a href="#" onClick={() => onTopSearchTermClick(searchTerm)}>
        {`${searchTerm} : ${numberOfSearches}`}
      </a>
    </li>
  );
};

export default TopSearchItemComponent;
