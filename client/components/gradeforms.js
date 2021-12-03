import { faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

class Gradeform extends Component {
  state = {
    id: '',
    name: '',
    course: '',
    grade: '',
  };

  handleChange = (e) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const currentGrades = this.props.grades;
    const currentId = currentGrades[currentGrades.length - 1].id;
    const nextId = Math.round(Math.random() * 10) + parseInt(currentId);
    this.setState({
      [name]: value,
      id: nextId,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const parseIntGrade = parseInt(this.state.grade);
    const newStudent = {
      id: this.state.id,
      name: this.state.name,
      course: this.state.course,
      grade: parseIntGrade,
    };
    this.setState(
      {
        id: '',
        name: '',
        course: '',
        grade: '',
      },
      () => this.props.onSubmit(newStudent)
    );
  };

  handleReset = () => {
    this.setState({
      name: '',
      course: '',
      grade: '',
    });
  };

  render() {
    return (
      <div className='enter-form'>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <div className='form-section'>
            <label htmlFor='name'>
              <FontAwesomeIcon icon={faUser} size='lg' />
            </label>
            <input
              type='text'
              placeholder='name'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-section'>
            <label htmlFor='course'>
              <FontAwesomeIcon icon={faBook} size='lg' />
            </label>
            <input
              type='text'
              placeholder='course'
              name='course'
              value={this.state.course}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-section'>
            <label htmlFor='grade'>
              <FontAwesomeIcon icon={faEdit} size='lg' />
            </label>
            <input
              type='number'
              placeholder='grade'
              name='grade'
              value={this.state.grade}
              onChange={this.handleChange}
            />
          </div>
          <div className='buttonContainer'>
            <button type='submit' value='Add' className='gradeFormButton add'>
              Add
            </button>
            <button
              type='reset'
              value='Cancel'
              className='gradeFormButton cancel'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Gradeform;
