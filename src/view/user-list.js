import React from 'react'

export const UserData = ({
  img,
  name,
  id,
  username,
}) => {
  return (
    <div className="user-data">
      <img src={img} alt="" />
      <span>{name}</span>
      <span>{id}</span>
      <span>{username}</span>
    </div>
  )
}

export const UserPanel = (props) => {
  return (
    <UserData {...props.user}/>
  )
}

export const UserList = (props) => {
  return (
    props.userList.map((user, index) => <UserPanel key={index} user={user} />)
  )
}
