import React, { useEffect } from 'react'
import FeaturedCard from './FeaturedCard'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const FeaturedProduct = () => {

   const [featuredRes, handleFeaturedGET] = useGeneralGet() 


    useEffect(() => {
        handleFeaturedGET({name: `product`,page:1,size:24,status:`true`,featured: 1}) // no of item to show is '18' of page 1
    },[])

  return (
    <section className="featured">
        <div className="container">
            <div className="wrapper">
                <div>
                    <div className="sectop flexitem">
                        <h2>
                            Featured Products
                        </h2>
                        <div className="main-link view-all">
                            <Link to={`/featured/1`} className='flexitem'>
                                <span>View all</span>
                                <span className="ri-arrow-right-line"></span>
                            </Link>
                        </div>
                    </div>

                    {/* main product card */}
                    <div className="products main">
                        {
                            featuredRes &&
                            featuredRes.results != undefined &&
                            featuredRes.results.map(product => (
                                <FeaturedCard 
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default FeaturedProduct