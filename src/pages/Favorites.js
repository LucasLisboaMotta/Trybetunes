import React, { Component } from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import FavoritesMusicCard from '../components/FavoritesMusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.renderMusic();
  }

  renderMusic = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favorites });
  }

  inputChange = async (track) => {
    this.setState({ loading: true });
    await removeSong(track);
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favorites });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Carregando />}
        {favorites.map((track) => (<FavoritesMusicCard
          key={ track.trackId }
          track={ track }
          inputChange={ this.inputChange }
        />
        ))}
      </div>
    );
  }
}
