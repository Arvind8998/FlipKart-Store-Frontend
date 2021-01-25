import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductPage } from "../../../actions/product.action"
import { getParams } from "../../../utils/getParams"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import "./style.css"
import Card from "../../../Components/UI/Card"
function ProductPage(props) {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)
  const { page } = product

  useEffect(() => {
    const params = getParams(props.location.search)
    const payload = {
      params,
    }
    dispatch(getProductPage(payload))
  }, [])

  return (
    <div style={{ margin: "0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img className="pageStore__Img" src={banner.img} alt="page" />
            </a>
          ))}
      </Carousel>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"center", margin: "10px 0" }}>
        {page.products &&
          page.products.map((product, index) => (
            <Card style={{ width: "400px", height: "200px", margin: '5px' }} key={index}>
              <img style={{width:"100%", height:"100%", objectFit:"contain"}} src={product.img} alt="product" />
            </Card>
          ))}
      </div>
    </div>
  )
}

export default ProductPage
