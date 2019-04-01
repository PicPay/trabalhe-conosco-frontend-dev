import map from './map'

const list = params => {
  return map.users
    .list()
    .then(response => response)
    .catch(response => response.response)
}

export default {
  list
}
