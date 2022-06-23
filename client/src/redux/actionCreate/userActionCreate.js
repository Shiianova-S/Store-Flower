import { 
  LOGIN,
  SIGNUP,
  LOGOUT,
  REFRESH_TOKEN } from "../actionType/userActionType"


export const loginUser = (user) => ({
  type: LOGIN,
  payload: user
})

export const signupUser = (user) => ({
  type: SIGNUP,
  payload: user
})

export const logoutUser = () => ({
  type: LOGOUT,
})

export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: accessToken,
  })
}




