import Cookies from 'js-cookie'

const TokenKey = 'LW_NEW_ADMIN_TOKEN'
const NAME_KEY = 'LW_NEW_NAME_KEY'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getName () {
  return Cookies.get(NAME_KEY)
}

export function setName (roles) {
  return Cookies.set(NAME_KEY, roles)
}

export function removeName () {
  return Cookies.remove(NAME_KEY)
}
