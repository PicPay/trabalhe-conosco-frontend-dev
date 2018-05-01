import React from 'react'
import { shallow } from 'enzyme'
import { Modal, Button } from './generics-components'

describe('#Modal', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<Button content="Button"/>)

    expect(wrapper.text()).toMatch('Button')
  })
})

describe('#Modal', function () {
  it('should render without throwing an error', function () {
    const modalContent = <div>Texto</div>
    const wrapper = shallow(<Modal content={modalContent} />)
    const buttons = wrapper.find(Button)

    expect(wrapper.text()).toMatch('Texto')
    expect(buttons).toHaveLength(2)
  })
})
