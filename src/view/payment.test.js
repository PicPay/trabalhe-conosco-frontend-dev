import React from 'react'
import { shallow } from 'enzyme'

import { PaymentWindow, PaymentConfirmation } from './payment'
import { UserData, Button } from './user-list'

describe('#PaymentWindow', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<PaymentWindow />)
    const userContent = wrapper.find(UserData)
    const buttons = wrapper.find(Button)

    expect(userContent).toHaveLength(1)
    expect(buttons).toHaveLength(2)
    expect(wrapper.find('.payment-value')).toHaveLength(1)
  })
})

describe('#PaymentConfirmation', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<PaymentConfirmation />)

    expect(wrapper.text()).toMatch('Transação')
    expect(wrapper.text()).toMatch('Data')
    expect(wrapper.text()).toMatch('Cartão')
    expect(wrapper.text()).toMatch('Valor')
  })
})
