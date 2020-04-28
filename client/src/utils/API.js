import axios from 'axios';

export const createUser = (data) => {
  axios.post('/api/users', data)
}