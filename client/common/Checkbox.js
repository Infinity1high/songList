import React, { Component } from 'react';

class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

   toggleCheckboxChange() {

    const { handleCheckboxChange, id } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(id);
  }

  render() {
    console.log(this.props)
    const { title, id, todoDelete } = this.props;
    const { isChecked } = this.state;

    return (
      <li className="collection-item">

        <label className="checkbox">
          <input
            type="checkbox"
            value={id}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          <span>{title}</span>
        </label>
        <i
          className="material-icons"
          onClick={() => todoDelete(id)}
        >
          delete
        </i>
      </li>
    );
  }
}

export default Checkbox;
