import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDataContext } from '../store/hooks'

const RequiredAuth = (props) => {
    const { children } = props
    const { login: {isLoggedIn} } = useDataContext()
    let body
    if (isLoggedIn) {
        body = <Outlet />
    } else {
        body = <Navigate to="/Login" />
    }
    return (
        <>{body}</>
    )
}

export default RequiredAuth