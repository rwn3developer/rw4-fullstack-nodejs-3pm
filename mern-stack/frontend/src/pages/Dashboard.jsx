import React from 'react'
import { useAuth } from '../context/AuthContex'

const Dashboard = () => {

    const [auth, setAuth] = useAuth();

    console.log(auth);


    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default Dashboard
