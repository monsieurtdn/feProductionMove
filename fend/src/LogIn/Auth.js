import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_FAILED } from '../store/Constant'
import DataContext from '../store/Context'
import { useDataContext } from '../store/hooks'
import UpdateState from '../store/Reducer';

const Auth = (props) => {
    
    let location = useLocation()
    const { children } = props
    const navigate = useNavigate()
    const { login: {isLoggedIn, user}, login, loginHandle } = useDataContext()
    let body
    if (!isLoggedIn) {
        body = <Outlet />
    } else {
        if(user.role == "admin"){
        body = <Navigate to="/OperationCenter" state={{from: location}} />
        }
        if(user.role == "warranty_center"){
            body = <Navigate to="/WarrantyCenter" state={{from: location}} />
            }
        if(user.role == "producer"){
            body = <Navigate to="/ManufactureFactory" state={{from: location}} />
            }
        if(user.role == "agency"){
            body = <Navigate to="/AuThorizedDealer" state={{from: location}} />
            }
    }
    return (
        <>{body}</>
    )
}

export default Auth