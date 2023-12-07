import { useState } from "react"

export const useGeneralGet = () => {

    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

    

    const handleGet = async({name, id, order, page, size, category_slug, token, status, offered, featured, product_slug, side_menu_slug, category_id, auth, brand_slug, display_big, min_price, max_price, search, order_status}) => {
        
        try {
            setLoading(true)
            const headerOpt = new Headers();
            headerOpt.append('Content-Type', "application/json")
            if (token) {
                headerOpt.append('Authorization', `Token ${token}`)
            }

            await fetch(import.meta.env.VITE_API_URL + `/${auth ? `auth` : `api`}/${import.meta.env.VITE_API_VERSION}/${name}/${id ? id : ''}` 
                + `${order ? `?ordering=${order}` : ''}` 
                + `${page ? `${order ? '&' : '?'}page=${page}` : ''}` 
                + `${size ? `${order || page ? '&' : '?'}size=${size}` : ''}` 
                + `${category_slug ? `${order || page || size ? '&' : '?'}category__slug=${category_slug}` : ''}` 
                + `${status ? `${order || page || size || category_slug ? '&' : '?'}is_stock=${status}` : ''}` 
                + `${offered ? `${order || page || size || category_slug || status ? '&' : '?'}offered=${offered}` : ''}`  
                + `${featured ? `${order || page || size || category_slug || status || offered ? '&' : '?'}featured=${featured}` : ''}` 
                + `${product_slug ? `${order || page || size || category_slug || status || offered || featured ? '&' : '?'}product__slug=${product_slug}` : ''}` 
                + `${side_menu_slug ? `${order || page || size || category_slug || status || offered || featured || product_slug ? '&' : '?'}side_menu__slug=${side_menu_slug}` : ''}`  
                + `${category_id ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug? '&' : '?'}category=${category_id}` : ''}` 
                + `${brand_slug ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id? '&' : '?'}brand__slug=${brand_slug}` : ''}` 
                + `${display_big ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug? '&' : '?'}display_big=${display_big}` : ''}`  
                + `${min_price ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big? '&' : '?'}min_price=${min_price}` : ''}` 
                + `${max_price ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big || min_price? '&' : '?'}max_price=${max_price}` : ''}` 
                + `${(search && search.length > 0) ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big || min_price || max_price? '&' : '?'}search=${search}` : ''}`  
                + `${order_status ? `${order || page || size || category_slug || status || offered || featured || product_slug || side_menu_slug || category_id || brand_slug || display_big || min_price || max_price || search? '&' : '?'}status=${order_status}` : ''}` , 
            {
                method: 'GET',
                headers: headerOpt,
            })
            .then(response => {
                if (response.status !== 200) {
                    return
                }
                if (response.status == 404) {
                    throw new Error('Not Found!')
                }
                return response.json()
            }).then(data => {
                setResponse(cat => {
                    return data
                })
            }).catch(error => {console.log(error)})
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [response, handleGet, loading]
}