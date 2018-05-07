import React from 'react'
import { shallow } from 'enzyme'

import { PaymentWindow, PaymentConfirmation, ConfirmationWindow, CreditCardForm, CreditCardList } from './payment'
import { UserData } from './user-list'
import { Button } from './generics-components'

describe('#PaymentWindow', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<PaymentWindow />)
    const userContent = wrapper.find(UserData)
    const buttons = wrapper.find(Button)

    expect(userContent).toHaveLength(1)
    expect(buttons).toHaveLength(1)
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
    expect(buttons).toHaveLength(2)
  })
})

describe('#CreditCardForm', function () {
  it('should render without throwing an error', function () {
    const wrapper = shallow(<CreditCardForm />)
    const inputs = wrapper.find('input')
    const buttons = wrapper.find(Button)
    const select = wrapper.find('select')

    expect(inputs).toHaveLength(5)
    expect(buttons).toHaveLength(1)
    expect(select).toHaveLength(1)
  })
})

describe('#CreditCardList', function () {
  const cards = [
    {
      number: '1111111111111111', cvv: '789', expiryDate: '01/18', default: true,
    },
    {
      number: '1111111111111112', cvv: '780', expiryDate: '01/18', default: false,
    },
  ]
  it('should render without throwing an error', function () {
    const wrapper = shallow(<CreditCardList cards={cards}/>)
    const buttons = wrapper.find(Button)
    const cardList = wrapper.find('.card')

    expect(buttons).toHaveLength(2)
    expect(cardList).toHaveLength(2)
    expect(wrapper.text()).toMatch('Cartões Cadastrados')
  })
})
