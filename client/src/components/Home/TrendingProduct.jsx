import React, { useEffect } from 'react'
import TrendingCardMini from './TrendingCardMini'
import BigTrendingCard from './BigTrendingCard'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { Link } from 'react-router-dom'
import Loading from '../../Utilities/Loading'

const TrendingProduct = () => {

    const [offeredProduct, handleOfferedProductGET, loadingOfferProduct] = useGeneralGet()
    const [productBig, handleProductBigGET, loadingBigProduct] = useGeneralGet()


    useEffect(() => {
        handleOfferedProductGET(`product`,``,``,1,6,``,``,1,`1`)
        handleProductBigGET(`product`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, `true`)
    }, [])


  return (
    <section className="trending">
        <div className="container">
            <div className="wrapper">
                <div className="sectop flexitem">
                    <h2>
                        Trending Products
                    </h2>
                    <div className="main-link view-all">
                        <Link to={`/trending/1`} className='flexitem'>
                            <span>View all</span>
                            <span className="ri-arrow-right-line"></span>
                        </Link>
                    </div>
                </div>

                <div className="column">
                    <div className="flexwrap">
                        <Loading loading={loadingBigProduct} />

                        {
                            loadingBigProduct == false &&
                            productBig &&
                            productBig[0] != undefined &&
                            <BigTrendingCard 
                                product={productBig[0]}
                            />
                        }

                        {/* mini card */}
                        <div className="row products mini">
                            <div className='products-mini-content'>
                                <Loading loading={loadingOfferProduct} />

                                {    
                                    loadingOfferProduct == false &&
                                    offeredProduct &&
                                    offeredProduct.results != undefined &&
                                    offeredProduct.results.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default TrendingProduct