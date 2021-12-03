import React, { Component } from 'react';
import Gradeform from './gradeforms';
import Gradetable from './gradetable';
import Header from './header';

export default class App extends Component {
  state = {
    grades: [],
    avgGrade: 0,
  };

  componentDidMount() {
    this.getAllGrades();
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
    grades.forEach((x) => {
      gradesArr.push(x.grade);
    });
    const avg = gradesArr.reduce((acc, cur) => {
      return acc + cur;
    });
    this.setState({
      avgGrade: Math.round(avg / gradesArr.length),
    });
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

  render() {
    return (
      <div className='wrapper'>
        <Header avgGrade={this.state.avgGrade} />
        <div className='gradetableContainer'>
          <Gradetable grades={this.state.grades} />
          <Gradeform grades={this.state.grades} onSubmit={this.addNewGrade} />
        </div>
      </div>
    );
  }
}
