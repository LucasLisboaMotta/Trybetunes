import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      album: false,
      favorites: false,
    };
  }

  componentDidMount() {
    this.renderMusic();
  }

  renderMusic = async () => {
    this.setState({ loading: true });
    const { props: { match: { params: { id } } } } = this;
    if (id === ':id') return;
    const album = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, album, favorites });
  }

  render() {
    const { loading, album, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && Carregando}
        {album && <h2 data-testid="artist-name">{album[0].artistName}</h2>}
        {album && <h3 data-testid="album-name">{album[0].collectionName}</h3>}
        {album && album.filter(({ trackId }) => trackId)
          .map((track) => (<MusicCard
            key={ track.previewUrl }
            track={ track }
            favorites={ favorites.some(({ trackId }) => trackId === track.trackId) }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
