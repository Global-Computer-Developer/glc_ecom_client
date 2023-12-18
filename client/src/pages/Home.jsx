import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'



const Slider = lazy(() => import ('../components/Home/Slider'))
const Brand = lazy(() => import ('../components/Home/Brand'))
const TrendingProduct = lazy(() => import ('../components/Home/TrendingProduct'))
const FeaturedProduct = lazy(() => import ('../components/Home/FeaturedProduct'))
const DptMenuHome = lazy(() => import ('../components/Home/DptMenuHome'))


const Home = () => {
  return (
    <>
      <Helmet>
        <title>Global Computer (BD) | Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh</title>
        <meta 
          name="description" 
          content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" 
        />
        <meta property="keywords" content="Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, CC camera, CCTV, Global Computer (BD), computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, hp, apple, asus, bangladesh, boya, brother, cable, GPU, graphics card" />
        <meta property="og:title" content="Global Computer (BD)" />
        <meta property="og:image" content={`/${import.meta.env.VITE_LOGO_MINI}`} />
        <meta property="og:url" content="https://globalcomputer.com.bd/" />
        <meta 
          property="og:description" 
          content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
        <meta property="og:type" content="website" data-rh="true" />
        <link rel="canonical" href="https://globalcomputer.com.bd/" />
        <meta name="robots" content="index" />
      </Helmet>
    <section id='page' className='home-page'>
      
      <DptMenuHome />
      <Slider />
      {/* <Brand /> */}
      <TrendingProduct />
      <FeaturedProduct />
    </section>
    </>
  )
}

export default Home