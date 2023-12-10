import React from 'react'
import UsersTable from '../Data/UsersTable'

const Admin = (props) => {
      return (
      <section className="admin-page">
        <h1>Admin Panel</h1>
        <UsersTable {...props}/>
  
    </section>
  )
  
}

export default Admin