import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)
    {
      this.state = {
        todoItem: '',
        onSubmit: this.onSubmit.bind(this)
      }

    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.todoItem
      },
      refetchQueries: [{ query }]
    })
      .then(() => hashHistory.push('/'))
      .catch(err => console.log(err))
  }

  render() {

    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create new Song</h3>
        <form onSubmit={this.state.onSubmit}>
          <label>New song</label>
          <input
            onChange={e => this.setState({ todoItem: e.target.value })}
            value={this.state.todoItem}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
