import React, { useEffect, useState } from "react"
import { generatePublicUrl } from "../../../urlConfig"
import { useDispatch, useSelector } from "react-redux"
import { getProductsBySlug } from "../../../actions/product.action"
import {Link} from 'react-router-dom'


function ProductStore(props) {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)
  const [priceRange, setpriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  })

  // after render is completed, similar to compoentndidmount
  useEffect(() => {
    const { match } = props
    dispatch(getProductsBySlug(match.params.slug))
  }, [])

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => (
        <div className="card">
          <div className="cardHeader">
            <div>
              {props.match.params.slug} mobile under {priceRange[key]}
            </div>
            <button>view all</button>
          </div>
          <div style={{ display: "flex" }}>
            {product.productsByPrice[key].map((product) => (
              <Link to={`/${product.slug}/${product._id}/p`} style={{display:"block"}} className="productContainer">
                <div className="productImgContainer">
                  <img
                    src={generatePublicUrl(product.productPictures[0]?.img)}
                    alt="product"
                  />
                </div>
                <div className="productInfo">
                  <div style={{ margin: "5px 0px" }}>Samsung 4gb phone</div>
                  <div>
                    <span>4.3</span>
                    <span>3353</span>
                  </div>
                  <div className="productPrice">{product.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductStore
