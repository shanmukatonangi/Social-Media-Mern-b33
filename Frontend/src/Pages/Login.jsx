import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let email=useRef()
    let password=useRef()
    let navigate = useNavigate()
async function login(e){
   try {
     e.preventDefault()
    let user={
        email:email.current.value,
        password:password.current.value
    }
   await axios.post("http://localhost:8000/api/users/login",user)
    alert("Login Successful")
    navigate('/')
    
   } catch (error) {
    console.log(error);
   }
 }


  return (
    <div>
      <h1>Login</h1>
        <form>
            <input type="email" placeholder='Email' ref={email}/>
            <input type="password" placeholder='Password' ref={password}/>
            <button type="submit" onClick={login}>Login</button>
        </form>
    </div>
  )
}

export default Login
