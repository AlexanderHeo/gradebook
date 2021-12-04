import React from 'react';
import Grade from './grade';

class Gradetable extends React.Component {
  render() {
    const grades = this.props.grades;
    const buttonClick = this.props.buttonClick;
    return (
      <div className='gradetable'>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((x) => {
              return (
                <Grade student={x} key={x.gradeId} buttonClick={buttonClick} />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Gradetable;
