import React from 'react';
import { Table, Button } from 'react-bootstrap';
import TableHeadComponent from '../table-head/table-head.component';
import TableRowComponent from '../table-row/table-row.component';

const TableComponent = ({ data, removeUserHandler }) => {
  const { columns, users } = data;
  return (
    <Table striped bordered hover>
      <TableHeadComponent columns={columns} />
      <tbody>
        {users.map((user, index) => (
          <TableRowComponent
            key={`${user._id}67483${index}981`}
            index={index + 1}
            {...user}
            renderAction={
              <Button variant="danger" size="lg" onClick={() => removeUserHandler(user._id)}>
                Delete
              </Button>
            }
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
