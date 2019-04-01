import map from './map'

const create = params => {
  return map.transaction
    .create({
      data: params
    })
    .then(response => response)
    .catch(response => response.response)
}

export default {
  create
}
