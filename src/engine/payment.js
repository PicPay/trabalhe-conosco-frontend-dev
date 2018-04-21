
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
