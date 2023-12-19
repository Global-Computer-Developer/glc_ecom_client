import React, { useContext, useEffect } from 'react'
import ProductPageHeader from '../components/Product Page/ProductPageHeader'
import ProductSection from '../components/Product Page/ProductSection'
import RelatedProduct from '../components/Product Page/RelatedProduct'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useGeneralGet } from '../hooks/useGeneralGet'
import Loading from '../Utilities/Loading'
import LoadingFull from '../Utilities/LoadingFull'


const ProductPage = () => {

  const {id} = useParams()
  const [product, handleProductGET, loading] = useGeneralGet()

  

  useEffect(() => {
    handleProductGET({name:`product`,id: id})
  },[id])



  return (
    <>
      

    <section id='page' className='product-page single-page'>
      <Helmet>
          <title>{`${product && product?.title}`} | Global Computer (BD)</title>
          <meta name='description' content={`Buy ${product && product.title} at the best price in Bangladesh. Latest ${product && product.brand} ${product && product.model_name} ${product && product.category.title} available at Global Computer (BD). Order online to get delivery in BD.`} />
          <meta name='keywords' content={product &&  product.title} />
          <meta property='og:title' content={product && product.title} />
          <meta property='og:description' content={`Buy ${product && product.title} at the best price in Bangladesh. Latest ${product && product.brand} ${product && product.model_name} ${product && product.category.title} available at Global Computer (BD). Order online to get delivery in BD.`} />
          <meta property='og:type' content='product' />
          <meta property='og:site_name' content='Global Computer (BD)' />
          <meta property='og:image' content={product && product.images[0].image} />
          <meta property='product:brand' content={product && product.brand} />
          <meta property='product:availability' content={ product && product.is_stock ? 'IN STOCK' : 'OUT OF STOCK'} />
          <meta property='product:condition' content='new' />
          <meta property='product:price:amount' content={product && product.price} />
          <meta property='product:price:currency' content='BDT' />
          <meta name="robots" content="index" />
        </Helmet>
        <LoadingFull loading={loading} />
        <div className="container">
          {
            product &&
            <div className="wrapper">
                <ProductPageHeader 
                  productCat={product.category} 
                  productTitle={product.title}
                />
                <ProductSection 
                  product={product} 
                />
                <RelatedProduct 
                  productCat={product.category}  
                />
            </div>
          }
        </div>
    </section>
    </>
  )
}

export default ProductPage