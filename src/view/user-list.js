import React from 'react'

export const UserData = ({
  img,
  name,
  id,
  username,
}) => {
  return (
    <div className="user-data">
      <img className="user-img" src={img} alt="" />
      <span className="user-name">{name}</span>
      <span className="user-info">id: {id}</span>
      <span className="user-info">{username}</span>
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
