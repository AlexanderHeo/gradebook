import React, { Component } from 'react';

export default class App extends Component {
  state = {
    grades: [],
  };

  componentDidMount() {
    this.getAllGrades();
  }

  getAllGrades = () => {
    fetch('/api/grades')
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
          grades: jsonData,
        });
      });
  };

  render() {
    return <h1>TESTING TESTING</h1>;
  }
}
