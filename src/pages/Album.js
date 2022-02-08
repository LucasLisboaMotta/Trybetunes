import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      album: false,
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
    console.log(album);
    this.setState({ loading: false, album });
  }

  render() {
    const { loading, album } = this.state;
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
