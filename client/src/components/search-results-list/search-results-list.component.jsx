import React from 'react';

import SearchItemComponent from '../search-result-item/search-result-item.component';

import './search-results-list.styles.scss';
const SearchResultsListComponent = ({ data = [] }) => {
  return (
    <div className="itunes-app-card-list">
      {data.map((item, index) => (
        <SearchItemComponent key={`${index}-${item.artworkUrl100}`} item={item}></SearchItemComponent>
      ))}
    </div>
  );
};

export default SearchResultsListComponent;
