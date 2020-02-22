export const RESULTS_PER_PAGE = 25;

export const shouldLoadMore = resultCount => resultCount === RESULTS_PER_PAGE;

export const appendNewLoadedResults = (state, payload) => {
  const { searchResults: currentSearchResults = {} } = state || {};
  const { results: currentResults = [], resultCount: currentResultCount = 0 } = currentSearchResults || {};
  const { resultCount: newResultCount, results: newResults = [] } = payload || {};
  const newResultsCount = currentResultCount + newResultCount;
  const newSearchResults = { ...currentSearchResults, results: [...currentResults, ...newResults], resultCount: newResultsCount };
  return newSearchResults;
};

export const updatePageNumber = (state, payload) => {
  const { searchResults: currentSearchResults = {} } = state || {};
  const { resultCount: currentResultCount = 0 } = currentSearchResults || {};
  const { resultCount: newResultCount } = payload || {};
  return Math.floor((currentResultCount + newResultCount) / RESULTS_PER_PAGE);
};
