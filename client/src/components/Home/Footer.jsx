import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { useAuthContext } from '../../context/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../Utilities/Button'
import { useGeneralPOST } from '../../hooks/useGeneralPOST'
import SuccessStatus from '../../Utilities/SuccessStatus'

const Footer = ({
    setShowSearch, 
    setShowCart, 
    setShowMenu
}) => {

    const {auth, user} = useAuthContext()
    const {cart} = useCartContext()
    
    const [sideCat, handleSideCatGET] = useGeneralGet()
    const [loading, error, success, handleNewsletterPOST] = useGeneralPOST()

    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [footerMenuShow, setFooterMenuShow] = useState(``)

    const [ query, setQuery ] = useState(``)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async(values) => {
            handleNewsletterPOST(`newsletter`,values)
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Please enter a valid email!').required("enter your email!"),
        })
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        query && navigate(`/search/${query.replace(` `,`+`)}/1`)
        setShowSearch(false)
    }


    useEffect(() => {
        handleSideCatGET({name: `side-menu`})
    }, [])

  
return (
    <footer>

        {/* newsletter section */}
        {
           pathname === '/' && 
            <section className="newsletter">
                <div className="container">
                    <div className="wrapper">
                        <div className="box">
                            <div className="content">
                                <h3>Join Our Newsletter</h3>
                                <p>Get email updates about our latest products and <strong>special offer</strong></p>
                            </div>
                            <form className='search' onSubmit={formik.handleSubmit} >
                                <span className="icon-large"><i className="ri-mail-line"></i></span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder='Your email address'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.errors.email && formik.touched.email &&
                                    <span className="required">{formik.errors.email}</span>
                                }
                                {
                                    error?.email &&
                                    <span className="required">{error.email}</span>
                                }
                                <Button 
                                    type={'submit'}
                                    className={'secondary-btn'}
                                    loading={loading}
                                >
                                    Sign Up
                                </Button>

                                <SuccessStatus success={success} />

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        }

    


        {/* widgets section */}
        {pathname !== '/signup' && pathname !== '/login' &&
            <section className="widgets">
                <div className="container">
                    <div className="wrapper">
                        <div className="flexwrap gap-5">

                                <article className="item mini-link flexcol gap-1 mobile-hide">
                                    <h4>Stay Connected</h4>
                                    <p>
                                        <strong>Global Computer BD</strong> <br />
                                        Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh. 
                                        <br />
                                        Get quality IT products and services delivered right to your location.
                                    <br />
                                        <strong>Head Office</strong> <br />
                                        47, M.E.F Center(2nd Floor), Shahid Shahidullah Kaisar Road, Feni-3900
                                    </p>

                                    {
                                        (auth == undefined || !auth) &&
                                        <Link to={`/signup`}>
                                            <button 
                                                type="button"
                                            >
                                                    Sign up
                                            </button>
                                        </Link>
                                    }
                                </article>


                                <div className="item mini-link footer__hide">
                                    <h4 onClick={() => {setFooterMenuShow(`category`)}}>
                                        <span>Categories</span> <span className={`ri-arrow-${footerMenuShow == 'category' ? 'up': 'down'}-s-line`}></span>
                                    </h4>
                                    <ul className={`flexcol ${footerMenuShow == `category` ? `show` : ``}`}>
                                        {
                                            sideCat &&
                                            sideCat.map(menu => (
                                                <li key={menu.id}>
                                                    <Link to={`/menu/${menu.slug}/1`}>
                                                        {menu.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>


                                <div className="item mini-link footer__hide">
                                    <h4 onClick={() => {setFooterMenuShow(`about`)}}>
                                        <span>About us</span> <span className={`ri-arrow-${footerMenuShow == 'about' ? 'up': 'down'}-s-line`}></span>
                                    </h4>
                                    <ul className={`flexcol ${footerMenuShow == `about` ? `show` : ``}`}>
                                        <li><Link to={`/about`}>Company Info</Link></li>
                                        <li><Link to={`/career`}>Careers</Link></li>
                                        <li><Link to={`/policies`}>Policies</Link></li>
                                        <li><Link to={`/contact`}>Contact us</Link></li>
                                        <li><Link>Terms and Conditions</Link></li>
                                    </ul>
                                </div>

                        </div>
                    </div>
                </div>
            </section>
        }

        {/* info section */}
        <section className="footer-info">
            <div className="contaier">
                <div className="wrapper">
                    <div className="flexcol">
                        <div className="logo">
                            <Link to="/">
                                <img src={`/${import.meta.env.VITE_LOGO_BIG}`} alt="global_logo" loading='lazy'/>
                            </Link>
                        </div>
                        <div className="socials">
                            <ul className="flexitem">
                                <li>
                                    <a href="https://www.facebook.com/Global.fenibd/" className='facebook' aria-label='Visit us on facebook'>
                                        <i className="ri-facebook-line"></i>
                                    </a>
                                </li>
                                {/* <li><a href=""><i className="ri-youtube-line"></i></a></li> */}
                                <li>
                                    <a 
                                        href="https://www.linkedin.com/company/global-computer-bd-ltd/about/" 
                                        className='linkedin' aria-label='Visit us on Linkedin'
                                    >
                                            <i className="ri-linkedin-line"></i>
                                    </a>
                                </li>
                                {/* <li><a href=""><i className="ri-twitter-line"></i></a></li> */}
                                {/* <li><a href=""><i className="ri-instagram-line"></i></a></li> */}
                            </ul>
                        </div>
                        <p className="mini-text">Copyright 2023 © Global Computer (BD). All right reserved. </p>
                    </div>
                </div>
            </div>
        </section>
        

        {/* mobile view bottom nav */}
        <section className="menu-bottom desktop-hide">
            <div className="container">
                <div className="wrapper">
                    <nav>
                        <ul className="flexitem">
                            <li>
                                <NavLink 
                                    to="/"
                                    onClick={() => {
                                        setShowCart(false)
                                        setShowSearch(false)
                                    }}
                                >
                                    <i className={`ri-home-3-${pathname === '/' ? `fill`: `line`}`}></i>
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={(auth && auth != undefined) ? `/profile/${user != `undefined` && user.username}/info` : `/login`} 
                                    onClick={() => {
                                        setShowCart(false)
                                        setShowSearch(false)
                                }}
                                >
                                    <i className={`ri-user-4-${pathname === `/profile/${user != `undefined` && user.username}/info` || pathname === '/login' ? `fill`: `line`}`}></i>
                                    <span>Account</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={`/wishlist`}
                                    onClick={() => {
                                        setShowCart(false)
                                        setShowSearch(false)
                                    }}
                                >
                                    <i className={`ri-heart-${pathname === '/wishlist' ? `fill`: `line`}`}></i>
                                    <span>Wishlist</span>
                                </NavLink>
                            </li>
                            <li>
                                <span 
                                    className='t-search' 
                                    onClick={() => {
                                        setShowSearch(true)
                                        setShowCart(false)
                                    }}
                                >
                                    <i className="ri-search-line"></i>
                                    <span>Search</span>
                                </span>
                            </li>
                            <li>
                                <span
                                    className='cart-trigger' 
                                    onClick={() => {
                                        setShowCart(true)
                                        setShowSearch(false)
                                    }}
                                >
                                    <i className="ri-shopping-cart-line"></i>
                                    <span>Cart</span>
                                    <div className="fly-item">
                                        <div className="item-number">{cart.length}</div>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>




        {/* bottom menu search */}
        <section className="search-bottom desktop-hide">
            <div className="container">
                <div className="wrapper">
                    <form className='search' onSubmit={handleSubmit}>
                        <span
                            className="t-close search flexcenter"
                            onClick={() => {setShowSearch(false)}}
                        >
                            <i className="ri-close-line"></i>
                        </span>
                        <span className="icon-large"><i className="ri-search-line"></i></span>
                        <input 
                            type="search" 
                            name="search" 
                            id="search" 
                            placeholder='Search' 
                            onChange={(e) => {setQuery(item => {return e.target.value})}}
                            required
                        />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </section>


        {/* overlay */}
        <div className="overlay desktop-hide" onClick={() => {setShowMenu(false)}}></div>
    </footer>
  )
}

export default Footer