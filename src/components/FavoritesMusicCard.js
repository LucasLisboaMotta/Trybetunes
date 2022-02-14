import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FavoritesMusicCard extends Component {
  render() {
    const { track, inputChange } = this.props;
    const { trackName, previewUrl, trackId } = track;
    const checked = true;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackName }>
          Favorita
          <input
            id={ trackName }
            type="checkbox"
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => inputChange(track) }
          />
        </label>
      </div>
    );
  }
}

FavoritesMusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  inputChange: PropTypes.func.isRequired,
};
