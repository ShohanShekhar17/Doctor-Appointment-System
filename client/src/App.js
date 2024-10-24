import React from 'react'
//import { Button } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'

import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import ApplyDoctor from './pages/ApplyDoctor'
import Notification from './pages/Notification'
import UsersList from './pages/Admin/UsersList'
import DoctorsList from './pages/Admin/DoctorsList'
import Profile from './pages/Doctor/Profile'
import BookAppointment from './pages/BookAppointment'
import Appointment from './pages/Appointment'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'

function App() {

  const { loading } = useSelector(state => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className='spinner-parent'>
          <div class="spinner-border" role="status">

          </div>
        </div>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
        <Route path='/notification' element={<ProtectedRoute><Notification /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path='/admin/doctorslist' element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
        <Route path='/doctor/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/book-appointment/:doctorId' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path='/appointments' element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        <Route path='/doctor/appointments' element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
