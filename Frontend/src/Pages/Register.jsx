import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    let username=useRef()
    let email=useRef()
    let password=useRef()
    let navigate = useNavigate()

async  function handleSubmit(e){
  try {
     e.preventDefault()

let user={
    username:username.current.value,
    email:email.current.value,
    password:password.current.value
}

await axios.post("http://localhost:8000/api/users/register",user)
alert("Registration Successful")
navigate('/login')
  } catch (error) {
    console.log(error);
    
  }



  }


  return (
    <div>
     <h1>Register</h1>
        <form>
            <input type="text" placeholder='Username' ref={username} />
            <input type="email" placeholder='Email' ref={email}/>
            <input type="password" placeholder='Password' ref={password} />
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    </div>
  )
}

export default Register
