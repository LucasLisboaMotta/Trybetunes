import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ loading: false, userName: name });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Carregando />
          : <h1 data-testid="header-user-name">{ userName }</h1> }
        <nav>
          <ul>
            <Link to="/search"><li>Search</li></Link>
            <Link to="/album/:id"><li>Album</li></Link>
            <Link to="/favorites"><li>Favorites</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
            <Link to="/profile/edit"><li>Profile Edit</li></Link>
          </ul>
        </nav>

      </header>
    );
  }
}
