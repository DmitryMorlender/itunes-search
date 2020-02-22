import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';

import './media-preview.styles.scss';
const MediaPreviewComponent = ({ previewUrl = '', isVideo }) => {
  return (
    previewUrl &&
    previewUrl !== '' && (
      <div className={`itunes-preview ${!isVideo ? 'itunes-full-width' : ''}`}>
        {isVideo ? (
          <div className="itunes-video-preview">
            <ReactPlayer controls={true} url={`${previewUrl}`} style={{ position: 'relative' }} />
          </div>
        ) : (
          <div className="itunes-audio-preview">
            <AudioPlayer src={`${previewUrl}`}></AudioPlayer>
          </div>
        )}
      </div>
    )
  );
};

export default MediaPreviewComponent;
