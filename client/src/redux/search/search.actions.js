import SearchActionTypes from './search.types';
import { RESULTS_PER_PAGE } from './search.utils';
import API from '../../services/httpService';
import querystring from 'query-string';
import { setToken } from '../../services/httpService';

import { setAlert } from '../alert/alert.actions';
import ALERT_TYPES from '../../helpers/alertTypes';

export const search = (term, isNewSearch = false) => async (dispatch, getState) => {
  const searchState = getState();
  const {
    searchReducer: { currentPage: pageNumber }
  } = searchState || {};

  try {
    if (term === '') {
      return;
    }

    dispatch({ type: SearchActionTypes.SEARCH });
    const query = querystring.stringify({ term, limit: 25, offset: isNewSearch ? 0 : pageNumber * RESULTS_PER_PAGE });
    const res = await setToken().get(`/api/search?${query}`);
    dispatch({ type: SearchActionTypes.SEARCH_SUCCESS, payload: res.data });
    dispatch(getTopSearches());
  } catch (error) {
    console.error('SEARCH FAILED: ', error);
    dispatch(setAlert('Network Error', 'Could not reach the server', ALERT_TYPES.ERROR, 3000));
    dispatch({ type: SearchActionTypes.SEARCH_FAIL });
  }
};

export const toggleTopSearchResultsSection = () => ({ type: SearchActionTypes.TOGGLE_TOP_SEARCH_RESULTS_SECTION });

export const onSearchTermChange = searchTerm => ({ type: SearchActionTypes.SEARCH_TERM_CHANGED, payload: searchTerm });

export const loadMore = () => async (dispatch, getState) => {
  try {
    const searchState = getState();
    const {
      searchReducer: { searchTerm, currentPage: pageNumber }
    } = searchState || {};

    const query = querystring.stringify({ term: searchTerm, limit: 25, offset: pageNumber * RESULTS_PER_PAGE });
    const res = await setToken().get(`/api/search?${query}`);
    dispatch({ type: SearchActionTypes.LOAD_MORE_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('SEARCH FAILED: ', error);
    dispatch(setAlert('Network Error', 'Could not reach the server', ALERT_TYPES.ERROR, 3000));
    dispatch({ type: SearchActionTypes.LOAD_MORE_FAIL });
  }
};

export const getTopSearches = () => async dispatch => {
  try {
    dispatch({ type: SearchActionTypes.TOP_SEARCHES_LOAD });
    const res = await setToken().get(`/api/search/top-searches`);
    dispatch({ type: SearchActionTypes.TOP_SEARCHES_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('SEARCH FAILED: ', error);
    dispatch({ type: SearchActionTypes.TOP_SEARCHES_FAIL });
  }
};

export const clearSearch = () => ({ type: SearchActionTypes.CLEAR_SEARCH });
