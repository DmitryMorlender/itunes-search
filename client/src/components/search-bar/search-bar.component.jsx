import React from 'react';
import { connect } from 'react-redux';
import useCollapse from 'react-collapsed';
import ClearIcon from '@material-ui/icons/Clear';
import { withRouter } from 'react-router-dom';
import TopSearchesContainer from '../../containers/top-searches.container';
import { search, onSearchTermChange, clearSearch, toggleTopSearchResultsSection } from '../../redux/search/search.actions';
import { selectIsAuthenticated } from '../../redux/auth/auth/auth.reducer';
import { selectSearchTerm, selectIsTopSearchResultsSectionOpen, selectIsTopSearchResultsSectionLoading } from '../../redux/search/search.reducer';
import Button from '@material-ui/core/Button';

import './search-bar.styles.scss';
const SearchBar = ({
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
    <div className="search-container">
      <div className="search-holder">
        <div className="search-bar">
          <div className="search-field-container">
            <input type="text" id="searchInput" placeholder={`Find your Music...`} onKeyDown={onEnterPress} onChange={onSearchTextChange} value={searchTerm} />
            <ClearIcon className={`clear-search-btn ${searchTerm !== '' ? 'visible' : ''}`} onClick={clearSearch}></ClearIcon>
          </div>
          <Button size="large" variant="contained" color="secondary" className="search-btn" onClick={onSearchPressed}>
            Search
          </Button>

          {isAthenticated && (
            <Button
              {...getToggleProps({ onClick: () => toggleTopSearchResultsSection() })}
              size="large"
              variant="contained"
              color="secondary"
              className={`top-searches-btn`}
              disabled={isTopSearchResultsSectionLoading}>
              {isTopSearchResultsSectionLoading ? 'Loading..' : 'Top 10 Searches'}
            </Button>
          )}
        </div>
      </div>
      {isAthenticated && (
        <div {...getCollapseProps()} className="top-searches-container">
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
  isTopSearchResultsSectionLoading: selectIsTopSearchResultsSectionLoading(state)
});

export default withRouter(connect(mapStateToProps, { search, onSearchTermChange, clearSearch, toggleTopSearchResultsSection })(SearchBar));
