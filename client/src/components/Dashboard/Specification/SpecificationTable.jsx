import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import ItemPerShowDrop from '../../../Utilities/ItemPerShowDrop'
import PaginationProduct from '../../../Utilities/PaginationProduct'
import ButtonClose from '../../../Utilities/ButtonClose'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'
import Loading from '../../../Utilities/Loading'


const SpecificationTable = () => {
    const {auth} = useAuthContext()
    const [searchQuery, setSearchQuery] = useSearchParams()

    const [size, setSize] = useState(9)
    const [page, setPage] = useState(parseInt(searchQuery.get('page')))

    const [query, setQuery] = useState()

    const [response, handleSpecs, loading] = useGeneralGet()
    const [delStatus, handleDelTables] = useGeneralDEL()


    useEffect(() => {
        const query = Object.fromEntries([...searchQuery])
        query.page = parseInt(page)
        setSearchQuery(query)
    }, [page])

    useEffect(() => {
        handleSpecs({name:`product`,order:`-id`, page: searchQuery.get(`page`), size: size, search: query})
        window.scrollTo(0,0)
    },[searchQuery, delStatus, page, size, query])


    const handleSubmit = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }
    const handleSearch = (e) => {
        setQuery(e.target.value)
    }


  return (
    <>
    <div className="dash-product__header flexitem">
            <ItemPerShowDrop 
            perPage={size}
            setPerPage={setSize}
        />
        <div className="search-box">
            <form className='search' onSubmit={handleSubmit}>
                <span className='icon-large'><i className="ri-search-line"></i></span>
                <input type="search" placeholder='Search' onChange={handleSearch}/>
                <button type='submit'>Search</button>
            </form>
        </div>
    </div>

    <DelStatus delStatus={delStatus} />

    <div className="dash-table__container">
        <h2>Specification List</h2>
        <Loading loading={loading} />
        {
            loading == false &&
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Thumbnail</th>
                            <th>#Specs Tables</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response && response?.results.length !== 0 &&
                            response?.results.map(item => (

                                <tr key={item.id} id={item.id}>
                                    <td >
                                        <Link to={`/dashboard/specification/edit/${item.id}`}>
                                            <span>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </td>
                                    <td data-label='Thumbnail'>
                                        <img className='thumbnail' src={item.images[0].image} alt={item.title} loading='lazy' />
                                    </td>
                                    <td data-label='#Specs Tables'>
                                        <ul>
                                        {
                                            item.specification.length != 0 ?
                                            item?.specification.map(spec => (
                                                <li 
                                                    key={spec.table_name}
                                                    className='medium-text'
                                                >
                                                    {spec.table_name}
                                                </li>
                                            ))
                                            :
                                            <span className='medium-text'>No table been added</span>
                                        }
                                        </ul>

                                    </td>
                                    <td data-label='Delete'>
                                        <ButtonClose onClick={() => {handleDelTables(`specification`, item.id, auth)}} />
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
        }
        
        {loading == false && response && response.results.length == 0 && <NoItem />}

    </div> 


    <PaginationProduct 
        response={response}
        page={page}
        setPage={setPage}
        size={size}
    />
    
    </>
    
  )
}

export default SpecificationTable