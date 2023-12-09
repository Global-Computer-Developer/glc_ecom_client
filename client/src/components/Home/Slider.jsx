import React, { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useGeneralGet } from '../../hooks/useGeneralGet';
import { Link } from 'react-router-dom';



const Slider = () => {

    const [sliderRes, handleSliderGET] = useGeneralGet()

    useEffect(() => {
        handleSliderGET({name: `slider`})
    },[])
    
  return (
    <>
        
        <div className="slider">
            <div className="container">
                <div className="wrapper">

                    <Swiper 
                        loop={true}
                        autoplay={{
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Autoplay]} 
                        className="mySwiper"
                    >
                        {
                            sliderRes &&
                            sliderRes.map(item => (
                                <SwiperSlide key={item.id}>
                                    <div className="item">
                                        <div className="image object-cover">
                                            <Link to={item.slider_url}>
                                                <img
                                                    src={item?.image} 
                                                    loading='lazy'
                                                />
                                            </Link>
                                        </div>
                                            <div 
                                                className="text-content flexcol"
                                                style={{color: `${item?.color ? `#fff`:`#0a021c`}`}}
                                            >
                                                <h2 className='flexcol'>
                                                    <span>{item?.mini_text} 
                                                    </span>
                                                    <span>
                                                        {item?.mid_text}
                                                    </span>
                                                </h2>
                                                {
                                                    (item.mini_text || item.mid_text) &&
                                                    <Link to={item.slider_url}>
                                                        <button 
                                                            type='button'
                                                            className='primary-btn'
                                                        >
                                                            Shop Now
                                                        </button>
                                                    </Link>
                                                }
                                            </div>
                                    </div>

                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
        
        
    </>
  )
}

export default Slider