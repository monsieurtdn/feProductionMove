import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_FAILED } from '../store/Constant'
import { useDataContext } from '../store/hooks'

const Auth = (props) => {
    let location = useLocation()
    const { children } = props
    const navigate = useNavigate()
    const { login: {isLoggedIn}, login, loginHandle } = useDataContext()
    let body
    if (!isLoggedIn) {
        body = <Outlet />
    } else {
        body = <Navigate to="/home" state={{from: location}} />
    }
    return (
        <>{body}</>
    )
}

export default Auth