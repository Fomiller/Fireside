import axios from 'axios';


export const createUser = (data) => {
  axios.post('/api/users', data)
}

export const login = async (data) => {
  try{
      const res = await axios.post('/api/login', data);
      if (res.status === 200 && window){ 
        return res.data;
      }
      return null;
    }
    catch (err) {
      console.log("LOGIN CLIENT SIDE ERROR: ", err)
    }
}