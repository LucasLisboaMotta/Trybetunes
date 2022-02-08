import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      check: false,
      loading: false,
    };
  }

  inputChange = async (check, track) => {
    this.setState({ loading: true });
    await addSong(track);
    this.setState({ loading: false, check: !check });
  }

  render() {
    const { track } = this.props;
    const { trackName, previewUrl, trackId } = track;
    const { check, loading } = this.state;
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
            value={ check }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.inputChange(check, track) }
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
};
