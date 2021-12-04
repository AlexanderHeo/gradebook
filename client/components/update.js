import { faBook, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

class Update extends Component {
  state = {
    notValidInput: '',
    gradeId: this.props.studentToUpdate.gradeId,
    name: this.props.studentToUpdate.name,
    course: this.props.studentToUpdate.course,
    grade: this.props.studentToUpdate.grade,
  };

  handleChange = (e) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
      notValidInput: '',
    });
  };

  handleSubmit = (e, student) => {
    e.preventDefault();
    if (!this.state.course) {
      this.setState({
        notValidInput: 'course',
      });
    } else if (!this.state.grade) {
      this.setState({
        notValidInput: 'grade',
      });
    } else if (this.state.course && this.state.grade) {
      const updatedStudent = {
        gradeId: this.state.gradeId,
        name: this.state.name,
        course: this.state.course,
        grade: parseInt(this.state.grade),
      };
      this.setState(
        {
          coures: '',
          grade: '',
        },
        () => this.props.onSubmit(updatedStudent)
      );
    }
  };

  handleReset = (e) => {
    e.preventDefault();
    this.props.closeModal();
  };

  render() {
    const student = this.props.studentToUpdate;
    const name = student.name;
    const notValidInput = this.state.notValidInput;

    return (
      <div className='updateModalContainer'>
        <div className='updateModal'>
          <div className='updateHeader'>
            <div className='modalHeader'>Update</div>
            <div className='updateStudentName'>
              <span>{name}&apos;</span>
            </div>
            <div className='modalHeader'>course and grade:</div>
          </div>
          <div className='updateForm'>
            <form
              action='submit'
              onSubmit={this.handleSubmit}
              onReset={this.handleReset}
              className='modalForm'
            >
              <div className='formSection'>
                <label htmlFor='course'>
                  <FontAwesomeIcon icon={faBook} size='lg' />
                </label>
                <input
                  type='text'
                  name='course'
                  value={this.state.course}
                  onChange={this.handleChange}
                />
              </div>
              <div className='formSection'>
                <label htmlFor='grade'>
                  <FontAwesomeIcon icon={faEdit} size='lg' />
                </label>
                <input
                  type='number'
                  name='grade'
                  value={this.state.grade}
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </div>
          <div className='buttonContainer'>
            {!notValidInput ? (
              <div>
                <button
                  type='submit'
                  onClick={(e) => this.handleSubmit(e, student)}
                  value='Update'
                  className='gradeFormButton update'
                >
                  Update
                </button>
                <button
                  type='submit'
                  onClick={this.props.closeModal}
                  value='Cancel'
                  className='gradeFormButton cancel'
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className='validator'>
                <div className='validatorMessage'>
                  {`Please enter a ${this.state.notValidInput}:`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
