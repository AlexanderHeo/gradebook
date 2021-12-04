import React, { Component } from 'react';
import Gradeform from './gradeforms';
import Gradetable from './gradetable';
import Header from './header';
import Update from './update';

export default class App extends Component {
  state = {
    grades: [],
    avgGrade: 0,
    updating: false,
    studentToUpdate: {},
  };

  componentDidMount() {
    this.getAllGrades();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevState.grades ||
      prevState.grades.length !== this.state.grades.length
    ) {
      this.getAverageGrades(this.state.grades);
    }
  }

  getAllGrades = () => {
    fetch('/api/grades')
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState(
          {
            grades: jsonData,
          },
          () => {
            this.getAverageGrades(jsonData);
          }
        );
      });
  };

  getAverageGrades = (grades) => {
    const gradesArr = [];
    if (grades.length === 0) {
      this.setState({ avgGrade: 0 });
    } else {
      grades.forEach((x) => {
        gradesArr.push(x.grade);
      });
      const avg = gradesArr.reduce((acc, cur) => {
        return acc + cur;
      });
      this.setState({
        avgGrade: Math.round(avg / gradesArr.length),
      });
    }
  };

  addNewGrade = (newStudent) => {
    fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        const gradesCopy = [...this.state.grades];
        const addedNewStudent = gradesCopy.concat(jsonData);
        this.getAverageGrades(addedNewStudent);
        this.setState({ grades: addedNewStudent });
      });
  };

  deleteGrade = (deleteId) => {
    fetch(`/api/grades/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => null)
      .then((jsonData) => {
        const gradesCopy = [...this.state.grades];
        const index = gradesCopy.findIndex((studentObj) => {
          return studentObj.gradeId === deleteId;
        });
        gradesCopy.splice(index, 1);
        this.setState({ grades: gradesCopy });
      });
  };

  showModal = (studentToUpdate) => {
    this.setState({
      updating: true,
      studentToUpdate: studentToUpdate,
    });
  };

  closeModal = () => {
    this.setState({ updating: false });
  };

  updateGrade = (updateStudent) => {
    const updateId = updateStudent.gradeId;
    fetch(`/api/grades/${updateId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateStudent),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        const gradesCopy = [...this.state.grades];
        const index = gradesCopy.findIndex((studentObj) => {
          return studentObj.gradeId === updateId;
        });
        gradesCopy.splice(index, 1, jsonData);
        this.setState(
          {
            grades: gradesCopy,
            updating: false,
          },
          () => {
            this.getAverageGrades(gradesCopy);
          }
        );
      });
  };

  handleClick = (e, studentInfo) => {
    const name = e.target.name;
    if (name === 'delete') {
      this.deleteGrade(studentInfo);
    } else if (name === 'update') {
      this.showModal(studentInfo);
    }
  };

  render() {
    return (
      <div className='container'>
        {this.state.updating ? (
          <Update
            studentToUpdate={this.state.studentToUpdate}
            closeModal={this.closeModal}
            onSubmit={this.updateGrade}
          />
        ) : null}
        <div className='wrapper'>
          <Header avgGrade={this.state.avgGrade} />
          <div className='gradetableContainer'>
            <Gradetable
              buttonClick={this.handleClick}
              grades={this.state.grades}
            />
            <Gradeform grades={this.state.grades} onSubmit={this.addNewGrade} />
          </div>
        </div>
      </div>
    );
  }
}
