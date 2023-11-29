import React from 'react'
import { Link } from 'react-router-dom'
import ConstructionSection from '../Utilities/ConstructionSection'

const CareerPage = () => {
  return (
    <section className='career-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link to="/">Home</Link></li>
                      <li>Career</li>
                  </ul>
                </div>
                <ConstructionSection />
            </div>
        </div>
    </section>
  )
}

export default CareerPage