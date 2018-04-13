import React from 'react'
import { shallow } from 'enzyme'

import { UserData, UserPanel } from './user-list'

const user = {
  id: 1001,
  name: 'Eduardo Santos',
  img: 'https://randomuser.me/api/portraits/men/9.jpg',
  username: '@eduardo.santos',
}

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

    expect(content.find({ id: user.id })).toHaveLength(1)
    expect(content.find({ name: user.name })).toHaveLength(1)
    expect(content.find({ img: user.img })).toHaveLength(1)
    expect(content.find({ username: user.username })).toHaveLength(1)
    expect(content).toHaveLength(1)
  })
})
