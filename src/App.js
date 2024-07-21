import React, { useContext } from 'react'
import "./styles/App.css"
import { BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom'
import PrivateRouter from './PrivateRoute/PrivateRouter'
import { AuthContext } from './Context/AuthContext';

import { ToastContainer } from 'react-toastify';


import Menu from './compenent/Default/Menu';
import Home from './compenent/Default/Home';
import Contact from './compenent/Default/Contact';
import Services from './compenent/Default/Services';
import Register from './compenent/Auth/Register';
import Login from './compenent/Auth/Login';
import AdminDashboard from './compenent/Admin/AdminDashboard';
import DoctorDashboard from './compenent/Doctor/DoctorDashboard';
import UserDashboard from './compenent/User/UserDashboard';
import Pnf from './compenent/Default/Pnf';
import About from './compenent/Default/About';
import UserProfile from './compenent/User/UserProfile';
import AdminProfile from './compenent/Admin/AdminProfile';
import DoctorProfile from './compenent/Doctor/DoctorProfile';
import AddSlot from './compenent/Doctor/slots/AddSlot';
import Update from './compenent/Doctor/slots/Update';
import Slot from './compenent/Doctor/slots/Slot';
import ServiceList from './compenent/Doctor/service/ServiceList';
import AddService from './compenent/Doctor/service/AddService';
import UpdateService from './compenent/Doctor/service/UpdateService';
import AllUsers from './compenent/Admin/AllUsers';
import UpdateUserInfo from './compenent/Admin/UpdateUserInfo';
import AllDoctors from './compenent/Admin/AllDoctors';
import AddDoctor from './compenent/Admin/AddDoctor';


function App() {
  const context = useContext(AuthContext)
  const token = context.token

  const isUser = context.isUser
  const isAdmin = context.isAdmin
  const isDoctor = context.isDoctor

  return (
   <Router>
    <Menu/>
    <ToastContainer autoClose={4000} position={'top-right'} />
      <Routes>

        {/* //we access these with authentication */}
        <Route element={<PrivateRouter/>}>
          <Route path={`/`} element={<Home/>}/> 
                  <Route path={`/about`} element={<About/>} />
         {
          isUser && token ? (
            <React.Fragment>
                  <Route path={`/services`} element={<Services/>} /> 
                  <Route path={`/user/dashboard`} element={<UserDashboard/>} />
                  <Route path={`/user/profile`} element={<UserProfile/>}/>
            </React.Fragment>
          ) : null
         } 
          
          {
            isAdmin && token ? (
              <React.Fragment>
                    <Route path={`/admin/dashboard`} element={<AdminDashboard/>} /> 
                    <Route path={`/admin/users/all`} element={<AllUsers/>}/>
                    <Route path={`/admin/doctors/all`} element={<AllDoctors/>}/>
                    <Route path={`/admin/add/doctor`} element={<AddDoctor/>}/>
                    <Route path={`/admin/users/edit/:id`} element={<UpdateUserInfo/>}/>
                    <Route path={`/admin/profile`} element={<AdminProfile/>}/>
              </React.Fragment>
            ) : null
          }
          
          {
            isDoctor && token ? (
              <React.Fragment>
                  <Route path={`/doctor/dashboard`} element={<DoctorDashboard/>} /> 
                  <Route path={`/doctor/slots`} element={<Slot/>}/>
                  <Route path={`/doctor/slots/add`} element={<AddSlot/>}/>
                  <Route path={`/doctor/slots/edit/:id`} element={<Update/>}/>
                  <Route path={`/doctor/service`} element={<ServiceList/>}/>
                  <Route path={`/doctor/service/add`} element={<AddService/>}/>
                  <Route path={`/doctor/service/edit/:id`} element={<UpdateService/>}/>
                  <Route path={`/doctor/profile`} element={<DoctorProfile/>}/>
              </React.Fragment>
            ) : null
          }
          
        </Route>
         
         {/* //we access these without authentication */}
          <Route path={`/contact`} element={<Contact/>}> Contact</Route>
          <Route path={`/register`} element={<Register/>}> Register</Route>
          <Route path={`/login`} element={token ? <Navigate to={`/`}/>  : <Login/> } />       
          <Route path={`/`} element={<Pnf/>}/>
      </Routes>
   </Router> 
  )
}

export default App;
