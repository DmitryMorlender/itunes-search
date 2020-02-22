import React from 'react';

import TopSearchItemComponent from './top-search-item/top-search-item.component';

import './top-searches.styles.scss';
const TopSearchesComponent = ({ items, onTopSearchTermClick }) => {
  return (
    <div className="flex-list">
      <ul className="sorter">
        {items.map((item, id) => {
          const { name: searchTerm, value: numberOfSearches } = item;
          return <TopSearchItemComponent key={`${item}-${id}`} searchTerm={searchTerm} numberOfSearches={numberOfSearches} onTopSearchTermClick={onTopSearchTermClick}></TopSearchItemComponent>;
        })}
      </ul>
    </div>
  );
};

export default TopSearchesComponent;
