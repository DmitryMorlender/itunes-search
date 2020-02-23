import React from 'react';
import { connect } from 'react-redux';
import TableComponent from '../components/dashboard/table/table.component';
import { selectUsers } from '../redux/users/users.reducer';
import { deleteUser } from '../redux/users/users.actions';

const UsersTableComponent = ({ users, deleteUser }) => {
  const removeUserHandler = userId => deleteUser(userId);

  return users.length === 0 ? (
    <div className="itunes-dashboard-no-users">
      <h1>{`No Users.`}</h1>
    </div>
  ) : (
    <TableComponent data={{ columns: ['#', 'Name', 'Email', 'Created On', 'Actions'], users }} removeUserHandler={removeUserHandler}></TableComponent>
  );
};

const mapStateToProps = state => ({
  users: selectUsers(state)
});

const mapDispatchToProps = { deleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(UsersTableComponent);
