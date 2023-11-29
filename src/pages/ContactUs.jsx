import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'


const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Global Computer (BD)</title>
        <meta property="'description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
        <meta property="'keywords" content="Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, CC camera, CCTV, Global Computer (BD), computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, hp, apple, asus, bangladesh, boya, brother, cable, GPU, graphics card" />
        <meta property="'og:title" content="Global Computer (BD)" />
        <meta property="og:image" content={`/${import.meta.env.VITE_LOGO_MINI}`} />
        <meta property="og:url" content="https://globalcomputer.com.bd/" />
        <meta property="og:description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
      </Helmet>
      <section className='contact-page single-contact'>
          <div className="container">
              <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link to="/">Home</Link></li>
                      <li>Contact Us</li>
                  </ul>
                </div>
                <section className='contact-box'>
                  <h3>Sales Outlets</h3>
                  <div className="flexwrap">
                    <article className="contact__card">
                      <img src="/contact_icon/hp.png" alt="" />
                      <h2>HP Outlet</h2>
                      <p>
                        47, M.E.F Center(2nd Floor), Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757678, 01919 757693</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <img src="/contact_icon/asus.png" alt="" />
                      <h2>Asus Showroom</h2>
                      <p>
                        Shop #66; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757692</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <img src="/contact_icon/security-camera.png" alt="" />
                      <h2>CCTV Showroom</h2>
                      <p>
                        Shop #65; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757694</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <img src="/contact_icon/desktop-computer.png" alt="" />
                      <h2>Global Computer Unit 2</h2>
                      <p>
                        Shop #67; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757680</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <img src="/contact_icon/computer-repair.png" alt="" />
                      <h2>Service Center | Desktop, Laptop</h2>
                      <p>
                        Shop #43, 44; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757683, 01919 757684</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <img src="/contact_icon/printer.png" alt="" />
                      <h2>Printer Service</h2>
                      <p>
                        Shop #35; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757682</strong>  
                      </p>
                    </article>
                    <article className="contact__card">
                      <img src="/contact_icon/warranty.png" alt="" />
                      <h2>Warranty Section</h2>
                      <p>
                        Shop #35; Shamabay Market-3, Shahid Shahidullah Kaisar Road, Feni-3900
                        <br />
                        <span className='ri-phone-fill'></span> <strong>01919 757681</strong>  
                      </p>
                    </article>
                  </div>
                </section>
              </div>
          </div>
      </section>
    </>
  )
}

export default ContactUs