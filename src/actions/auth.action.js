import { authConstants, cartConstants } from "./constants"
import axios from "../helpers/axios"

export const login = (user) => {
  return async (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    }

    dispatch({ type: authConstants.LOGIN_REQUEST })

    const res = await axios.post(
      "/signin",
      {
        ...user,
      },
      { headers }
    )

    if (res.status === 200) {
      const { token, user } = res.data
      sessionStorage.setItem("token", token)
      sessionStorage.setItem("user", JSON.stringify(user))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = sessionStorage.getItem("token")
    const user = JSON.parse(sessionStorage.getItem("user"))

    if (token) {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          message: "Failed to login",
        },
      })
    }
  }
}

export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST })
    sessionStorage.clear()
    dispatch({ type: authConstants.LOGOUT_SUCCESS })
    dispatch({ type: cartConstants.RESET_CART })
     //    const res =  await axios.post('/signout')

    //    if(res.status === 200){
    //         sessionStorage.clear()
    //         dispatch({
    //             type: authConstants.LOGOUT_SUCCESS
    //         })
    //    }
    //    else{
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: {error: res.data.error}
    //     })
    //    }
  }
}
