import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      // loading: false,
      // redirect: false,
    };
  }

  inputChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  }

  render() {
    const { state: { inputValue }, inputChange } = this;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <input
          type="text"
          value={ inputValue }
          onChange={ inputChange }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          disabled={ inputValue.length <= 1 }
          data-testid="search-artist-button"
          // onClick={ () => buttonClick(inputValue) }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
