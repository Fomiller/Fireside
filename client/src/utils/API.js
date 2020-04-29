import axios from 'axios';


export const createUser = (data) => {
  axios.post('/api/users', data)
}

export const login = (data) => {
  axios.post('/api/login', data)
  .then( res => {
    console.log(res);
    console.log("USERNAME: ",res.data.username)
    const username = res.data.username 
    if (res.status === 200 && window){ 
      window.location.href = `/user/${username}`; 
      // or <Redrect to="/thankyou" /> if you are using react-router
    }
  })
  .catch(err => {
    console.log("LOGIN CLIENT SIDE ERROR: ", err)
  })
}