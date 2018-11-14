import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag'

import query from '../queries/fetchTodos'
import Checkbox from '../common/Checkbox'

class TodoList extends Component {

  constructor(props) {
    super(props);
      this.toggleCheckbox = this.toggleCheckbox.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount () {
    this.selectedCheckboxes = new Set();
  }


  toggleCheckbox (id) {
    if (this.selectedCheckboxes.has(id)) {
      this.selectedCheckboxes.delete(id);
    } else {
      this.selectedCheckboxes.add(id);
    }
  }

  handleFormSubmit (e) {
    e.preventDefault();

    console.log(this.selectedCheckboxes)

    for (const checkbox of this.selectedCheckboxes) {
      this.todoDelete(checkbox)
    }


  }

  todoDelete(id) {
    this.props.mutate({
      variables: { id },
    })
      .then(() => this.props.data.refetch())
  }

  renderTodos() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <Checkbox
          // key={id}
          id={id}
          title={title}
          handleCheckboxChange={this.toggleCheckbox}
          todoDelete={() => this.todoDelete(id)}
        />
      )
    })
  }

  render() {
    if(this.props.data.loading) {
      return (
        <div>Loading</div>
      )
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <ul className="collection">
          {this.renderTodos()}
        </ul>
        <button type='submit' className="waves-effect waves-light btn">
          Remove selected
          <i className="material-icons">delete</i>
        </button>
        <Link to={'/todo/new'}
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </form>
    )
  }
}

const mutation = gql`
mutation DeleteSong($id: ID) {
  deleteSong(id: $id) {
    id
  }
}
`;

export default  graphql(mutation)(
  graphql(query)(TodoList)
);
