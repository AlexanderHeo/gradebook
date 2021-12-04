import { faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

class Gradeform extends Component {
  state = {
    name: '',
    course: '',
    grade: '',
    invalidMessage: '',
  };

  handleChange = (e) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
      invalidMessage: '',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const parsedIntGrade = parseInt(this.state.grade);

    if (!this.state.name) {
      this.setState({ invalidMessage: 'Please enter a name' });
    } else if (!this.state.course) {
      this.setState({ invalidMessage: 'Please enter a course' });
    } else if (!this.state.grade) {
      this.setState({ invalidMessage: 'Please enter a grade' });
    } else if (this.state.grade && parsedIntGrade > 100) {
      this.setState({ invalidMessage: 'Grade cannot be greater than 100' });
    } else {
      const newStudent = {
        name: this.state.name,
        course: this.state.course,
        grade: parsedIntGrade,
      };
      this.setState(
        {
          name: '',
          course: '',
          grade: '',
        },
        () => this.props.onSubmit(newStudent)
      );
    }
  };

  handleReset = () => {
    this.setState({
      name: '',
      course: '',
      grade: '',
    });
  };

  render() {
    const invalidMessage = this.state.invalidMessage;
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
          {!invalidMessage ? (
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
          ) : (
            <div className='validator'>
              <div className='validatorMessage'>
                {this.state.invalidMessage}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Gradeform;
