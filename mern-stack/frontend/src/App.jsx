import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Login from './pages/Login'
import Register from './pages/Register'

import PrivateRoute from './Private/PrivateRoute'
import Admin from './pages/admin/Admin'
import User from './pages/user/User'
import Adminuser from './pages/admin/Adminuser'
import Adminedit from './pages/admin/Adminedit'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/admin' element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='dashboard' element={<Admin />} />
          <Route path='users' element={<Adminuser />} />
          <Route path='edituser' element={<Adminedit />} />

        </Route>

        {/* Admin manager role access */}
        {/* <Route path='/manager' element={<PrivateRoute allowedRoles={['admin', 'manager']} />}>
          <Route path='dashboard' element={<Manager />} />
        </Route> */}

        <Route path='/user' element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path='dashboard' element={<User />} />
        </Route>


        {/* user profile route */}

        <Route path='/changeprofile' element={<Profile />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App
