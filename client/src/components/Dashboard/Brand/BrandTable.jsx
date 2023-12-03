import React, { useEffect, useState } from 'react'
import { MdContentPasteOff } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import ButtonClose from '../../../Utilities/ButtonClose'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'
import Loading from '../../../Utilities/Loading'


const BrandTable = () => {
    const {auth} = useAuthContext()

    const [response, handleBrand, loading] = useGeneralGet()
    const [delStatus, handleDelBrand] = useGeneralDEL()

    useEffect(() => {
        handleBrand(`brand`)
        window.scrollTo(0,0)
    },[delStatus])


  return (
    <>
    <DelStatus delStatus={delStatus} />
    <div className="dash-table__container">

        <h2>Brand List</h2>
        <Loading loading={loading} />

        {
            loading == false &&
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>Slug</th>
                        <th>Title</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        response && response.length !== 0 &&
                        response.map(item => (

                            <tr key={item.id} id={item.id}>
                                <td data-label='Slug'>
                                    <Link to={`/dashboard/brand/edit/${item.slug}`}>
                                        {item.slug}
                                    </Link>
                                </td>
                                <td data-label='Title'>{item.title}</td>
                                <td data-label='Delete'>
                                    <ButtonClose onClick={() => {handleDelBrand(`brand`, item.slug, auth)}} />
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

export default BrandTable