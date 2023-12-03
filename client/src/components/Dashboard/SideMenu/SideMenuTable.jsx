import React, { useEffect, useState } from 'react'
import { MdContentPasteOff } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'
import Loading from '../../../Utilities/Loading'


const SideMenuTable = () => {

    const [response, handleSideMenu, loading] = useGeneralGet()
    const [delStatus, handleDelSideMenu] = useGeneralDEL()

    const { auth } = useAuthContext()


    useEffect(() => {

        handleSideMenu(`side-menu`)
        
    },[delStatus])


  return (

    <>

    <DelStatus delStatus={delStatus} />
    <div className="dash-table__container">
        <h2>Side Menu List</h2>
        <Loading loading={loading} />
        {
            loading == false &&
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Query</th>
                            <th>Sub Side Menu</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response && response.length !== 0 &&
                            response.map(item => (

                                <tr key={item.id} id={item.id}>
                                    <td>
                                        <Link className='flexitem gap-1' to={`/dashboard/side-menu/edit/${item.slug}`}>
                                            <span className={`ri-${item?.logo}`}></span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </td>
                                    <td>{item.query}</td>
                                    <td>
                                        <ul>
                                        {
                                            item.sub_side_menu.length != 0 &&
                                            item.sub_side_menu.map(menu => (
                                                <li key={menu.id}>{menu.name}</li>
                                            ))
                                        
                                        }
                                        </ul>
                                    </td>
                                    <td data-label='Delete'>
                                        <ButtonClose onClick={() => {handleDelSideMenu(`side-menu`, item.slug, auth)}} />
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

export default SideMenuTable