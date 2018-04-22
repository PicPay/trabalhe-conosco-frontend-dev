
export const sendPayment = async (url, payload) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(payload),
  })
  const json = await response.json()
  return json
}

export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }
}
