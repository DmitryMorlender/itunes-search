import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTopSearches, onSearchTermChange, search, toggleTopSearchResultsSection } from '../redux/search/search.actions';
import { selectTopSearches } from '../redux/search/search.reducer';
import TopSearchesComponent from '../components/top-searches/top-searches.component';
import NoTopSearchesComponent from '../components/top-searches/no-top-searches/no-top-searches.component';

const TopSearchesContainer = ({ search, onSearchTermChange, toggleTopSearchResultsSection, getTopSearches, topSearches, history }) => {
  useEffect(() => {
    getTopSearches();
  }, []);

  const onTopSearchTermClick = async searchTerm => {
    onSearchTermChange(searchTerm);
    toggleTopSearchResultsSection();
    await search(searchTerm, true);
    history && history.replace('/');
  };

  if (!topSearches) {
    return null;
  }

  return topSearches.length === 0 ? <NoTopSearchesComponent /> : <TopSearchesComponent items={topSearches} onTopSearchTermClick={onTopSearchTermClick}></TopSearchesComponent>;
};

const mapStateToProps = state => ({
  topSearches: selectTopSearches(state)
});

const mapDispatchToProps = { getTopSearches, onSearchTermChange, search, toggleTopSearchResultsSection };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopSearchesContainer));
