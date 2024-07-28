const KEY = '7NPPTADMING-TOKEN'

export default function useAuth() {
  let token = localStorage.getItem(KEY) || ''

  function setToken(val: string) {
    token = val
    localStorage.setItem(KEY, val)
  }

  function getToken() {
    return token
  }

  return { setToken, getToken }
}
