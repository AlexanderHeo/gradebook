import React from 'react';

function Grade({ student }) {
  return (
    <tr key={student.id}>
      <td>{student.name}</td>
      <td>{student.course}</td>
      <td>{student.grade}</td>
    </tr>
  );
}

export default Grade;
