import React, { useState } from 'react'
import Header from '../component/Header'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContex';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error("All field is required");
            return false;
        }

        console.log(email, password);

        let res = await fetch(`http://localhost:8000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        let user = await res.json();

        if (user.success) {
            toast.success(user.success);
            localStorage.setItem('token', user.token);
            setAuth({
                ...auth,
                token: user.token,
            })

            setTimeout(() => {
                navigate('admin/dashboard')
            }, 2000)
        } else {
            toast.error(user.error);
        }



    }

    return (
        <>
            <Header />
            <div className='container mt-5'>
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <h5>User Login</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter your email' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter your password' />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer position="top-center"
                autoClose={2000}
            />
        </>
    )
}

export default Login
