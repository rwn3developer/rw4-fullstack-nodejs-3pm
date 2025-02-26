import React from 'react'
import { useAuth } from '../context/AuthContex'
import Header from '../component/Header';
import Adminsidebar from '../component/Adminsidebar';

const Admin = () => {
    const [auth, setAuth] = useAuth();
    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1>Welcome Admin</h1>
                <div className="row mt-5">
                    <div className="col-md-3 mt-">
                        <Adminsidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
