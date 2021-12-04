import React from 'react';

const Grade = ({ student, buttonClick }) => {
  return !student ? (
    <tr>
      <td>No student data available</td>
    </tr>
  ) : (
    <tr key={student.gradeId}>
      <td>{student.name}</td>
      <td>{student.course}</td>
      <td>{student.grade}</td>
      <td className='operation'>
        <button
          type='submit'
          name='delete'
          onClick={(e) => buttonClick(e, student.gradeId)}
          value='Delete'
          className='gradeFormButton delete'
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Grade;
