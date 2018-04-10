import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.fetch = require('node-fetch')

Enzyme.configure({ adapter: new Adapter() })
