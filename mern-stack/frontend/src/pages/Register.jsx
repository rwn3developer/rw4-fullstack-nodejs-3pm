import React, { useState } from 'react'
import Header from '../component/Header'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formdata = new FormData;
        formdata.append("name", name)
        formdata.append("email", email)
        formdata.append("password", password)
        formdata.append("gender", gender)
        formdata.append("city", city)
        formdata.append("contact", contact)
        formdata.append("userimage", image)
        try {
            if (!name || !email || !password || !gender || !city || !contact || !image) {
                toast.error("All filed is required");
                return false;
            }
            let res = await fetch(`http://localhost:8000/register`, {
                method: 'POST',
                body: formdata
            })
            let user = await res.json();
            if (user.success) {
                toast.success(user.message);
                setName("");
                setEmail("");
                setPassword("");
                setTimeout(() => {
                    navigate('/')
                }, 2000)
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

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Gender :- </label>
                                    <br></br>
                                    <input type="radio" name='gender' onChange={(e) => setGender(e.target.value)} value="male" />Male
                                    &nbsp;
                                    <input type="radio" name='gender' onChange={(e) => setGender(e.target.value)} value="female" />Female
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                                    <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter your city' />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Conatct</label>
                                    <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter your contact' />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" placeholder='Enter your contact' />
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
