import React from 'react'
import { shallow } from 'enzyme'

import { UserData } from './user-list'

describe('#UserData', function () {
  const user = {
    id: 1001,
    name: 'Eduardo Santos',
    img: 'https://randomuser.me/api/portraits/men/9.jpg',
    username: '@eduardo.santos',
  }
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
