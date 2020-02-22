import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroller';
import { loadMore } from '../../redux/search/search.actions';
import PropTypes from 'prop-types';
import { selectSearchResults, selectCurrentPageNamber, selectShouldLoadMore } from '../../redux/search/search.reducer';
import SearchResultsListComponent from '../../components/search-results-list/search-results-list.component';
import logo from '../../img/showcase_itunes.jpg';

import './home-page.styles.scss';
const HomePage = ({ data, loadMore, currentPageNumber, shouldLoadMore }) => {
  return (
    <section className="itunes-home-page">
      <div id="bg">
        <div className={`itunes-dark-overlay ${data && data.length > 0 ? 'itunes-darker-overlay' : ''}`}></div>
        <img src={logo} alt="" />
      </div>

      <div className="itunes-home-page-inner">
        {!data ? (
          <h1 className="itunes-main-title">
            Search for music you just.......<span className="itunes-main-title-emph">LOVE.</span>
          </h1>
        ) : data && data.length <= 0 ? (
          <h1 className="itunes-main-title">{`Sorry... no results found...`}</h1>
        ) : (
          <InfiniteScroll
            pageStart={currentPageNumber}
            loadMore={loadMore}
            initialLoad={false}
            hasMore={shouldLoadMore}
            loader={
              <div className="itunes-loader" key={0}>
                <Loader type="Puff" color="#e6e6e682" height={80} width={80} visible={true} />
              </div>
            }
            useWindow={true}>
            <SearchResultsListComponent data={data}></SearchResultsListComponent>
          </InfiniteScroll>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  data: selectSearchResults(state),
  currentPageNumber: selectCurrentPageNamber(state),
  shouldLoadMore: selectShouldLoadMore(state)
});

export default connect(mapStateToProps, { loadMore })(HomePage);
