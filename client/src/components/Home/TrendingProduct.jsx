import React, { useEffect } from 'react'
import TrendingCardMini from './TrendingCardMini'
import BigTrendingCard from './BigTrendingCard'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { Link } from 'react-router-dom'
import LoadingFull from '../../Utilities/LoadingFull'

const TrendingProduct = () => {

    const [offeredProduct, handleOfferedProductGET, loadingOfferProduct] = useGeneralGet()
    const [productBig, handleProductBigGET, loadingBigProduct] = useGeneralGet()


    useEffect(() => {
        handleOfferedProductGET({name: `display-product`,page: 1,size: 6, offered: 1, status: `1`})
        handleProductBigGET({name:`display-product`, display_big: `true`})
    }, [])


  return (
    <section className="trending">
        <LoadingFull loading={loadingBigProduct || loadingOfferProduct} />
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