import React from 'react'
import './user-list.css'

export const UserData = ({
  img,
  name,
  id,
  username,
}) => {
  return (
    <div className="user-data">
      <img className="user-img" src={img} alt="" />
      <div className="user">
        <div className="user-name">{name}</div>
        <div className="user-info">
          <span>id: {id}</span>
          <span>{username}</span>
        </div></div>
    </div>
  )
}

export const UserPanel = (props) => {
  return (
    <div className="user-panel">
      <UserData {...props.user}/>
    </div>
  )
}

export const UserList = (props) => {
  return (
    props.userList.map((user, index) => <UserPanel key={index} user={user} />)
  )
}
