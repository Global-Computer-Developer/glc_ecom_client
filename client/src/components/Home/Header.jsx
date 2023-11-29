import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const Header = () => {

    const {auth, user} = useAuthContext()


    const handleLogout = async() => {
        try {
            await fetch(import.meta.env.VITE_API_URL + `/auth/${import.meta.env.VITE_API_VERSION}/token/logout/` , {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Token ' + auth
                }
            })
                .then(response => {
                    if (response.status !== 204) {
                        throw new Error()
                    }

                    localStorage.removeItem('glc_t')
                    location.reload()
                })
        } catch (error) {
            localStorage.removeItem('glc_t')
            location.reload()
        }
    }

  return (
    <header>
        <div className="header-top mobile-hide">
            <div className="container">
                <div className="wrapper flexitem">
                    <div className="left">
                        <ul className='flexitem main-link'>
                            <li><Link to={`/about`}>About</Link></li>
                            <li><Link to={`/featured/1`}>Featured Products</Link></li>
                        </ul>
                    </div>
                    <div className="right">
                        <ul className='flexitem main-link'>
                            <li><Link to={`/wishlist`}>Wishlist</Link></li>
                            {   
                                !user ?
                                <>
                                    <li><Link to={`/login`}>Login</Link></li>
                                    <li>
                                        <Link to={`/signup`} className='secondary-btn'>
                                            Sign Up
                                        </Link>
                                    </li>
                                </> :
                                <li className='user second-link'>
                                    <img src={(user && user.image) ? user?.image : `/avatar.png`} alt={user.username} />
                                    <span>{user && (user.first_name || user.username)}</span>
                                    <span className="ri-arrow-down-s-line"></span>
                                    <ul role='list'>
                                        <li>
                                            <Link to={`/profile/${user?.username}/info`}>
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/profile/${user?.username}/order`}>
                                                Order
                                            </Link>
                                        </li>
                                        {
                                            user &&
                                            user.is_staff &&
                                            <li><Link to={'/dashboard/home'}>Dashboard</Link></li>
                                        }
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </li>  
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </header>
  )
}

export default Header