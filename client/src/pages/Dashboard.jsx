import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {AiOutlineHome, AiOutlineBranches, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineUser, AiOutlineDesktop} from 'react-icons/ai'
import {BiCategoryAlt, BiLaptop} from 'react-icons/bi'
import {PiSlideshowBold, PiSidebarSimpleBold} from 'react-icons/pi'
import {MdOutlineDescription} from 'react-icons/md'
import {GoCodespaces} from 'react-icons/go'
import Topbar from '../components/Dashboard/Topbar'
import { toTitleCase } from '../Utilities/toTitleCase'
import { Helmet } from 'react-helmet'



const Dashboard = () => {

    const [toggle, setToggle] = useState(true)
    const [tab, setTab] = useState()
    const {pathname} = useLocation()


    useEffect(() => {
        setTab(pathname.split("/").slice(1,))
        const NavList = document.querySelectorAll('.dashboard .navigation ul li')
        const NavLinkList = document.querySelectorAll('.dashboard .navigation ul li a')

        const handleNavActive = () => {
            for(let i=0; i<NavList.length; i++) {
                NavList[i].className = NavLinkList[i].className
            }
            return
        }

        handleNavActive()

    }, [pathname])

    
  return (
    <>
    <Helmet>
        <title>Dashboard | Global Computer (BD)</title>
        <meta property="'description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
        <meta property="'keywords" content="Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, CC camera, CCTV, Global Computer (BD), computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, hp, apple, asus, bangladesh, boya, brother, cable, GPU, graphics card" />
        <meta property="'og:title" content="Global Computer (BD)" />
        <meta property="og:image" content="/global_mini.png" />
        <meta property="og:url" content="https://globalcomputer.com.bd/" />
        <meta property="og:description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
    </Helmet>


    <section className='dashboard'>
        <div className="container">
            <aside 
                className={`navigation ${toggle && 'navbar'}`}
            >
                <ul>
                    <li>
                        <Link to={'/'} id='logo'>
                            <img className='big'src={`/global_big.svg`} alt="global_logo" loading='lazy'/> 
                        </Link>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/home'}>
                            <AiOutlineHome className='icon' />
                            <span className="title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/category'}>
                            <BiCategoryAlt className='icon' />
                            <span className="title">Category</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/brand'}>
                            <AiOutlineBranches className='icon' />
                            <span className="title">Brand</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/side-menu'}>
                            <PiSidebarSimpleBold className='icon' />
                            <span className="title">Side Menu</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/product?page=1'}>
                            <BiLaptop className='icon' />
                            <span className="title">Product</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/key-feature?page=1'}>
                            <GoCodespaces className='icon' />
                            <span className="title">Key Feature</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/specification?page=1'}>
                            <MdOutlineDescription className='icon' />
                            <span className="title">Specification</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/slider'}>
                            <PiSlideshowBold className='icon' />
                            <span className="title">Slider</span>
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to={'/dashboard/order'}>
                            <AiOutlineShoppingCart className='icon' />
                            <span className="title">Order</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>

            <div className={`dash-main ${toggle ? 'navbar' : ''}`}>
                <Topbar 
                    toggle={toggle} 
                    setToggle={setToggle}
                />
                
                <div className="breadcrump">
                    <ul className="flexitem">
                        {
                            tab && 
                            tab.map(item => (
                                <li key={item}>
                                    {toTitleCase(item)}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <Outlet />
                
            </div>
        </div>
    </section>
    </>

  )
}

export default Dashboard