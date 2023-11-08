import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById, getCategoryByIdNopage } from '../api/category'
import { Pagination } from 'antd'

const CategoryDetail = () => {
    const navigate = useNavigate()
    const { id }: any = useParams()
    const [sort, setSort] = useState<any>()
    const [order, setOrder] = useState<any>()
    const [page, setPage] = useState<any>(1)
    const [products, setProducts] = useState<any>()
    const [productsNoPage,setProductsNoPage]=useState<any>([])
    const [ishandleSortVisible, setIsSortVisible] = useState(false);
    const handleSortClick = () => {
        setIsSortVisible(!ishandleSortVisible);
    };
    useEffect(() => {
        getCategoryById(id, sort, order, page).then(data => {
            setProducts(data.data)
        })
        getCategoryByIdNopage(id, sort, order,).then(data => {
            setProductsNoPage(data.data)
        })
    }, [sort, order, page])
    return (
        <div>
            <h4 className="brackham"><span className="ctnr">Danh mục / {`${products ? `${products[0]?.categoryId?.name}` : ``}`}</span></h4>
            <div className="sort-shops ctnr">
                <span onClick={handleSortClick}>Sort</span>
                {ishandleSortVisible && (
                    <div className="box-sort-shops">
                        <div className="item-sort-shops">
                            <ul className="items-sort-ul">
                                <li onClick={() => {
                                    setSort('maxPrice')
                                    setOrder('asc')
                                    setIsSortVisible(false)
                                    setPage(1)
                                }}>
                                    <p>Giá tăng dần</p>
                                </li>
                                <li onClick={() => {
                                    setSort('maxPrice')
                                    setOrder('desc')
                                    setIsSortVisible(false)
                                    setPage(1)
                                }}>
                                    <p>Giá giảm dần</p>
                                </li>
                                <li onClick={() => {
                                    setSort('name')
                                    setOrder('asc')
                                    setIsSortVisible(false)
                                    setPage(1)
                                }}>
                                    <p>A-Z</p>
                                </li>
                                <li onClick={() => {
                                    setSort('name')
                                    setOrder('desc')
                                    setIsSortVisible(false)
                                    setPage(1)
                                }}>
                                    <p>Z-A</p>
                                </li>
                                <li onClick={() => {
                                    setSort('createdAt')
                                    setOrder('desc')
                                    setIsSortVisible(false)
                                    setPage(1)
                                }}>
                                    <p>Mới nhất</p>
                                </li>
                                <li onClick={() => {
                                    setSort('createdAt')
                                    setOrder('asc')
                                    setIsSortVisible(false)
                                    setPage(1)
                                }}>
                                    <p>Cũ nhất</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
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
                <Pagination defaultCurrent={page} onChange={(value)=>setPage(value)} total={productsNoPage?.length} pageSize={4} />
            </section>
        </div>
    )
}

export default CategoryDetail