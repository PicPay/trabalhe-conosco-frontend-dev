import React from 'react'
import { shallow } from 'enzyme'

import { PaymentWindow, PaymentConfirmation, ConfirmationWindow, CreditCardForm } from './payment'
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

describe('#ConfirmationWindow', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<ConfirmationWindow />)
    const userContent = wrapper.find(UserData)
    const paymentData = wrapper.find(PaymentConfirmation)
    const buttons = wrapper.find(Button)

    expect(userContent).toHaveLength(1)
    expect(paymentData).toHaveLength(1)
    expect(buttons).toHaveLength(3)
  })
})

describe('#CreditCardForm', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<CreditCardForm />)
    const inputs = wrapper.find('input')
    const buttons = wrapper.find(Button)
    const select = wrapper.find('select')

    expect(inputs).toHaveLength(5)
    expect(buttons).toHaveLength(2)
    expect(select).toHaveLength(1)
  })
})
