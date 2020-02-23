import React from 'react';

const TableHeadComponent = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={`${col}-${index}-${col}`}>{col}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadComponent;
