import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../componentes/Carregando';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      loading: false,
      redirect: false,
    };
  }

  inputChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  }

  buttonClick = async (value) => {
    this.setState({ loading: true });
    await createUser({ name: value });
    this.setState({ loading: false, inputValue: '', redirect: true });
  }

  render() {
    const { state: { inputValue, loading, redirect }, inputChange, buttonClick } = this;
    return (
      <div data-testid="page-login">
        Login
        <br />
        <input
          type="text"
          value={ inputValue }
          data-testid="login-name-input"
          onChange={ inputChange }
        />
        <button
          type="button"
          disabled={ inputValue.length <= 2 }
          data-testid="login-submit-button"
          onClick={ () => buttonClick(inputValue) }
        >
          Entrar
        </button>
        { loading && <Carregando />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}
