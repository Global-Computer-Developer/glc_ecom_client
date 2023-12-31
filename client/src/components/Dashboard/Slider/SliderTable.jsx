import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'
import Loading from '../../../Utilities/Loading'


const SliderTable = () => {
    const {auth} = useAuthContext()

    const [response, handleSlider, loading] = useGeneralGet()
    const [delStatus, handleDelSlider] = useGeneralDEL()

   
    useEffect(() => {
        
        handleSlider({name: `slider`})
        
    },[delStatus])


  return (
    <>
    <div className="dash-table__container">
        <h2>Slider List</h2>
        <Loading loading={loading} />
        {
            loading == false &&
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Slider Url</th>
                            <th>Slider Image</th>
                            <th>Mini Text</th>
                            <th>Middle Text</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response && response.length !== 0 &&
                            response.map(item => (

                                <tr key={item.id} id={item.id}>
                                    <td>
                                        <Link to={`/dashboard/slider/edit/${item.id}`}>
                                            <span>{item.slider_url}</span>
                                        </Link>
                                    </td>
                                    <td data-label='Slider Image'>
                                        <img className='thumbnail' src={item.image} loading='lazy'/>
                                    </td>
                                    <td data-label='Mini Text'>
                                        {item.mini_text}
                                    </td>
                                    <td data-label='Middle Text'>
                                        {item.mid_text}
                                    </td>
                                    <td data-label='Delete'>
                                        <ButtonClose onClick={() => {handleDelSlider(`slider`, item.id, auth)}} />
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table> 
        }

        {loading == false && response && response.length == 0 && <NoItem />}
    </div>
    
    
    </>
  )
}

export default SliderTable