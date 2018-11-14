import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSong'
import LyricCreate from './LyricCreate';

class SongDetail extends Component {

  render() {

    const { song } = this.props.data;
    if(!song) {
      return null
    }
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Song detail</h3>
      </div>
    )
  }
}

export default graphql(query, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);
