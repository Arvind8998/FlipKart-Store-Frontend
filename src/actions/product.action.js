import axios from "../helpers/axios"
import { productConstants } from "./constants"

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`)
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      })
    } else {
      // dispatch({
      //     type: productConstants.GET_PRODUCTS_BY_SLUG,
      //     payload: res.data
      // })
    }
  }
}

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_REQUEST,
      })
      const res = await axios.get(`/page/${cid}/${type}`)
      if (res.status === 200) {
        const { page } = res.data
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        })
      } else {
        const { error } = res.data
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    let res
    dispatch({
      type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST,
    })
    try {
      const { cid, type } = payload.params

      const { productId } = payload.params
        res = await axios.get(`/product/${productId}`)
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      })
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { productDetails: res.data.error },
      })
    }
  }
}
