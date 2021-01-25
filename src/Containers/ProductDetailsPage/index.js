import React, { useEffect } from "react"
import Layout from "../../Components/Layout"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetailsById } from "../../actions/product.action"

function ProductDetailsPage(props) {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)
  useEffect(() => {
    const { productId } = props.match.params
    const payload = {
      params: {
        productId,
      },
    }
    dispatch(getProductDetailsById(payload))
  }, [])

  return (
    <Layout>
      <div>{product.productDetails.name} </div>
    </Layout>
  )
}

export default ProductDetailsPage
