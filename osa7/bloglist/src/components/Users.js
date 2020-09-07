import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const UserTableRow = ({ user }) => {
  console.log('user: ', user)
  return(
    <>
      <tr>
        <td>
          <Link to={`/users/${user.id}`}>
            {user.name}
          </Link>
        </td>
        <td>
          {user.blogs.length}
        </td>
      </tr>
    </>
  )
}

const Users = () => {
  const users = useSelector(state => state.users.allUsers)

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {[...users].map(user => <UserTableRow key={user.name} user={user}></UserTableRow>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users