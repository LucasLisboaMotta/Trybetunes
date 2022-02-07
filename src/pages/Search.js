import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import Card from '../components/Card';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      loading: false,
      search: false,
      artist: false,
    };
  }

  mapAlbuns = (artist) => {
    if (artist.length === 0) return <p>Nenhum álbum foi encontrado</p>;
    return artist.map((element) => <Card key={ element.collectionId } obj={ element } />);
  }

  inputChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  }

  buttonClick = async (value) => {
    this.setState({ loading: true });
    const artist = await searchAlbumsAPI(value);
    artist.forEach((art, index) => {
      Object.entries(art).forEach(([key, values]) => {
        artist[index][key] = `${values}`;
      });
    });
    this.setState({ loading: false, inputValue: '', artist, search: value });
  }

  render() {
    const { inputValue, loading, search, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <input
          type="text"
          value={ inputValue }
          onChange={ this.inputChange }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          disabled={ inputValue.length <= 1 }
          data-testid="search-artist-button"
          onClick={ () => this.buttonClick(inputValue) }
        >
          Pesquisar
        </button>
        {loading && <Carregando />}
        {search && <p>{`Resultado de álbuns de: ${search}`}</p>}
        {artist === false ? artist : this.mapAlbuns(artist)}
      </div>
    );
  }
}
