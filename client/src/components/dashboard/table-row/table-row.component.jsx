import React from 'react';

import moment from 'moment';

export const TableRowComponent = ({ index, name, email, date, renderAction }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{moment(new Date(date)).format('MM/DD/YYYY')}</td>
      <td>{renderAction}</td>
    </tr>
  );
};

export default TableRowComponent;
