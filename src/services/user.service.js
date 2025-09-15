import axios from "axios"


export const userService = {
  login,
  signup,
  logout,
  getLoggedInUser,
  getEmptyCredentials,
}

const BASE_URL = 'http://localhost:3030'
const STORAGE_KEY = 'loggedinUser'

async function login({ username, password }) {
  try {
    const user = await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password,
    })
    _setLoggedInUser(user.data)
    return user.data
  } catch (error) {
    console.log('Could not login')
    alert('Invalid username or password')
  }
}

async function signup(credentials) {
  try {
    const user = await axios.post(`${BASE_URL}/api/auth/signup`, credentials)
    _setLoggedInUser(user.data)
    return user.data
  } catch (err) {
    console.log('Could not signup')
    alert('User exist')
  }
}

async function logout() {
  try {
    await axios.post(`${BASE_URL}/api/auth/logout`)
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.log('Could not logout')
  }
}

function getLoggedInUser() {
  const entity = sessionStorage.getItem(STORAGE_KEY)
  return JSON.parse(entity)
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
  }
}

function _setLoggedInUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}
