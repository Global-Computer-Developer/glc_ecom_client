import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Button from '../Utilities/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SuccessStatus from '../Utilities/SuccessStatus'
import ErrorStatus from '../Utilities/ErrorStatus'
import { useFormPATCH } from '../hooks/useFormPATCH'

const Profile = () => {

    const {user, auth} = useAuthContext()
    const navigation = useNavigate()
    const [open, setOpen] = useState(false)

    const {username} = useParams()

    const [loading, error, success, handleProfileImage] = useFormPATCH()

    useEffect(() => {
        const modalUploadFIle = document.querySelector(`.upload-box`)

        if (open) {
            modalUploadFIle.showModal()
        } else {
            modalUploadFIle.close()
        }

    },[open])

    // image validator
    const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'svg', 'webp'] };

    function getAllowedExt() {
        return validFileExtensions["image"].map((e) => `.${e}`).toString()
    } 


    const MAX_FILE_SIZE = 5 * 102400; //500KB


    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    let allowedExts = getAllowedExt();




    // add form formik
    const formik = useFormik({
        initialValues: {
            image: '',
        },
        onSubmit: async(values) => {
            var formdata = new FormData();
            for (let [key, data] of Object.entries(values)) {
                formdata.append(key, data)
            }
            handleProfileImage(`user-profile`, username, formdata, auth)
            if (success) {   
                formik.resetForm()
            }
            
        },
        validationSchema: Yup.object({
            image: Yup
                .mixed()
                .required("Required")
                .test("is-valid-type", "Not a valid image type",
                    value => isValidFileType(value && value.name.toLowerCase(), "image"))
                .test("is-valid-size", "Max allowed size is 500KB",
                    value => value && value.size <= MAX_FILE_SIZE)
            })
    })



    const handleLogout = async() => {
        try {
            await fetch(import.meta.env.VITE_API_URL + `/auth/${import.meta.env.VITE_API_VERSION}/token/logout/` , {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Token ' + auth
                }
            })
                .then(response => {
                    if (response.status !== 204) {
                        throw new Error()
                    }

                    localStorage.removeItem('glc_t')
                    navigation(`/`)
                    location.reload()
                })
        } catch (error) {
            localStorage.removeItem('glc_t')
            navigation(`/`)
            location.reload()
        }
    }

    
  return (
    <section className='profile-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump flexspace">
                    <ul className="flexitem">
                        <li>
                            <Link to={`/`}>
                                Home
                            </Link>
                        </li>
                        <li>Profile</li>
                    </ul>
                    <div className="profile__logout desktop-hide">
                        <button 
                            type='button' 
                            className='light-btn flexitem'
                            onClick={handleLogout}
                        >
                            <span>Sign out</span>
                            <span className="ri-logout-box-r-line"></span>
                        </button>
                    </div>
                </div>
                <div className="content-user flexcenter flexcol">
                    <article className="user-info flexcenter flexcol">
                        <div className="profile-image">
                            <img src={user?.image ? user.image : `/avatar.png`} alt={user?.username} />
                            <span className='ri-add-line' onClick={() => {setOpen(true)}}></span>
                            
                        </div>
                        <h2>{user && `${user?.first_name} ${user?.last_name}`}</h2>
                        <p>{user && `${user?.email}`}</p>
                        <dialog className='upload-box'>
                            <div className="upload-box__header flexspace">
                                <h3>Profile Image</h3>
                                <button className='btn-close' onClick={() => {setOpen(false)}}>
                                    <span className='ri-close-line'></span>
                                </button>
                            </div>
                            <form className='flexcol styled' onSubmit={formik.handleSubmit}>
                                <label htmlFor="image">Upload Image</label>
                                <input 
                                    type="file" 
                                    name="image" 
                                    id="image" 
                                    accept={allowedExts}
                                    onChange={(event) => {
                                        formik.setFieldValue('image', event.currentTarget.files[0]);
                                    }}
                                />
                                {
                                    formik.errors["image"] && formik.touched['image'] &&
                                    <span className="required">{formik.errors.image}</span>
                                }
                                <Button 
                                    className={`primary-btn flexitem gap-1`}
                                    type={`submit`}
                                    loading={loading}
                                >
                                    <span className='ri-upload-line'></span>
                                    <span>Upload</span>
                                </Button>

                                <SuccessStatus success={success} />
                                <ErrorStatus error={error} />
                            </form>
                        </dialog>
                    </article>

                    <div className='user-nav-cards flexcenter gap-1'>
                        <NavLink to={`/profile/${user && user.username}/info`} className="user-nav-card light-btn">
                           Profile 
                        </NavLink>
                        {
                            user && user.is_staff == false &&
                                <NavLink to={`/profile/${user && user.username}/order`} className="user-nav-card light-btn">
                                    Order
                                </NavLink>
                        }
                    </div>
                </div>
                <div className="content-body">
                    <Outlet />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Profile