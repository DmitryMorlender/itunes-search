import SearchActionTypes from './search.types';
import { RESULTS_PER_PAGE } from './search.utils';
import { shouldLoadMore, appendNewLoadedResults, updatePageNumber } from './search.utils';

const INITIAL_STATE = {
  searchTerm: '',
  currentPage: 0,
  shouldLoadMore: true,
  searchResults: null,
  topSearches: null,
  isTopSearchResultsSectionOpen: false,
  isTopSearchResultsSectionLoading: false,
  isLoading: false,
  error: {}
};

const searchReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SearchActionTypes.SEARCH_TERM_CHANGED:
      return { ...state, searchTerm: payload };
    case SearchActionTypes.SEARCH:
      return { ...state, isLoading: true, currentPage: 0, searchResults: null };
    case SearchActionTypes.TOGGLE_TOP_SEARCH_RESULTS_SECTION:
      const old = state.isTopSearchResultsSectionOpen;
      return { ...state, isTopSearchResultsSectionOpen: !old };
    case SearchActionTypes.SEARCH_SUCCESS:
    case SearchActionTypes.LOAD_MORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
        searchResults: appendNewLoadedResults(state, payload),
        currentPage: updatePageNumber(state, payload),
        shouldLoadMore: shouldLoadMore(payload.resultCount)
      };
    case SearchActionTypes.SEARCH_FAIL:
      return { ...state, searchResults: null, isLoading: false };
    case SearchActionTypes.TOP_SEARCHES_LOAD:
      return { ...state, isTopSearchResultsSectionLoading: true };
    case SearchActionTypes.TOP_SEARCHES_SUCCESS:
      console.log('GOT TOP RESULTS: ', payload);
      return { ...state, topSearches: payload, isTopSearchResultsSectionLoading: false };
    case SearchActionTypes.TOP_SEARCHES_FAIL:
      return { ...state, topSearches: null, isTopSearchResultsSectionLoading: false };
    case SearchActionTypes.CLEAR_SEARCH:
      return { ...INITIAL_STATE, topSearches: state.topSearches };
    default:
      return state;
  }
};

export default searchReducer;

const selectSearchState = state => state.searchReducer;

export const selectSearchResults = state => {
  const homeState = selectSearchState(state) || {};
  const { searchResults } = homeState;
  const { results } = searchResults || {};
  return results;
};

export const selectSearchTerm = state => selectSearchState(state).searchTerm;

export const selectIsLoading = state => selectSearchState(state).isLoading;

export const selectErrors = state => selectSearchState(state).error;

export const selectCurrentPageNamber = state => selectSearchState(state).currentPage;

export const selectShouldLoadMore = state => selectSearchState(state).shouldLoadMore;

export const selectTopSearches = state => selectSearchState(state).topSearches;

export const selectIsTopSearchResultsSectionOpen = state => selectSearchState(state).isTopSearchResultsSectionOpen;

export const selectIsTopSearchResultsSectionLoading = state => selectSearchState(state).isTopSearchResultsSectionLoading;

export const selectResultByTrackId = (state, trackId) => {
  const searchResults = selectSearchResults(state);
  if (!searchResults) {
    return null;
  }
  return searchResults.filter(item => item.trackId === trackId);
};
