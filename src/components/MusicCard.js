import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      check: false,
      current: false,
    };
  }

  inputChange = async (checked, track) => {
    this.setState({ loading: true });
    if (checked) {
      await addSong(track);
      this.setState({ current: true, check: true });
    } else {
      await removeSong(track);
      this.setState({ current: false, check: true });
    }
    this.setState({ loading: false, check: true });
  }

  render() {
    const { track, favorites } = this.props;
    const { trackName, previewUrl, trackId } = track;
    const { check, loading, current } = this.state;
    const currentCheck = check ? current : favorites;
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
            name={ trackName }
            type="checkbox"
            checked={ currentCheck }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ ({ target: { checked } }) => this.inputChange(checked, track) }
          />
        </label>
        {loading && <Carregando />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favorites: PropTypes.bool.isRequired,
};
