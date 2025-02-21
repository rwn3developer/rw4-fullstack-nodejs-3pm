import React from 'react'
import { useAuth } from '../context/AuthContex'
import Header from '../component/Header';

const Admin = () => {
    const [auth, setAuth] = useAuth();
    return (
        <div>
            <Header  />
            <div className="container">
                <div className="row">
                    <h1>Welcome Admin</h1>
                </div>
            </div>
        </div>
    )
}

export default Admin
