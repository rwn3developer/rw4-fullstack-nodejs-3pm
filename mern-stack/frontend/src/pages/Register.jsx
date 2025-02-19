import React, { useState } from 'react'
import Header from '../component/Header'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!name || !email || !password) {
                toast.error("All filed is required");
                return false;
            }

            let res = await fetch(`http://localhost:8000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            let user = await res.json();
            if (user.success) {
                toast.success(user.message);
                setName("");
                setEmail("");
                setPassword("");
            } else {
                toast.error(user.message)
            }

        } catch (err) {
            console.log(err);
            return false;

        }
    }


    return (
        <>
            <Header />
            <div className='container mt-5'>
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <h5>User Register</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter your name' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter your email' />
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

export default Register
