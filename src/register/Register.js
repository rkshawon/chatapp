import axios from 'axios';
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import './register.css'

function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  let navigate = useNavigate();

  const handleRegisterClick = async  (e)=>{
    e.preventDefault()
    const userInfo = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    }
    const reg = await axios.post('/auth/register', userInfo)
    //console.log(reg);
    reg && navigate('/login')
  }

  return (
    <div className='registerContainer'>
        <div className='registerSection'>
            <h2>Register</h2>
            <input type = 'text' placeholder='Enter Name' className='inputfield' ref = {name}/>
            <input type = 'text' placeholder='Enter Email' className='inputfield' ref = {email}/>
            <input type = "text" placeholder='Enter Password' className='inputfield' ref = {password}/>
            <input type = "text" placeholder='Confirm Password' className='inputfield' ref = {confirmPassword}/>
            <button className='registerBtn' onClick={handleRegisterClick}>Register</button>
            <div className="logintoaccount">
            <Link to ='/login'>Already Member? Login</Link>
          </div>
        </div>
    </div>
  )
}

export default Register