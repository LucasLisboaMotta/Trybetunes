import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { obj: { artistName, collectionId, artworkUrl100, collectionName },
    } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          {`${artistName} // ${collectionName}`}
          <img alt={ collectionName } src={ artworkUrl100 } />
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  obj: PropTypes.objectOf(PropTypes.string).isRequired,
};
