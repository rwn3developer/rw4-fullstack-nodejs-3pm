import React from 'react'
import Header from './Header'
import { Link, useLocation } from 'react-router-dom'

const Adminsidebar = () => {

    let location = useLocation();



    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="list-group">
                        <Link to={`/admin/dashboard`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/dashboard' ? 'active' : ''}`} aria-current="true">
                            Dashboard
                        </Link>
                        <Link to={`/admin/users`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/users' ? 'active' : ''}`} aria-current="true">
                            User
                        </Link>

                        <Link className="list-group-item list-group-item-action" aria-current="true">
                            Manager
                        </Link>

                        <Link className="list-group-item list-group-item-action" aria-current="true">
                            Blog
                        </Link>

                        <Link className="list-group-item list-group-item-action" aria-current="true">
                            Profile
                        </Link>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Adminsidebar
