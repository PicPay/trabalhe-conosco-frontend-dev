import { fetchUsers } from './users'
import nock from 'nock'

describe('#getUsers', () => {
  test('should return users data', async () => {
    const usersList = [
      {
        id: 1001, name: 'Eduardo Santos', img: 'https://randomuser.me/api/portraits/men/9.jpg', username: '@eduardo.santos',
      },
      {
        id: 1002, name: 'Marina Coelho', img: 'https://randomuser.me/api/portraits/women/37.jpg', username: '@marina.coelho',
      },
    ]
    nock('http://careers.picpay.com')
      .get('/tests/mobdev/users')
      .reply(200, [
        {
          id: 1001, name: 'Eduardo Santos', img: 'https://randomuser.me/api/portraits/men/9.jpg', username: '@eduardo.santos',
        },
        {
          id: 1002, name: 'Marina Coelho', img: 'https://randomuser.me/api/portraits/women/37.jpg', username: '@marina.coelho',
        },
      ])

    const users = await fetchUsers()

    expect(users).toEqual(usersList)
  })
})
