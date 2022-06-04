import axios from 'axios'
const baseUrl = 'http://localhost:5000/'

export const loginApi = (dataObject) => {
  var data = JSON.stringify(dataObject);

  var config = {
    method: 'post',
    url: baseUrl + 'login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)

}


export const signupApi = (dataObject) => {
  var data = JSON.stringify(dataObject);

  var config = {
    method: 'post',
    url: baseUrl + 'signup',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}

export const getUserDataById = (token) => {
  var config = {
    method: 'post',
    url: baseUrl + 'getUserDataByid',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };



  return axios(config)



}
export const updateUserDate = (data, token) => {

  var config = {
    method: 'patch',
    url: baseUrl + 'update',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    data: data
  };



  return axios(config)

}