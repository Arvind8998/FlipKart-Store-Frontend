import React from "react"
import Layout from "../../Components/Layout"

import "./style.css"
import ProductStore from "./ProductStore"
import { getParams } from "../../utils/getParams"
import ProductPage from "./ProductPage"

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search)
    switch (params.type) {
      case "store":
        return <ProductStore {...props} />
      case "page":
        return <ProductPage {...props} />
      default:
        return null
    }
  }

  return <Layout>{renderProduct()}</Layout>
}

export default ProductListPage
