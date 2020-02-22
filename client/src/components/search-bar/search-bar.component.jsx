import React from 'react';
import { connect } from 'react-redux';
import useCollapse from 'react-collapsed';
import ClearIcon from '@material-ui/icons/Clear';
import { withRouter } from 'react-router-dom';
import TopSearchesContainer from '../../containers/top-searches.container';
import { search, onSearchTermChange, clearSearch, toggleTopSearchResultsSection } from '../../redux/search/search.actions';
import { selectIsAuthenticated } from '../../redux/auth/auth/auth.reducer';
import { selectSearchTerm, selectIsTopSearchResultsSectionOpen, selectIsTopSearchResultsSectionLoading, selectIsLoading } from '../../redux/search/search.reducer';
import Button from '@material-ui/core/Button';

import './search-bar.styles.scss';
const SearchBar = ({
  isLoading,
  isAthenticated,
  searchTerm,
  isTopSearchResultsSectionOpen,
  isTopSearchResultsSectionLoading,
  onSearchTermChange,
  clearSearch,
  search,
  history,
  toggleTopSearchResultsSection
}) => {
  const { getCollapseProps, getToggleProps, mountChildren } = useCollapse({ isOpen: isTopSearchResultsSectionOpen });

  const onSearchTextChange = e => onSearchTermChange(e.target.value);

  const searchForTerm = async () => {
    history && history.replace('/');
    await search(searchTerm, true);
  };

  const onSearchPressed = () => searchForTerm();

  const onEnterPress = async e => {
    if (e.keyCode === 13) {
      searchForTerm();
    }
  };

  return (
    <div className="itunes-search-container">
      <div className="itunes-search-holder">
        <div className="itunes-search-bar">
          <div className="itunes-search-field-container">
            <input type="text" id="searchInput" placeholder={`Find your Music...`} onKeyDown={onEnterPress} onChange={onSearchTextChange} value={searchTerm} />
            <ClearIcon className={`itunes-clear-search-btn ${searchTerm !== '' ? 'itunes-visible' : ''}`} onClick={clearSearch}></ClearIcon>
          </div>
          <Button size="large" variant="contained" color="secondary" className="itunes-search-btn" onClick={onSearchPressed} disabled={isLoading}>
            Search
          </Button>

          {isAthenticated && (
            <Button
              {...getToggleProps({ onClick: () => toggleTopSearchResultsSection() })}
              size="large"
              variant="contained"
              color="secondary"
              className={`itunes-top-searches-btn`}
              disabled={isTopSearchResultsSectionLoading}>
              {isTopSearchResultsSectionLoading ? 'Loading..' : 'Top 10 Searches'}
            </Button>
          )}
        </div>
      </div>
      {isAthenticated && (
        <div {...getCollapseProps()} className="itunes-top-searches-container">
          <TopSearchesContainer></TopSearchesContainer>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  searchTerm: selectSearchTerm(state),
  isAthenticated: selectIsAuthenticated(state),
  isTopSearchResultsSectionOpen: selectIsTopSearchResultsSectionOpen(state),
  isTopSearchResultsSectionLoading: selectIsTopSearchResultsSectionLoading(state),
  isLoading: selectIsLoading(state)
});

export default withRouter(connect(mapStateToProps, { search, onSearchTermChange, clearSearch, toggleTopSearchResultsSection })(SearchBar));
