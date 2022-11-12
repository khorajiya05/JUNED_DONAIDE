import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const auth = useSelector((state) => state.auth.token);
    console.log(auth);
    return (
        auth ? <Outlet /> : <Navigate to="/" />
    )
}
export default PrivateRoute