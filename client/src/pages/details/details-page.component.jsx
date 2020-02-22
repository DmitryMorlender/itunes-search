import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import 'react-h5-audio-player/lib/styles.css';

import { selectResultByTrackId } from '../../redux/search/search.reducer';
import querystring from 'query-string';
import MediaPreviewComponent from '../../components/details/media-preview.component';

import { msToTime } from '../../helpers/time-helpers';

import './details-page.styles.scss';
const DetailsPage = ({ item = [], location }) => {
  console.log('THE ITEM IS: ', item);

  const [
    {
      artistName = '',
      previewUrl = '',
      collectionName = '',
      trackName = '',
      artistViewUrl = '',
      collectionViewUrl = '',
      trackViewUrl = '',
      artworkUrl100 = '',
      releaseDate = '',
      trackTimeMillis = '',
      country = '',
      currency = '',
      primaryGenreName = '',
      isStreamable = false
    } = {}
  ] = item && item.length > 0 ? item : [{}];

  return (
    <div className="details-container">
      <div className="artist-details-container">
        {item && item.length > 0 ? (
          <>
            <div className="top-artist-details">
              <div className="artist-details-image">
                <img src={`${artworkUrl100}`} />
              </div>
              <div className="artist-details">
                <div className="artist-details-name">{`${artistName}`}</div>
                <div className="artist-details-track">{`${trackName}`}</div>
                <div className="artist-details-collection">{`${collectionName}`}</div>
              </div>
            </div>
            <div className="middle-artist-details">
              <h1 className="dtails-title">{`Usefull Links:`}</h1>
              <div className="artist-preview-links">
                <a href={`${artistViewUrl}`} target="_blank">{`Learn More About: ${artistName.toUpperCase()}`}</a>
                <a href={`${collectionViewUrl}`} target="_blank">{`Learn More About '${collectionName.toUpperCase()}'`}</a>
                <a href={`${trackViewUrl}`} target="_blank">{`Learn More About '${trackName}'`}</a>
              </div>
            </div>
            <div className="more-details-and-preview-container">
              <div className="more-details">
                <h1 className="dtails-title">{`More Details`}</h1>
                <p className="">{`Release Date: ${moment(new Date(releaseDate)).format('ll')}`}</p>
                <p className="">{`Time: ${msToTime(trackTimeMillis)}`}</p>
                <p className="">{`Currency: ${currency}`}</p>
                <p className="">{`Primary Genre: ${primaryGenreName}`}</p>
                <p className="">{`Country: ${country}`}</p>
              </div>
              <MediaPreviewComponent previewUrl={previewUrl} isVideo={previewUrl.includes('m4v')} />
            </div>
          </>
        ) : (
          <h1>Sorry.. no details at the moment</h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { location: { search = '' } = {} } = ownProps || {};
  const parsedQuery = querystring.parse(search);
  const { trackId } = parsedQuery;
  return {
    item: selectResultByTrackId(state, Number(trackId))
  };
};
export default connect(mapStateToProps)(DetailsPage);
