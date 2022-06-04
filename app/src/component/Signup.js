import React, { useState } from 'react'
import './../css/main.css';
import { signupApi } from './../Shared/Service';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Signup() {
    let navigate = useNavigate();
    const [dataObject, setdataObject] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })

    const submitFunction = () => {
        signupApi(dataObject)
            .then(function (response) {
                alert(response.data)
                navigate(`/`)
            })
            .catch(function (error) {
                if (error.response.status == 500) {

                    console.log(error)
                } else {
                    alert(error.response.data)
                }
            });
    }
    return (
        <div className='signup'>
            <div className='heading'>SignUp</div>

            <label htmlFor="fname">Name</label>
            <input type="text" id="name" name="name" value={dataObject.name} placeholder="Your name.."
                onChange={(e) => {
                    setdataObject((old) => {
                        old.name = e.target.value
                        return { ...old }
                    })
                }}
            />

            <label htmlFor="fname">Email</label>
            <input type="email" id="email" name="email" value={dataObject.email} placeholder="Your Email.."

                onChange={(e) => {
                    setdataObject((old) => {
                        old.email = e.target.value
                        return { ...old }
                    })
                }} />

            <label htmlFor="fname">Phone</label>
            <input type="number" id="phone" name="phone" value={dataObject.phone} placeholder="Your Phone.."

                onChange={(e) => {
                    setdataObject((old) => {
                        old.phone = e.target.value
                        return { ...old }
                    })
                }} />

            <label htmlFor="fname">Password</label>
            <input type="password" id="password" name="password" value={dataObject.password} placeholder="Your password.."

                onChange={(e) => {
                    setdataObject((old) => {
                        old.password = e.target.value
                        return { ...old }
                    })
                }} />


            <input type="button" value="Submit"
                onClick={submitFunction}
            ></input>
            <span>Already have account ?<NavLink to='/'> LogIn</NavLink></span>

        </div>
    )
}
