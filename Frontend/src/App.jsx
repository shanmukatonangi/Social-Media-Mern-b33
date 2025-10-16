import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'

const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} /> 
      <Route path='/' element={<Home />} />





     </Routes>



      


    </div>
  )
}

export default App
