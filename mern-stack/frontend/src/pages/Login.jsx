import React from 'react'
import Header from '../component/Header'

const Login = () => {
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
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder='Enter your email' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" placeholder='Enter your password' />
                                </div>  
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
