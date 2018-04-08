
export const fetchUsers = async (url) => {
  const response = await fetch(url)
  const json = await response.json()
  return json
}
