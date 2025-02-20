import React from 'react'
import { useAuth } from '../context/AuthContex'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

    const [auth, setAuth] = useAuth();
    console.log(auth);


    return (
        auth?.token ? <Outlet /> : <Navigate to={`/`} />
    )
}

export default PrivateRoute
