import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

const Adminsidebar = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="list-group">
                        <Link className="list-group-item list-group-item-action active" aria-current="true">
                            Dashboard
                        </Link>
                        <Link className="list-group-item list-group-item-action" aria-current="true">
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
