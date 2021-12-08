import React from 'react';

const header = ({ avgGrade }) => {
  return (
    <div id='header'>
      <div className='heading'>
        <h1>Student Grade Table</h1>
      </div>
      <div className='averageGrade'>
        <div className='averageGradeLabel'>
          <h2>Average Grade:</h2>
        </div>
        <div className='averageGradeBox'>
          <h2>{avgGrade}</h2>
        </div>
      </div>
    </div>
  );
};

export default header;
