import axios from 'axios'

const instance = {
  users: {
    list: axios.create({
      baseURL: 'http://careers.picpay.com/',
      url: 'tests/mobdev/users',
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  transaction: {
    create: axios.create({
      baseURL: 'http://careers.picpay.com/',
      url: 'tests/mobdev/transaction',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default instance
