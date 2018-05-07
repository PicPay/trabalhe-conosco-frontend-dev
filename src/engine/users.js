
export const fetchUsers = async () => {
  const response = await fetch('http://careers.picpay.com/tests/mobdev/users')
  const json = await response.json()
  return json
}
