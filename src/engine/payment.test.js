import { sendPayment } from './payment'
import nock from 'nock'

describe('#sendPayment', () => {
  test('should return payment confirmation', async () => {
    const payload = {
      card_number: '1111111111111111',
      cvv: 789,
      value: 79.9,
      expiry_date: '01/18',
      destination_user_id: 1002,
    }
    const confirmation = {
      transaction:
     {
       id: 12314,
       timestamp: 1524333224,
       value: 79.9,
       destination_user:
        {
          id: 1002,
          name: 'Marina Coelho',
          img: 'https://randomuser.me/api/portraits/women/37.jpg',
          username: '@marina.coelho',
        },
       success: true,
       status: 'Aprovada',
     },
    }
    nock('http://careers.picpay.com')
      .post('/tests/mobdev/transaction')
      .reply(200, {
        transaction:
       {
         id: 12314,
         timestamp: 1524333224,
         value: 79.9,
         destination_user:
          {
            id: 1002,
            name: 'Marina Coelho',
            img: 'https://randomuser.me/api/portraits/women/37.jpg',
            username: '@marina.coelho',
          },
         success: true,
         status: 'Aprovada',
       },
      })
    const response = await sendPayment('http://careers.picpay.com/tests/mobdev/transaction', payload)
    expect(response).toEqual(confirmation)
  })
})
