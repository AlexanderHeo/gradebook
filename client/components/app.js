import React, { Component } from 'react';
import Gradetable from './gradetable';
import Header from './header';

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
        this.setState({ grades: jsonData });
      });
  };

  render() {
    return (
      <div className='wrapper'>
        <Header />
        <Gradetable grades={this.state.grades} />
      </div>
    );
  }
}
