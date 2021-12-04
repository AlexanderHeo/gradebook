import React from 'react';
import Grade from './grade';

class Gradetable extends React.Component {
  render() {
    const grades = this.props.grades;
    const buttonClick = this.props.buttonClick;
    if (grades.length === 0) {
      return (
        <table>
          <thead>
            <tr>
              <td className='noGrade'>No Student Data Recorded</td>
            </tr>
          </thead>
        </table>
      );
    } else {
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
                  <Grade
                    student={x}
                    key={x.gradeId}
                    buttonClick={buttonClick}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Gradetable;
