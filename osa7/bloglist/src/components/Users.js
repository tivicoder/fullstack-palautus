import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {
  console.log('user: ', user)
  return(
    <>
      <tr>
        <td>
          {user.name}
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
          {[...users].map(user => <User key={user.name} user={user}></User>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users