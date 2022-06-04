import React from 'react'
import { getUserDataById } from './../Shared/Service';
import { NavLink, useNavigate } from 'react-router-dom';
import { updateUserDate } from './../Shared/Service';


export default function Home() {
  let navigate = useNavigate();
  const [userDataObject, setUserDataObject] = React.useState({})
  const [password, setPassword] = React.useState(``)
  // NOTE-:becrypt method used for hash password so you we can never decrypt password 
  // so i am using another state for new password  we cannot see existing password


  const updateObject = () => {
    let data = userDataObject
    data.flag = false // sending flag that password is changed or not ,otherwise it will encrypt already encrypted  password  and we won`t  be able to login
    if (password) {
      data.password = password
      data.flag = true
    }
    let token = localStorage.getItem(`token`)
    updateUserDate(data, token)
      .then((result) => {
        alert(result.data)

      })
      .catch((e) => {
        console.log(e)
        alert(e.response.data)
      })
  }
  React.useEffect(() => {
    let token = localStorage.getItem(`token`)
    if (token) {
      getUserDataById(token)
        .then(function (response) {
          if (response.data ? response.data[0].name && response.data[0].email : null) {
            let data = response.data[0]
            setUserDataObject({ ...data })
          }
        })
        .catch(function (error) {
          navigate(`/`)
          console.log(error);
        });
    } else {
      navigate(`/`)
    }

  }, [])


  return (
    <>
      <div>
        <div className='signup'>
          <div className='heading'>Home</div>

          <label htmlFor="fname">Name</label>
          <input type="text" id="name" name="name" value={userDataObject.name} placeholder="Your name.."
            onChange={(e) => {
              setUserDataObject((old) => {
                old.name = e.target.value
                return { ...old }
              })
            }}
          />

          <label htmlFor="fname">Email</label>
          <input type="email" id="email" name="email" value={userDataObject.email} placeholder="Your Email.."

            onChange={(e) => {
              setUserDataObject((old) => {
                old.email = e.target.value
                return { ...old }
              })
            }}
          />

          <label htmlFor="fname">Phone</label>
          <input type="number" id="phone" minlength="10" name="phone" value={userDataObject.phone} placeholder="Your Phone.."

            onChange={(e) => {
              setUserDataObject((old) => {
                old.phone = e.target.value
                return { ...old }
              })
            }}
          />

          <label htmlFor="fname">Token</label>
          <input type="text" id="password" name="password" value={userDataObject.token} placeholder="Your password.." disabled />


          <label htmlFor="fname">Password</label>
          <input type="text" id="password" name="password" value={password} placeholder="Your New password.."

            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />


          <input type="button" value="Update"
            onClick={updateObject}
          ></input>


        </div>
        <NavLink to='/'
          onClick={() => { localStorage.clear() }}
        >logout</NavLink>
      </div>
    </>
  )
}
