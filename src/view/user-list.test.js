import React from 'react'
import { shallow, mount } from 'enzyme'

import { UserData, UserPanel, UserList, Button } from './user-list'

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

const user = userList[0]

describe('#UserData', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<UserData {...user}/>)
    const img = wrapper.find('img')

    expect(img).toHaveLength(1)
    expect(img.find({ src: user.img })).toHaveLength(1)
    expect(wrapper.text()).toMatch('Eduardo Santos')
    expect(wrapper.text()).toMatch('1001')
    expect(wrapper.text()).toMatch('@eduardo.santos')
  })
})

describe('#UserPanel', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<UserPanel user={user}/>)
    const content = wrapper.find(UserData)

    expect(content).toHaveLength(1)
    expect(content.find({ id: user.id })).toHaveLength(1)
    expect(content.find({ name: user.name })).toHaveLength(1)
    expect(content.find({ img: user.img })).toHaveLength(1)
    expect(content.find({ username: user.username })).toHaveLength(1)
  })
})

describe('#UserList', function () {
  it('should render without throwing an error', function () {
    const wrapper = mount(<UserList userList={userList}/>)

    const content = wrapper.find(UserPanel)
    expect(content).toHaveLength(3)
  })
})

describe('#Button', function () {
  it('should render without throwing an error', function () {
    const wrapper = mount(<Button content={'Ok'}/>)

    expect(wrapper.text()).toMatch('Ok')
  })
})
