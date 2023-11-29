import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Button from '../../../Utilities/Button'
import { useLocation } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralPOST } from '../../../hooks/useGeneralPOST'
import SuccessStatus from '../../../Utilities/SuccessStatus'
import ErrorStatus from '../../../Utilities/ErrorStatus'
import { useAuthContext } from '../../../context/AuthContext'



const SideMenuAddForm = () => {

    const {pathname} = useLocation()
    const [loading, error, success, handleSideMenu] = useGeneralPOST()
    
    const {auth} = useAuthContext()

    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }

        if (success) {   
            formik.resetForm()
        }
    }, [success, error])



    // add form formik

    const formik = useFormik({
        initialValues: {
            title: '',
            logo: '',
            query: '',
        },
        onSubmit: async(values) => {
            handleSideMenu(`side-menu`, values, auth)
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter slug title!"),
            logo: Yup.string().required("enter title!"),
            query: Yup.string().required("select query option!"),
        })
    })






  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
        <h2>Add Side Menu</h2>
        
        <p>
            <label htmlFor="title">Name <span></span></label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder='e.g. Processor'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
            />
            {
                formik.errors.title && formik.touched.title &&
                <span className="required">{formik.errors.title}</span>
            }
            {
                error?.title &&
                <span className="required">{error.title}</span>
            }
        </p>
        <p>
            <label htmlFor="logo">Logo <span></span></label>
            <input 
                type="text" 
                name="logo" 
                id="logo" 
                placeholder='e.g. macbook-line, see "remix-icon" website '
                value={formik.values.logo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.logo && formik.touched.logo &&
                <span className="required">{formik.errors.logo}</span>
            }
            {
                error?.logo &&
                <span className="required">{error.logo}</span>
            }
        </p>
        <p>
            <label htmlFor="query">Query <span></span></label>
            <select 
                name="query" 
                id="query" 
                value={formik.values.query}
                onChange={formik.handleChange}
            >
                <option value="" disabled hidden selected>Select Query</option>
                <option value={`brand`}>Brand</option>
                <option value={`category`}>Category</option>
            </select>
            {
                formik.errors.query && formik.touched.query &&
                <span className="required">{formik.errors.query}</span>
            }
            {
                error?.query &&
                <span className="required">{error.query}</span>
            }
        </p>
        <p>
            <label htmlFor="uploaded_submenu">Sub Menu List <span></span></label>
            <input 
                type="text" 
                name="uploaded_submenu" 
                id="uploaded_submenu" 
                placeholder='e.g. processor, laptop'
                value={formik.values.uploaded_submenu}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.uploaded_submenu && formik.touched.uploaded_submenu &&
                <span className="required">{formik.errors.uploaded_submenu}</span>
            }
            {
                error?.uploaded_submenu &&
                <span className="required">{error.uploaded_submenu}</span>
            }
        </p>
        <Button 
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Add Side Menu
        </Button>

        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />
        
    </form>
  )
}

export default SideMenuAddForm