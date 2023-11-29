import React from 'react'
import { Link } from 'react-router-dom'
import ConstructionSection from '../Utilities/ConstructionSection'

const AboutPage = () => {
  return (
    <section className='about-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link to="/">Home</Link></li>
                      <li>About</li>
                  </ul>
                </div>
                <ConstructionSection />
            </div>
        </div>
    </section>
  )
}

export default AboutPage