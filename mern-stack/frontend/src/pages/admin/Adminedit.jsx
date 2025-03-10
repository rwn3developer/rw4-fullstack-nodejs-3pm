import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import Adminsidebar from '../../component/Adminsidebar'

import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContex'
import { useLocation, useNavigate } from 'react-router-dom'

const Adminedit = () => {
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setName(location?.state?.name)
        setEmail(location?.state?.email)
        setPassword(location?.state?.password)
        setGender(location?.state?.gender)
        setCity(location?.state?.city)
        setContact(location?.state?.contact)
    }, [location?.state])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formdata = new FormData();
            formdata.append('userid', location?.state?._id)
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("gender", gender);
            formdata.append("city", city);
            formdata.append("contact", contact);
            formdata.append("userimage", image);

            //api call edit user

            let res = await fetch(`http://localhost:8000/admin/edituser`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth?.token?.token}`
                },
                body: formdata
            })

            let data = await res.json();
            if (data.success) {
                toast.success("User successfully edit");
                setTimeout(() => {
                    navigate('/admin/users')
                }, 2000);
            } else {
                toast.error("Error while edit user");
            }

        } catch (err) {
            console.log(err);
            return false
        }








    }

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
                        <div className="card">
                            <div className="card-header">
                                <h5>Edit User</h5>
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
                                        <br />
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={gender === "male"}
                                            onChange={(e) => setGender(e.target.value)}
                                        /> Male
                                        &nbsp;
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={gender === "female"}
                                            onChange={(e) => setGender(e.target.value)}
                                        /> Female
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
                                        <img src={location?.state?.image} width="100" />
                                    </div>


                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminedit
