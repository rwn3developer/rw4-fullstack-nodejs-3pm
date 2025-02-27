import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContex'
import Header from '../../component/Header';
import Adminsidebar from '../../component/Adminsidebar';

const Admin = () => {
    const [auth, setAuth] = useAuth();
    const [no, setNo] = useState("");
    const fetchUser = async () => {
        try {
            let res = await fetch(`http://localhost:8000/admin/alluser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            })
            let data = await res.json();
            if (data.success) {
                setNo(data.users.length);

            }

        } catch (err) {
            console.log(err)
            return false
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1>Welcome Admin</h1>
                <div className="row mt-5">
                    <div className="col-md-3 mt-">
                        <Adminsidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-header">
                                        Users
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Count :- {no}</h5>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
