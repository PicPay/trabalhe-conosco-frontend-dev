import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.fetch = require('node-fetch')

Enzyme.configure({ adapter: new Adapter() })

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()
