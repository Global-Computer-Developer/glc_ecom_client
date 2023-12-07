import React, { useEffect, useState } from 'react'
import { MdContentPasteOff } from 'react-icons/md'
import { Link, useSearchParams } from 'react-router-dom'
import StockStatus from '../../../Utilities/StockStatus'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import ItemPerShowDrop from '../../../Utilities/ItemPerShowDrop'
import PaginationProduct from '../../../Utilities/PaginationProduct'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'
import { currenyFormat } from '../../../Utilities/currencyFormat'
import Loading from '../../../Utilities/Loading'



const ProductTable = () => {
    const [searchQuery, setSearchQuery] = useSearchParams()

    const [size, setSize] = useState(9)
    const [page, setPage] = useState(parseInt(searchQuery.get('page')))

    const [query, setQuery] = useState('')

    const {auth} = useAuthContext()


    const [response, handleGet, loading] = useGeneralGet()
    const [delStatus, handleDelProduct] = useGeneralDEL()


    useEffect(() => {
        const query = Object.fromEntries([...searchQuery])
        query.page = parseInt(page)
        setSearchQuery(query)
    }, [page])

    useEffect(() => {
        handleGet({name:`product`,order:`-id`, page: searchQuery.get(`page`), size: size, search: query})
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
        <div className="dash-product__header flexspace">
            <div className="search-box">
                <form className='search' onSubmit={handleSubmit}>
                    <span className='icon-large'><i className="ri-search-line"></i></span>
                    <input type="search" placeholder='Search' onChange={handleSearch}/>
                    <button type='submit'>Search</button>
                </form>
            </div>
            <ItemPerShowDrop 
                perPage={size}
                setPerPage={setSize}
            />
        </div>

        <DelStatus delStatus={delStatus} />

        <div className="dash-table__container">
            <h2>Product List</h2>
            <Loading loading={loading} />
            {
                loading == false &&
                    <table className="dash-table product">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Thumbnail</th>
                                <th>Category</th>
                                <th>Current Price</th>
                                <th>Stock Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            response && response?.results.length !== 0 &&
                                response.results.map(item => (

                                    <tr key={item.id} id={item.id}>
                                        <td>
                                            <Link to={`/dashboard/product/edit/${item.slug}`}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </td>
                                        <td data-label='Thumbnail'>
                                            <img className='thumbnail' src={item.images[0].image} alt={item.title} loading='lazy' />
                                        </td>
                                        <td data-label='Category'>{item.category.title}</td>
                                        <td data-label='Current Price'>{currenyFormat(item.price)}</td>
                                        <td data-label='Stock Status'>
                                            <StockStatus stock={item.is_stock}/> 
                                        </td>
                                        <td data-label='Delete'>
                                            <ButtonClose onClick={() => {handleDelProduct(`product`, item.slug, auth)}} />
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

export default ProductTable