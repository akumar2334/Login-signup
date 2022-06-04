import React, { useState } from 'react'
import './../css/main.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginApi } from './../Shared/Service';

export default function Login() {
  let navigate = useNavigate();
  const [loginobject, setLoginobject] = useState({
    email: '',
    password: '',
  })
  const login = (e) => {

    loginApi(loginobject)
      .then(function (response) {
        localStorage.setItem(`token`, response.data.token)
        navigate(`/home`)
      })
      .catch(function (error) {
        if (error.response.status == 500) {
          console.log(error)
        }
        else {
          alert(error.response.data)
        }
      });


  }
  return (
    <div className='login'>
      <div className='heading'>Login</div>


      <label htmlFor="fname">Email</label>
      <input type="email" id="email" name="email" value={loginobject.email} placeholder="Your Email.."
        onChange={(e) => {
          setLoginobject((old) => {
            old.email = e.target.value
            return { ...old }
          })
        }}
      />

      <label htmlFor="fname">Password</label>
      <input type="password" id="password" name="password" value={loginobject.password} placeholder="Your Password.."
        onChange={(e) => {
          setLoginobject((old) => {
            old.password = e.target.value
            return { ...old }
          })
        }}
      />

      <input type="button" value="Login"
        onClick={login}
      ></input>
      <NavLink to='/signup'>SignUp</NavLink>


    </div>
  )
}
