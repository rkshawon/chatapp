import React, { useContext, useRef } from 'react'
import './login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/AuthContext';

function Login() {
  const email = useRef();
  const password = useRef();
  const {dispatch} = useContext(Context);
  let navigate = useNavigate();


  const handleLoginClick = async  (e)=>{
    e.preventDefault()
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && navigate('/')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  return (
    <div className='loginContainer'>
        <div className='loginSection'>
            <h2>Login</h2>
            <input type = 'text' placeholder='email' className='userinput' ref = {email}/>
            <input type = "text" placeholder='password' className='passinput' ref = {password}/>
            <button className='loginBtn' onClick={handleLoginClick}>Login</button>
          <div className="createNewid">
            <Link to ='/register'>Create New Account</Link>
          </div>
        </div>

    </div>
  )
}

export default Login