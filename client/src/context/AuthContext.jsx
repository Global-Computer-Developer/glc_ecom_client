import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(undefined)

const getCartLocalData = () => {
    let localAuthData = localStorage.getItem('glc_t')
    if (localAuthData != undefined) {
        return ``
    } else {
        return JSON.parse(localAuthData)
    }
}


export const AuthProvider = ({children}) => {

    

    const [auth, setAuth] = useState('')    
    const [user, setUser] = useState('') 
    const [groups, setGroups] = useState('') 
    const {pathname} = useLocation()   
    


    const fetchUserData = async() => {
        if (auth) {
            await fetch(import.meta.env.VITE_API_URL+`/auth/${import.meta.env.VITE_API_VERSION}/users/me/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + auth, 
                }
            })  
                .then(response => {
                    if(response.status == 401) {
                        throw new Error()
                    }
                    else {
                        response.json().then(data => {
                            setUser(data)
                        })
                    }
                })
                .catch(error => {
                    localStorage.removeItem('glc_t')
                })
        }
    }

    const getUserGroup = async() => {
        if (user) {
            await fetch(import.meta.env.VITE_API_URL + `/api/${import.meta.env.VITE_API_VERSION}/user-profile/${user.username}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + auth, 
                }
            }).then(res => res.json())
                .then(data => {
                    setGroups(data?.groups)
                })
        }
    }



    useEffect(() => {
        fetchUserData()
    }, [auth, pathname])

    useEffect(() => {
        getUserGroup()
    },[user, pathname])

    return (
        <AuthContext.Provider
            value={{
                auth,
                user,
                groups,
                onAuth: (token) => {setAuth(token)}
            }}
        >
            {children}
        </AuthContext.Provider>
    )
   
}

export const useAuthContext = () => useContext(AuthContext)