import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';

import './media-preview.styles.scss';
const MediaPreviewComponent = ({ previewUrl = '', isVideo }) => {
  return (
    previewUrl &&
    previewUrl !== '' && (
      <div className={`preview ${!isVideo ? 'full-width' : ''}`}>
        {isVideo ? (
          <div className="video-preview">
            <ReactPlayer controls={true} url={`${previewUrl}`} style={{ position: 'relative' }} />
          </div>
        ) : (
          <div className="audio-preview">
            <AudioPlayer src={`${previewUrl}`}></AudioPlayer>
          </div>
        )}
      </div>
    )
  );
};

export default MediaPreviewComponent;
