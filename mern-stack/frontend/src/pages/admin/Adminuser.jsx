import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import Adminsidebar from '../../component/Adminsidebar'
import { useAuth } from '../../context/AuthContex'

const Adminuser = () => {
    const [auth, setAuth] = useAuth();
    const [users, setUsers] = useState([])

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
                let filteruser = data.users.filter(val => val.role == "user");
                setUsers(filteruser)
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

        <>
            <Header />
            <div className="container mt-5">
                <h1>Welcome Admin</h1>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <Adminsidebar />
                    </div>
                    <div className='col-md-9'>
                        <table className="table border">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">City</th>
                                    <th>Image</th>
                                    <th>Role</th>



                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{val.name}</td>
                                                <td>{val.email}</td>
                                                <td>{val.password}</td>
                                                <td>{val.gender}</td>
                                                <td>{val.contact}</td>
                                                <td>{val.city}</td>
                                                <td>
                                                    <img src={val.image} width="100" />
                                                </td>
                                                <td>
                                                    <select className='form-control'>
                                                        <option>---select role--</option>
                                                        {
                                                            ['admin', 'manager', 'user'].map((role, index) => {
                                                                return (
                                                                    <option key={index} value={role} selected={val.role === role ? true : undefined}>
                                                                        {role}
                                                                    </option>

                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminuser
