const KEY = '7NPPTADMING-TOKEN'
const KEY_INFO = '7NPPTADMING-INFO'

export default function useAuth() {
  let token = localStorage.getItem(KEY) || ''
  let info = localStorage.getItem(KEY_INFO) || ''

  function setToken(val: string) {
    token = val
    localStorage.setItem(KEY, val)
  }

  function getToken() {
    return token
  }

  function setUInfo(name: string, phone: string) {
    info = `${name}|${phone}`
    localStorage.setItem(KEY_INFO, btoa(encodeURIComponent(info)))
  }
  function getUInfo() {
    const [name, phone] = `${decodeURIComponent(atob(info))}|`.split('|')
    return { name, phone }
  }

  function clear() {
    localStorage.removeItem(KEY)
    localStorage.removeItem(KEY_INFO)
  }

  return { setToken, getToken, clear, setUInfo, getUInfo }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOm51bGwsIlVzZXJJRCI6MiwiUGhvbmUiOiIxMzYyMTIyNDI1NCIsIkNyZWF0ZVRpbWUiOiIyMDI0LTA4LTI1IDIyOjA2OjU3IiwiRXhwaXJlc1RpbWUiOiIyMDI0LTA5LTA0IDIyOjA2OjU3In0.DLZpmxvyGxXcplrbpifeUgXvAjkjTRrjyIafbglP5Go
