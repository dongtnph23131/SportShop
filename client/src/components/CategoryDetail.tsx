import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById } from '../api/category'

const CategoryDetail = () => {
    const navigate = useNavigate()
    const { id }: any = useParams()
    const [products, setProducts] = useState<any>()
    useEffect(() => {
        getCategoryById(id).then(data => {
            setProducts(data.data)
        })
    }, [])
    return (
        <div>
            <h4>Danh mục / {`${products ? `${products[0]?.categoryId?.name}` : ``}`}</h4>
            <section id="product1" className="section-p1">
                <div className="pro-container">
                    {products?.map((product: any, index: any) => {
                        return <div onClick={() => {
                            navigate(`/products/${product._id}`)
                        }} className="pro" key={index + 1}>
                            <img src={`${product?.images[0].url}`} alt="" />
                            <div className="des">
                                <span>adidas</span>
                                <h5>{product.name}</h5>
                                <div className="star">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <h4>${product.minPrice}-${product.maxPrice}</h4>
                            </div>
                            <a href="#">
                                <i className="fab fa-opencart cart"></i>
                            </a>
                        </div>
                    })}
                </div>
            </section>

        </div>
    )
}

export default CategoryDetail