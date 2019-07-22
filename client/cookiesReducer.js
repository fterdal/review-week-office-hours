import axios from 'axios'

// COOKIES!!!!

// ACTION TYPES
const SET_COOKIES = 'SET_COOKIES'
const ADD_COOKIE = 'ADD_COOKIE'
const REMOVE_COOKIE = 'REMOVE_COOKIE'
const CHANGE_COOKIE = 'CHANGE_COOKIE'

// ACIION CREATORS
export const setCookies = cookies => {
  return {
    type: SET_COOKIES,
    cookies,
  }
}
export const addCookie = cookie => {
  return {
    type: ADD_COOKIE,
    cookie,
  }
}
export const removeCookie = cookieId => {
  return {
    type: REMOVE_COOKIE,
    cookieId,
  }
}
export const changeCookie = (cookieId, name) => {
  return {
    type: CHANGE_COOKIE,
    cookieId,
    name,
  }
}

// THUNK CREATORS
export const fetchCookies = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cookies')
    dispatch(setCookies(data))
  } catch (err) {
    console.log(err)
  }
}

export const postCookie = newCookie => async dispatch => {
  try {
    const { data } = await axios.post('/api/cookies', newCookie)

    dispatch(addCookie(data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteCookie = cookieId => async dispatch => {
  try {
    await axios.delete(`/api/cookies/${cookieId}`)

    dispatch(removeCookie(cookieId))
  } catch (err) {
    console.log(err)
  }
}

export const editCookie = (cookieId, newName) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/cookies/${cookieId}`, {
      name: newName,
    })

    dispatch(changeCookie(cookieId, data.name))
  } catch (err) {
    console.log(err)
  }
}

const initialState = []

// REDUCER
export const cookiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIES:
      return action.cookies
    case ADD_COOKIE:
      return [...state, action.cookie]
    case REMOVE_COOKIE:
      return state.filter(cookie => cookie.id !== action.cookieId)
    case CHANGE_COOKIE:
      return state.map(cookie => {
        if (cookie.id !== action.cookieId) return cookie
        return { ...cookie, name: action.name }
      })
    default:
      return state
  }
}
