import React, { Component } from 'react'
import './App.css'
import { UserList } from './view/user-list'

const userList = [
  {
    id: 1001,
    name: 'Eduardo Santos',
    img: 'https://randomuser.me/api/portraits/men/9.jpg',
    username: '@eduardo.santos',
  },
  {
    id: 1002,
    name: 'Israel Lima',
    img: 'https://randomuser.me/api/portraits/men/6.jpg',
    username: '@israel.lima',
  },
  {
    id: 1003,
    name: 'Joao Santos',
    img: 'https://randomuser.me/api/portraits/men/5.jpg',
    username: '@joao.santos',
  },
]

class App extends Component {
  render() {
    return (
      <UserList userList={userList} />
    )
  }
}

export default App
