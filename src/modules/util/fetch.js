import axios from 'axios'

const fetch = axios.create({
})

fetch.interceptors.response.use(info => {

}, err => {
  if (err.response.status === 401) {
    location.href = '/login'
  }
})

export default fetch
